<template>
  <div class="p-3 bg-white rounded-md md:p-6">
    <h1 class="text-4xl font-bold text-center">Payment successful</h1>
    <h3 class="text-[#f02e65] text-center font-light">Have a lovely day!</h3>

    <div class="py-4 text-lg text-slate-600">
      <p>
        Payment was successfull, and Appwrite will be receiving webhook event
        within next few seconds. Check out your order in Appwrite Console, and
        see the status of the order. If everything went well, you should see
        <b class="font-bold text-black">successful status</b> of the Stripe
        payment in Appwrite.
      </p>
    </div>

    <nuxt-link
      to="/"
      class="
        w-full
        rounded-md
        px-8
        py-2
        flex
        items-center
        justify-center
        space-x-3
        bg-[#f02e65]
        text-white
      "
    >
      <p>Back to store</p>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>