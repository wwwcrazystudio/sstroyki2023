<template>
  <div class="genplan-popup" v-if="item">
    <div class="genplan-popup__wrap">
      <div class="genplan-popup__title">{{item.label}}</div>
      <div class="genplan-popup__finished">{{item.status}}</div>
      <ul class="genplan-popup__list">
        <li class="genplan-popup__item" v-for="roomType, index in item.rooms.filter(el => parseInt(el.quantity))">
          <NuxtLink :to="getGroupRoute(index)" class="genplan-popup__item-link">
            {{ getRoomType(index) }} <span>от {{formatNumber(parseInt(roomType.price_min))}} ₽</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.57874 1L8.5 5.92126L3.57874 10.8425"
                stroke="#347DE7"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </NuxtLink>
        </li>
      </ul>
      <div class="genplan-popup__link">
        {{totalRooms}} {{ plural(totalRooms || 0, 'предложение', 'предложения', 'предложений') }} 
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SchemeItem } from '~/types/interfaces';
import plural from 'plural-ru'

interface Props {
  item?: SchemeItem
}

const props = defineProps<Props>()

const route = useRoute()

const totalRooms = computed(() => {
  return props.item?.rooms.reduce((acc, room) => acc + parseInt(room.quantity), 0);
});

const getRoomType = (index: number) => {

  switch (index) {
    case 0:
      return 'Студии';
    case 1:
      return '1-комнатные';
    case 2:
      return '2-комнатные';
    case 3:
      return '3-комнатные';
    case 4:
      return '4-комнатные';
    default:
      return '---';
  }
};

const formatNumber = (number: number) => {
  if (number >= 1000 && number <= 1000000) {
    return `${(number / 1000).toFixed(0)} тыс.`;
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)} млн.`;
  }

  return number;
};

const getGroupRoute = (type:number) => {
  switch (type) {
    case 0:
    return `/novostroyki/${route.params.slug}/studii/`
    case 1:
    return `/novostroyki/${route.params.slug}/1k-kvartiry/`
    case 2:
    return `/novostroyki/${route.params.slug}/2k-kvartiry/`
    case 3:
    return `/novostroyki/${route.params.slug}/3k-kvartiry/`
    case 4:
    return `/novostroyki/${route.params.slug}/4k-kvartiry/`
  }
}
</script>

<style lang="scss" scoped>
.genplan-popup {
  &__wrap {
    padding: rem(24px);
    background: #fff;
    border-radius: rem(10px);
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
  }

  &__title {
    font-weight: 600;
    font-size: rem(18px);
    margin-bottom: rem(12px);
  }

  &__list {
    @include unlist();

    border-top: 1px solid #ddd;
    padding-top: rem(24px);
    margin-top: rem(24px);
    display: grid;
    gap: rem(16px);
  }

  &__item-link {
    display: flex;
    align-items: center;
    gap: rem(12px);
    text-decoration: none;

    span {
      margin-left: auto;
    }
  }

  &__link {
    text-decoration: none;
    margin-top: rem(24px);
    font-weight: 500;
    color: var(--accent);
    display: block;
  }
}
</style>
