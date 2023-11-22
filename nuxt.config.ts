// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      domain: process.env.DOMAIN,
      ymapapi: process.env.YMAP_KEY,
    }
  },
  devServer: {
    port: 3000,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/scss/_essentials.scss";`,
        },
      },
    },
  },
})
