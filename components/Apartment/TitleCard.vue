<template>
  <div class="apartment-title-card">
    <div class="apartment-title-card__wrap">
      <div class="apartment-title-card__col">
        <h1 class="apartment-title-card__heading">
          {{ title || complex.name }}
        </h1>
        <div class="apartment-title-card__address">
          {{ complex.address }}
        </div>
        <ul class="apartment-title-card__metro">
          <li
            class="apartment-title-card__metro-item"
            v-for="metro in complex.metro_info"
          >
            <MetroDistance :metro="metro" color="dark" />
          </li>
        </ul>
        <DeveloperInfo :developer="developer" />
        <ul class="apartment-title-card__meta">
          <li class="apartment-title-card__meta-item">
            Срок сдачи
            <span>{{ complex.status }}</span>
          </li>
          <li class="apartment-title-card__meta-item">
            Класс жилья
            <span>{{ complex.class }}</span>
          </li>
          <li class="apartment-title-card__meta-item">
            Тип жилья
            <span>{{ complex.roomtype }}</span>
          </li>
        </ul>
        <div class="apartment-title-card__foot">
          <PhoneBtn
            :phone="complex.developer_phone || developer.phone"
            class="apartment-title-card__phone-btn"
          />
          <NuxtLink
            target="_blank"
            :to="`/novostroyki/${homeSlug}`"
            class="apartment-title-card__btn"
          >
            Подробнее о ЖК
          </NuxtLink>
        </div>
      </div>

      <div class="apartment-title-card__col" v-if="gallery.length">
        <Gallery has-fullscreen class="apartment-title-card__gallery" :images="gallery" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComplexData, DeveloperData } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
  developer: DeveloperData;
  title?: string;
}

const props = defineProps<Props>();

const route = useRoute();

const homeSlug = computed(() => {
  return route.params.slug;
});

const gallery = computed(() => {
  return useResponsiveImage(props.complex.image_room_page).value;
});
</script>

<style lang="scss" scoped>
.apartment-title-card {
  &__wrap {
    padding: rem(24px);
    border-radius: rem(20px);
    background: #fff;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1.1fr;
    gap: rem(24px);
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);

      
    @include media-breakpoint-down(lg) {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        padding: rem(16px);
        overflow: hidden;
        gap: rem(16px);
    }
  }

  &__col {
    min-width: 1px;
    max-width: 100%;
  }

  &__heading {
    @extend %h1;

    margin-bottom: rem(16px);
  }

  &__address {
    margin-bottom: rem(20px);
  }

  &__metro {
    @include unlist();

    display: flex;
    gap: rem(16px);
    flex-wrap: wrap;
  }

  &__meta {
    @include unlist();

    display: flex;
    gap: rem(24px);
    flex-wrap: wrap;
  }

  &__meta-item {
    color: var(--gray);

    span {
      display: block;
      margin-top: rem(12px);
      font-weight: 600;
      color: #454545;
    }
  }

  &__foot {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: rem(16px);
    margin-top: rem(56px);

    @include media-breakpoint-down(md) {
        margin-top: rem(24px);
    }
  }

  &__btn {
    @extend %btn-light;
  }

  &__gallery {
    height: rem(456px);
    border-radius: rem(12px);
    overflow: hidden;
    
    @include media-breakpoint-down(md) {
        height: rem(240px);
    }
  }
}
</style>
