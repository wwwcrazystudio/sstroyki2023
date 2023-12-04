<template>
  <div class="apartment-info">
    <div class="apartment-info__wrap">
      <div class="apartment-info__heading">Подробнее о ЖК</div>

      <Gallery :images="gallery" class="apartment-info__gallery" />

      <div class="apartment-info__text">
        <div class="apartment-info__text-content" v-html="complex.description" :style="descriptionHeight"></div>

        <button class="apartment-info__link"  @click="showFullDesc = !showFullDesc">
          {{ showFullDesc ? 'Скрыть' : 'Читать дальше' }} 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            :transform="showFullDesc ? 'rotate(180)' : 'rotate(0)'"
          >
            <path
              d="M11 3.57874L6.07874 8.5L1.15748 3.57874"
              stroke="#347DE7"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button> 
      </div>

      <div class="apartment-info__apartment-spec">
        <div class="apartment-spec__title">Характеристики</div>

        <ul class="apartment-spec__list">
          <li class="apartment-spec__item" v-for="spec in specs" >
            <div class="apartment-spec__item-icon">
              <img :src="getSpecIcon(spec.key)" alt="Класс жилья" />
            </div>
            <div class="apartment-spec__item-title">
              {{ spec.title }}
            </div>
            <div class="apartment-spec__item-value">
              {{ complex[spec.key] || '---' }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import star from '@/assets/img/icon/star.svg';
import buildstatus from '@/assets/img/icon/buildstatus.svg';
import livetype from '@/assets/img/icon/type.svg';
import housetype from '@/assets/img/icon/housetype.svg';
import floors from '@/assets/img/icon/floors.svg';
import buildings from '@/assets/img/icon/buildings.svg';
import parking from '@/assets/img/icon/parking.svg';

import type { ComplexData } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
}

const props = defineProps<Props>();

interface Spec {
  title: string;
  key: keyof typeof props.complex;
}

const specs = ref<Spec[]>([
  {
    title: 'Класс жилья',
    key: 'class',
  },
  {
    title: 'Статус строительства',
    key: 'status',
  },
  {
    title: 'Тип жилья',
    key: 'roomtype',
  },
  {
    title: 'Тип дома',
    key: 'material',
  },
  {
    title: 'Этажность',
    key: 'floors',
  },
  {
    title: 'Количество корпусов',
    key: 'housing_count',
  },
  {
    title: 'Наличие паркинга',
    key: 'parking',
  },
]);

const showFullSpecs = ref<boolean>()
const showFullDesc = ref<boolean>()

const gallery = computed(() => {
  return useResponsiveImage(props.complex.image_details).value
})

const descriptionHeight = computed(() => {
  let height = 'auto'

  if (props.complex.description.length >= 500 && !showFullDesc.value) {
    height = '150px'
  }

  return {
    height: height
  }
})


const getSpecIcon = (key: string) => {
  switch (key) {
    case 'class':
      return star;
    case 'status':
      return buildstatus;
    case 'roomtype':
      return livetype;
    case 'material':
      return housetype;
    case 'floors':
      return floors;
    case 'housing_count':
      return buildings;
    case 'parking':
      return parking;
  }
};
</script>

<style lang="scss" scoped>
.apartment-info {
  &__wrap {
    padding: rem(32px);
    background-color: #fff;

    @include media-breakpoint-down(md) {
      padding: rem(16px);
      border-radius: rem(16px);
    }
  }

  &__heading {
    @extend %h2;

    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__gallery {
    height: rem(422px);
    margin-bottom: rem(32px);
    border-radius: rem(16px);
    overflow: hidden;

    @include media-breakpoint-down(md) {
      height: rem(270px);
      margin-bottom: rem(16px);
    }
  }

  &__text {
    color: var(--gray);
  }

  &__text-content {
    overflow: hidden;
  }

  &__link {
    display: flex;
    font-weight: 500;
    color: var(--accent);
    margin-top: rem(24px);
    text-decoration: none;
    gap: 8px;
    align-items: center;
  }

  &__apartment-spec {
    margin-top: rem(32px);
  }
}

.apartment-spec {
  &__title {
    font-size: rem(24px);
    font-weight: 600;
  }

  &__list {
    @include unlist();
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: rem(24px 32px);
    margin-top: rem(32px);

    @include media-breakpoint-down(md) {
      margin-top: rem(16px);
      grid-template-columns: 1fr;
      gap: rem(16px);
    }
  }

  &__item {
    display: grid;
    align-items: center;
    grid-template-columns: rem(32px) auto auto;
    gap: rem(8px);

    &-title {
      color: var(--gray);
    }

    &-value {
      text-align: right;
      font-weight: 500;
    }
  }
}
</style>
