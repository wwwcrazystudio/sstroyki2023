<template>
  <li class="rooms-group">
    <button
      class="rooms-group__toggler"
      ref="btn"
      :class="expanded && 'rooms-group__toggler--expanded'"
      @click="handleToggle"
    >
      <span>
        <span class="rooms-group__name">
          {{ roomType }} от {{ rooms.square_min }} м2
        </span>
        <span class="rooms-group__price-range">
          от {{ formatNumber(parseInt(rooms.price_min)) }} до
          {{ formatNumber(parseInt(rooms.price_max)) }} ₽
        </span>
      </span>

      <span class="rooms-group__count"> {{ rooms.quantity }} предложений </span>

      <span
        class="rooms-group__toggler-icon"
        :class="expanded && 'rooms-group__toggler-icon--expanded'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 7.15748L12.1575 17L2.31496 7.15748"
            stroke="#777777"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>

    <template v-if="expanded">
      <ul class="rooms-group__list">
        <RoomsItem :room="room" v-for="room in rooms.array.slice(0, 5)" />
      </ul>

      <NuxtLink :to="groupRoute" target="_blank" class="rooms-group__link">
        Смотреть все предложения

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M11 3.57874L6.07874 8.5L1.15748 3.57874"
            stroke="#347DE7"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </NuxtLink>
    </template>
  </li>
</template>

<script setup lang="ts">
import type { ComplexRoomsData } from '~/types/interfaces';

interface Props {
  type: number;
  rooms: ComplexRoomsData;
  isExpanding: boolean;
}

interface Emits {
  (e: 'expand'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const expanded = ref<boolean>(false);
const btn = ref<HTMLElement>();
const route = useRoute();

const formatNumber = (number: number) => {
  if (number >= 1000 && number <= 1000000) {
    return `${(number / 1000).toFixed(0)} тыс.`;
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)} млн.`;
  }

  return number;
};

const roomType = computed(() => {
  switch (props.type) {
    case 0:
      return 'Студия';
    case 1:
      return '1-комн.';
    case 2:
      return '2-комн.';
    case 3:
      return '3-комн.';
    case 4:
      return '4+-комн.';
    default:
      return '---';
  }
});

const groupRoute = computed(() => {
  const houseSlug = route.params.slug;
  switch (props.type) {
    case 0:
      return `/novostroyki/${houseSlug}/studii`;
    case 1:
      return `/novostroyki/${houseSlug}/1k-kvartiry`;
    case 2:
      return `/novostroyki/${houseSlug}/2k-kvartiry`;
    case 3:
      return `/novostroyki/${houseSlug}/3k-kvartiry`;
    case 4:
      return `/novostroyki/${houseSlug}/4k-kvartiry`;
  }
});

const handleToggle = async () => {
  if (!expanded.value) {
    emit('expand');
  }

  await nextTick();

  // Scroll only if item is opening
  if (!expanded.value) {
    window.scrollTo({
      top: btn.value?.offsetTop,
    });
  }

  expanded.value = !expanded.value;
};

watch(
  () => props.isExpanding,
  () => {
    if (props.isExpanding) {
      expanded.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.rooms-group {
  &__toggler {
    padding: rem(24px);
    display: grid;
    grid-template-columns: 1fr 1fr rem(24px);
    align-items: center;
    gap: rem(56px);
    background: #fff;
    border-radius: rem(10px);
    border: 1px solid #f8f8f8;
    text-align: left;
    width: 100%;
    transition: 500ms;

    @include media-breakpoint-down(md) {
      padding: rem(16px);
      gap: rem(16px);
    }

    &--expanded {
      box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
        0px 10px 10px 0px rgba(7, 48, 116, 0.03),
        0px 23px 14px 0px rgba(7, 48, 116, 0.02),
        0px 40px 16px 0px rgba(7, 48, 116, 0.01),
        0px 63px 18px 0px rgba(7, 48, 116, 0);
      transition: 500ms;
    }
  }

  &__name {
    font-size: rem(20px);
    font-weight: 600;
    margin-bottom: rem(8px);
    display: block;

    @include media-breakpoint-down(md) {
      font-size: rem(16px);
    }
  }

  &__price-range {
    color: var(--gray);
    white-space: nowrap;

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
    }
  }

  &__count {
    font-weight: 500;
    color: var(--accent);
    text-align: right;

    @include media-breakpoint-down(md) {
      font-size: rem(12px);
    }
  }

  &__toggler-icon {
    svg {
      @include media-breakpoint-down(md) {
        width: rem(16px);
        height: rem(16px);
      }
    }

    &--expanded {
      transform: rotate(180deg);

      svg path {
        stroke: var(--accent);
      }
    }
  }

  &__list {
    @include unlist();

    margin-top: rem(8px);
  }

  &__link {
    margin-top: rem(24px);
    display: block;
    text-decoration: none;
    font-weight: 500;
    color: var(--accent);
  }
}
</style>
