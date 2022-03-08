<template>
  <div>
    <!-- 'Made with Appwrite' badge -->
    <a
      href="https://appwrite.io/"
      target="_blank"
      style="position: fixed; right: 18px; bottom: 18px; z-index: 999"
    >
      <img
        style="width: 130px"
        src="https://appwrite.io/images-ee/press/badge-white-box.svg"
        alt="Built with Appwrite"
      />
    </a>

    <div class="fixed inset-0 bg-primary custom-bg z-[5]"></div>

    <div
      class="relative z-10 flex flex-col min-h-screen px-3 mt-6 min-w-screen"
    >
      <div
        class="
          absolute
          bottom-0
          left-0
          w-full
          h-20
          bg-gradient-to-t
          from-black
          to-primary
          opacity-10
        "
      ></div>

      <img
        class="absolute z-10 hidden left-10 bottom-10 sm:block"
        src="/dots-bl.svg"
        alt=""
      />
      <img
        class="absolute z-10 hidden right-10 top-10 sm:block"
        src="/dots-tr.svg"
        alt=""
      />

      <div
        class="
          flex flex-col
          items-center
          justify-center
          h-full
          pb-20
          space-y-20
        "
      >
        <div class="w-full max-w-2xl mt-6 space-y-6">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
.custom-bg {
  background-color: linear-gradient(180deg, #f02e65 0%, #c81b4c 100%);

  background-image: url('/bg.png');
  background-position: center;
  background-size: cover;
}

.nuxt-link-active {
  @apply font-semibold !text-black;
}
</style>