// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  build: {
    transpile: ['trpc-nuxt'],
  },
  typescript: {
    strict: true,
  },
  vite: {
    optimizeDeps: {
      include: ['ofetch', 'hookable', 'unctx', 'vue-router'],
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
})
