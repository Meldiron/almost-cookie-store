<template>
  <div class="p-3 bg-white rounded-md md:p-6">
    <h1 class="text-4xl font-bold text-center">Payment failed</h1>
    <h3 class="text-[#f02e65] text-center font-light">Let's try it again!</h3>

    <div class="py-4 text-lg text-slate-600">
      <p>
        Stripe did not like your payment details. The order was marked as
        failed, but you can create new one to try it again.
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