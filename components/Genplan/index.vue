<template>
  <div class="genplan" v-if="complex.scheme">
    <div class="genplan__wrap">
      <div class="genplan__heading">Генплан проекта</div>

      <div class="genplan__img">
        <img :src="complex.scheme" alt="" />

        <div
          class="genplan__item"
          :class="item.label === activeItem?.label && 'genplan__item--active'"
          v-for="item in complex.scheme_list"
          :style="{ top: `${item.y}%`, left: `${item.x}%` }"
          @mouseenter.stop="(e) => handleSetActiveItem(e, item)"
          @click.stop
        ></div>

        <div
          ref="popup"
          :style="floatingStyles"
          @mouseleave.stop="activeItem = undefined"
        >
          <GenplanPopup
            class="genplan__genplan-popup"
            :item="activeItem"
            v-if="activeItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComplexData, SchemeItem } from '~/types/interfaces';
import { useFloating, offset, flip, shift } from '@floating-ui/vue';

interface Props {
  complex: ComplexData;
}

defineProps<Props>();

const activeItem = ref<SchemeItem | undefined>();

const reference = ref<HTMLElement>();
const popup = ref<HTMLElement>();

const { floatingStyles } = useFloating(reference, popup, {
  placement: 'right',
  middleware: [offset(10), flip(), shift()],
});

const handleDocumentClick = (e: MouseEvent) => {
  if (popup.value?.contains(e.target as HTMLElement)) return;

  activeItem.value = undefined;
};

const handleSetActiveItem = (e: MouseEvent, item: SchemeItem) => {
  activeItem.value = item;
  reference.value = e.target as HTMLElement;
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<style lang="scss" scoped>
.genplan {
  &__wrap {
    border-radius: rem(20px);
    border: 1px solid #f8f8f8;
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
    padding: rem(32px);

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

  &__img {
    height: rem(540px);
    position: relative;

    @include media-breakpoint-down(md) {
      max-height: rem(300px);
      height: auto;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: rem(16px);
    }
  }

  &__genplan-popup {
    width: 100%;
    max-width: rem(352px);
  }

  &__item {
    width: rem(10px);
    height: rem(10px);
    position: absolute;
    border: 2px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: 500ms;
    z-index: 100;

    &--active {
      background-color: var(--accent);
      transition: 500ms;
    }

    &:hover {
      transform: scale(2);
      transition: 500ms;
    }
  }
}
</style>
