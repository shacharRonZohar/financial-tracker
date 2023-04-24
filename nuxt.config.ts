// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['trpc-nuxt'],
  },
  typescript: {
    strict: true,
  },
  vite: {
    optimizeDeps: {
      include: ['ofetch', 'chunk-Q53DPCWL', 'hookable', 'unctx', 'vue-router'],
    },
  },
})
