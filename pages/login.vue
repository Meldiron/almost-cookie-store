<template>
  <div class="p-3 bg-white rounded-md md:p-6">
    <h1 class="text-4xl font-bold text-center">Cookie Store</h1>
    <h3 class="text-[#f02e65] text-center font-light">Powered by Appwrite</h3>

    <div class="py-4 text-lg text-slate-600">
      <p>
        This is a demo project made with Appwrite 0.13 to show-case how to
        connect
        <b class="font-bold text-black">Appwrite + Stripe</b>. In our cookie
        store you can pick which cookie pack you want to purchase, and use
        Stripe to pay for it (no real payment on development environment). Once
        done, you can see your order marked as successful in Appwrite, yay!
      </p>

      <p class="mt-2">
        Please login to proceed into the cookie store.
      </p>
    </div>

    <button
      @click="onLogin()"
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
      <p>Login as anonymous</p>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '../services/appwrite'

export default Vue.extend({
  middleware: 'only_guest',
  methods: {
    async onLogin() {
      await AppwriteService.login()
    },
  },
})
</script>