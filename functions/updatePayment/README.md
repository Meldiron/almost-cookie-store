# updatePayment

Welcome to the documentation of this function 👋 We strongly recommend keeping this file in sync with your function's logic to make sure anyone can easily understand your function in the future. If you don't need documentation, you can remove this file.

## 🤖 Documentation

A function related to `cretePayment`. After payment is created, at some point, Stripe will execute this function to inform us if payment was successful or not. This function verifies communication secrets, parses status of payment, and updates Appwrite documents.

_Example input:_

Input depents on [Stripe webhook schema](https://stripe.com/docs/webhooks), and [Appwrite Webhook Proxy](https://stripe.com/docs/webhooks).

```json
{
  "method": "POST",
  "body": "{\"id\": \"evt_3KYTBDA3aIKqDDP51LwvjYyj\",\"type\":\"payment_intent.created\",...}",
  "headers": {
    "stripe-signature": "...."
  }
}
```

_Example output:_

<!-- Update with your expected output -->

```json
{
  "outcome": "updateDocument",
  "document": {
    "status": "success",
    "userId": "622750fbf3e64c423913",
    "packId": "pack2",
    "paymentId": "pi_XXXXXXXXXXXXXXXXXXXX",
    "createdAt": 1646746512011
  }
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **STRIPE_SIGNATURE** - Stripe signature to validate request is authorized
<!-- Add your custom environment variables -->

## 🚀 Deployment

There are two ways of deploying the Appwrite function, both having the same results, but each using a different process. We highly recommend using CLI deployment to achieve the best experience.

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.

### Manual using tar.gz

Manual deployment has no requirements and uses Appwrite Console to deploy the tag. First, enter the folder of your function. Then, create a tarball of the whole folder and gzip it. After creating `.tar.gz` file, visit Appwrite Console, click on the `Deploy Tag` button and switch to the `Manual` tab. There, set the `entrypoint` to `src/index.js`, and upload the file we just generated.
