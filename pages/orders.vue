<template>
  <div>
    <div class="flex flex-col space-y-6">
      <div v-if="orders === null" class="p-3 bg-white rounded-md md:p-6">
        <p class="w-full text-lg font-light text-center text-slate-900">
          Loading ...
        </p>
      </div>

      <div
        v-if="orders !== null && orders.documents.length <= 0"
        class="p-3 bg-white rounded-md md:p-6"
      >
        <p class="w-full text-lg font-light text-center text-slate-900">
          No orders found!
        </p>
      </div>

      <div
        v-if="orders !== null && orders.documents.length > 0"
        class="flex flex-col space-y-6"
      >
        <div
          v-for="order of orders.documents"
          :key="order.$id"
          class="p-3 bg-white rounded-md md:p-6"
        >
          <div class="flex items-center justify-center space-x-6">
            <div
              v-if="order.status === 'success'"
              class="
                rounded-full
                w-[100px]
                aspect-square
                bg-green-50
                text-green-500
                flex
                items-center
                justify-center
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div
              v-if="order.status === 'failed'"
              class="
                rounded-full
                w-[100px]
                aspect-square
                bg-red-50
                text-red-500
                flex
                items-center
                justify-center
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div
              v-if="order.status === 'unknown'"
              class="
                rounded-full
                w-[100px]
                aspect-square
                bg-gray-50
                text-gray-500
                flex
                items-center
                justify-center
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div class="w-full">
              <h1 class="text-xl font-bold">Order: {{ order.packId }}</h1>
              <p cass="text-slate-600">{{ verboseDate(order.createdAt) }}</p>
              <small class="text-sm font-light"
                >Status: <b class="font-bold">{{ order.status }}</b></small
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-start mt-3">
      <router-link
        to="/app"
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
        Back to Store
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Models } from 'appwrite'
import Vue from 'vue'
import { AppwriteService, Order } from '~/services/appwrite'
export default Vue.extend({
  middleware: 'only_user',
  data() {
    return {
      orders: null as Models.DocumentList<Order> | null,
      page: 1,
    }
  },
  async mounted() {
    this.orders = await AppwriteService.getOrders(this.page)
  },
  methods: {
    verboseDate(unix: number) {
      const d = new Date(unix)

      const day = d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`
      const month =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
      const year = d.getFullYear()
      const hour = d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`
      const min = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`

      let relativeTime = ''
      const dif = Date.now() - unix
      // 1 hour
      if (dif < 3600000) {
        let relativeMins = Math.floor(dif / 60000) // 1 minute
        relativeTime = ` (${relativeMins}mins ago)`
      }

      return `${day}.${month}.${year} at ${hour}:${min}${relativeTime}`
    },
  },
})
</script>