const stripe = require('stripe')

const packages = [
  {
    id: 'pack1',
    title: 'Medium Cookie Pack',
    description: 'Package incluces 1 cookie',
    price: 1.99,
    preview: '/pack1.jpg',
  },
  {
    id: 'pack2',
    title: 'Large Cookie Pack',
    description: 'Package incluces 6 cookies',
    price: 4.99,
    preview: '/pack2.jpg',
  },
]

module.exports = async function (req, res) {
  // Setup
  if (!req.env.STRIPE_KEY) {
    throw new Error('Environment variables are not set.')
  }
  // Prepate data
  const payload = JSON.parse(req.payload)
  const stripeClient = stripe(req.env.STRIPE_KEY)

  const package = packages.find((pack) => pack.id === payload.packId)

  if (!package) {
    throw new Error('Could not find the pack.')
  }

  // Create Stripe payment
  const session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: package.title,
            description: package.description,
          },
          unit_amount: package.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: payload.redirectSuccess,
    cancel_url: payload.redirectFailed,
    payment_intent_data: {
      metadata: {
        userId: req.env.APPWRITE_FUNCTION_USER_ID,
        packageId: package.id,
      },
    },
  })

  // Return redirect URL
  res.json({
    paymentUrl: session.url,
  })
}
