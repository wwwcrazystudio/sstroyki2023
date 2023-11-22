<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const ymapkey = config.public.ymapapi as string

console.log(config.public.process)

useHead({
    script: [
        {
            src: `https://api-maps.yandex.ru/v3/?apikey=${ymapkey}&lang=ru_RU`,
        },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
})
</script>

<style lang="scss">
@import 'bootstrap/scss/reboot';
@import 'bootstrap/scss/containers';
@import '~/assets/scss/main';
@import '~/assets/scss/reset';
@import '~/assets/scss/typography';
@import '~/assets/scss/fonts';

:root {
  --gray: #777;
  --accent: #347DE7;
  --dark: #454545;
}
</style>
