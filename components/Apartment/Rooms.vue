<template>
  <div class="apartment-rooms">
    <div class="apartment-rooms__wrap">
      <div class="apartment-rooms__heading">
        {{ totalRooms }} {{ plural(totalRooms, 'квартира', 'квартиры', 'квартир') }} от
        застройщика
      </div>
      <div class="apartment-rooms__subheading">
        Информация о ценах и наличии обновлена {{ formattedDate }}
      </div>

      <ul class="apartment-rooms__list">
        <template v-for="group, index in rooms">
          <RoomsGroup :type="getRoomType(index)" :rooms="group" v-if="group.array.length" />
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import plural from 'plural-ru';
import type { ComplexRoomsData } from '~/types/interfaces';

interface Props {
  dateUpdated: string;
  rooms: ComplexRoomsData[];
}

const props = defineProps<Props>();

const totalRooms = computed(() => {
  return props.rooms?.reduce((acc, room) => acc + parseInt(room.quantity), 0);
});

const formattedDate = computed(() => {
  return DateTime.fromSQL(props.dateUpdated).toFormat('dd.MM.yyyy');
});

const getRoomType = (index: number) => {
  switch (index) {
    case 0:
      return 'Студия';
      case 1:
      return '1-комн.';
      case 2:
      return '2-комн.';
      case 3:
      return '3-комн.';
      case 4:
      return '4-комн.';
      default:
      return '---';
  }
}
</script>

<style lang="scss" scoped>
.apartment-rooms {
  &__heading {
    @extend %h2;
    
    margin-bottom: rem(16px);
  }

  &__subheading {
    color: var(--gray);
    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
      margin-bottom: rem(24px)
    }
  }

  &__list {
    @include unlist();

    display: grid;
    gap: rem(16px);
  }
}
</style>
