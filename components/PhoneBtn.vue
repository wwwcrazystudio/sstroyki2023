<template>
  <div class="phone-btn">
    <button
      class="phone-btn__btn"
      v-if="!showPhone"
      @click="showPhone = true"
    >
      Показать телефон
    </button>
    <button
      class="phone-btn__tel"
      v-if="showPhone"
    >
      {{ phone }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  phone: string;
}

defineProps<Props>()
const showPhone = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.phone-btn {
  &__btn {
    @extend %btn-accent;

    width: 100%;
  }

  &__tel {
    @extend %btn;

    color: var(--dark);
    width: 100%;
    font-weight: 600;

    &:hover {
      box-shadow: none;
    }
  }
}
</style>

