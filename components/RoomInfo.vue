<template>
  <div class="room-info">
    <div class="room-info__wrap">
      <h1 class="room-info__title">
        Продажа {{ roomType }}, {{ room.square }} м2
      </h1>
      <Tags class="room-info__tags" :tags="tags" />

      <div class="room-info__price">
        {{ parseFloat(room.price).toLocaleString() }} ₽

        <div class="room-info__per-square">
          {{
            Math.round(
              parseFloat(room.price) / parseFloat(room.square)
            ).toLocaleString()
          }}
          ₽ за м²
        </div>
      </div>

      <div class="room-info__address">
        {{ complex.address }}
      </div>

      <ul class="room-info__metro">
        <li class="room-info__metro-item" v-for="metro in complex.metro_info">
          <MetroDistance :metro="metro" color="dark" />
        </li>
      </ul>

      <DeveloperInfo
        class="room-info__developer-info"
        show-phone-btn
        :developer="developer"
        :complex="complex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComplexData, ComplexSingleRoom, DeveloperData, Tag } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
  developer: DeveloperData;
  room: ComplexSingleRoom;
}

const props = defineProps<Props>();

const tags = computed<Tag[]>(() => {
  const list: Tag[] = [];

  if (props.complex?.class) {
    list.push({
      label: `${props.complex.class} класс`,
    });
  }

  if (props.complex?.status) {
    list.push({
      label: `${props.room.deadline}`,
    });
  }

  return list;
});

const roomType = computed(() => {
  switch (props.room.rooms) {
    case '0':
      return `студии`
    default:
      return `${props.room.rooms}-комн. квартиры`
  }
});
</script>

<style lang="scss" scoped>
.room-info {
  &__wrap {
    padding: rem(24px);
    border-radius: rem(15px);
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
  }

  &__title {
    font-size: rem(16px);
    font-weight: 500;
    margin-bottom: rem(16px);
  }

  &__tags {
    margin-bottom: rem(16px);
  }

  &__price {
    padding: rem(12px 16px);
    border-radius: rem(10px);
    background: #f8f8f8;
    font-size: rem(32px);
    font-weight: 600;
    margin-bottom: rem(16px);
  }

  &__per-square {
    font-size: rem(16px);
    color: var(--gray);
    font-weight: 400;
    margin-top: rem(8px);
  }

  &__address {
    margin-bottom: rem(16px);
  }

  &__metro {
    @include unlist();

    display: grid;
    gap: rem(16px);
    margin-bottom: rem(16px);
  }
}
</style>
