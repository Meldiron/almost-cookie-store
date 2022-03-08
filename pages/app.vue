<template>
  <div>
    <div class="flex flex-col space-y-6">
      <div
        v-for="pack of packages"
        :key="pack.id"
        class="p-3 bg-white rounded-md md:p-6"
      >
        <div class="flex items-start justify-start space-x-6">
          <div class="rounded-md overflow-clip w-[150px] aspect-square">
            <img
              class="object-cover object-center w-full h-full shrink-0"
              :src="pack.preview"
              alt="Bured product"
            />
          </div>

          <div class="w-full">
            <h1 class="text-xl font-bold">{{ pack.title }}</h1>
            <p cass="text-slate-600">{{ pack.description }}</p>

            <button
              @click="onPurchase(pack.id)"
              class="
                text-[#f02e65]
                border border-[#fcf2f6]
                hover:border-[#f02e65]
                rounded-md
                bg-[#fcf2f6]
                mt-2
                text-lg
                py-2
                px-6
              "
            >
              Buy for {{ pack.price }}€
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-3">
      <router-link
        to="/orders"
        class="
          px-8
          py-3
          text-lg text-[#f02e65]
          hover:brightness-90
          filter
          rounded-md
          bg-white
        "
      >
        My Orders
      </router-link>

      <button
        @click="onLogout()"
        class="
          px-8
          py-3
          text-lg text-white
          rounded-md
          hover:brightness-90
          filter
          bg-slate-800
        "
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
export default Vue.extend({
  middleware: 'only_user',
  data() {
    return {
      packages: [
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
      ],
    }
  },
  methods: {
    async onLogout() {
      await AppwriteService.logout()
      this.$router.push('/')
    },
    async onPurchase(packId: string) {
      await AppwriteService.buyPack(packId)
    },
  },
})
</script>