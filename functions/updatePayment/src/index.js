const stripe = require('stripe')
const sdk = require('node-appwrite')

module.exports = async function (req, res) {
  // Setup Appwrite SDK
  const client = new sdk.Client()
  const database = new sdk.Database(client)

  if (
    !req.env.APPWRITE_FUNCTION_ENDPOINT ||
    !req.env.APPWRITE_FUNCTION_API_KEY ||
    !req.env.STRIPE_SIGNATURE
  ) {
    throw new Error('Environment variables are not set.')
  }

  client
    .setEndpoint(req.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(req.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.env.APPWRITE_FUNCTION_API_KEY)

  // Prepate data
  const stripeSignature = req.env.STRIPE_SIGNATURE
  const payload = JSON.parse(req.payload)

  // Validate request + authentication check
  let event = stripe.webhooks.constructEvent(
    payload.body,
    payload.headers['stripe-signature'],
    stripeSignature
  )

  // Prepare results
  const status =
    event.type === 'payment_intent.succeeded'
      ? 'success'
      : event.type === 'payment_intent.canceled'
      ? 'failed'
      : 'unknown'

  const userId = event.data.object.charges.data[0].metadata.userId
  const packId = event.data.object.charges.data[0].metadata.packageId
  const paymentId = event.data.object.id

  const document = {
    status,
    userId,
    packId,
    paymentId,
    createdAt: Date.now(),
  }

  // Check if document already exists
  const existingDocuments = await database.listDocuments(
    'orders',
    [`paymentId.equal('${paymentId}')`],
    1
  )

  let outcome

  if (existingDocuments.documents.length > 0) {
    // Document already exists, update it
    outcome = 'updateDocument'
    await database.updateDocument(
      'orders',
      existingDocuments.documents[0].$id,
      document,
      [`user:${userId}`],
      []
    )
  } else {
    // Document doesnt exist, create one
    outcome = 'createDocument'
    await database.createDocument(
      'orders',
      'unique()',
      document,
      [`user:${userId}`],
      []
    )
  }

  res.json({
    outcome,
    document,
  })
}
