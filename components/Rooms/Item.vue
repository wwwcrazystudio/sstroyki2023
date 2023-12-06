<template>
  <li class="rooms-item">
    <div class="rooms-item__wrap">
      <div class="rooms-item__scheme">
        <img :src="room.plan_room" v-if="room.plan_room" alt="" />
      </div>

      <div class="rooms-item__info">
        <div class="rooms-item__price">
          {{ parseInt(room.price).toLocaleString() }} ₽

          <span class="rooms-item__per-square">{{ Math.round(parseInt(room.price) / parseFloat(room.square)).toLocaleString() }} ₽ за м²</span>
        </div>

        <div class="rooms-item__size">
          {{ roomType }} площадью: <span>{{room.square }} м2</span>
          <span>{{room.floor}} / {{ room.floors }} этаж</span>
        </div>

        <div class="rooms-item__finished">
          Срок сдачи: <span>{{formattedDeadline}} </span>
        </div>
      </div>

      <NuxtLink :to="groupRoute" class="rooms-item__link" target="_blank"> Посмотреть квартиру </NuxtLink>
    </div>
  </li>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import type { ComplexSingleRoom } from '~/types/interfaces';

const route = useRoute()

interface Props {
  room: ComplexSingleRoom
}

const props = defineProps<Props>()

const formattedDeadline = computed(() => {
  const date = DateTime.fromSQL(props.room.deadline)
  const { quarter, year } = date
  return `${quarter} квартал ${year} г.`
})

const roomType = computed(() => {
  switch (props.room.rooms) {
    case '0':
      return 'Студия';
    default:
      return `${props.room.rooms}-комн. квартира`;
  }
});

const groupRoute = computed(() => {
  const houseSlug = route.params.slug
  switch (props.room.rooms) {
    case '0':
    return `/novostroyki/${houseSlug}/studii/${props.room.uuid}`
    case '1':
    return `/novostroyki/${houseSlug}/1k-kvartiry/${props.room.uuid}`
    case '2':
    return `/novostroyki/${houseSlug}/2k-kvartiry/${props.room.uuid}`
    case '3':
    return `/novostroyki/${houseSlug}/3k-kvartiry/${props.room.uuid}`
    case '4':
    return `/novostroyki/${houseSlug}/4k-kvartiry/${props.room.uuid}`
  }
})
</script>

<style lang="scss" scoped>
.rooms-item {
  &__wrap {
    padding: rem(16px 24px);
    display: grid;
    align-items: center;
    grid-template-columns: rem(80px) auto auto;
    gap: rem(12px);
    border-bottom: 1px solid #ddd;

    @include media-breakpoint-down(md) {
      padding: rem(16px 0);
      gap: rem(12px);
      grid-template-columns: rem(70px) auto auto;
    }
  }

  &__scheme {
    width: rem(80px);
    height: rem(80px);
    border-radius: rem(5px);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    @include media-breakpoint-down(md) {
      width: rem(70px);
      height: rem(70px);
    }

    img {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
  }

  &__info {
    display: grid;
    gap: rem(8px);
  }

  &__price {
    font-size: rem(20px);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: rem(8px);

    @include media-breakpoint-down(md) {
      font-size: rem(16px);
    }
  }

  &__per-square {
    font-size: rem(14px);
    font-weight: 400;
    color: var(--gray);
  }

  &__size {
    color: var(--gray);
    display: flex;
    align-items: center;
    gap: rem(8px);

    @include media-breakpoint-down(md) {
      font-size: rem(12px);
    }

    span {
      font-weight: 500;
      color: var(--dark);
    }
  }

  &__finished {
    color: var(--gray);
    font-size: rem(14px);
    display: flex;
    align-items: center;
    gap: rem(8px);

    @include media-breakpoint-down(md) {
      font-size: rem(12px);
    }

    span {
      font-weight: 500;
      color: var(--dark);
    }
  }

  &__link {
    color: var(--accent);
    font-weight: 500;
    text-align: right;
    text-decoration: none;

    @include media-breakpoint-down(md) {
      display: none;
    }
  }
}
</style>
