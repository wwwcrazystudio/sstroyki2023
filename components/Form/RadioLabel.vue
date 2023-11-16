<template>
  <div class="radio-label">
    <div class="radio-label__wrap">
      <input
        :id="id"
        type="radio"
        :name="name"
        :value="value"
        :checked="checked"
        class="radio-label__control"
        @change="handleChange"
      />
      <label :for="id" class="radio-label__label">
      {{ label }}
    </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'

interface Props {
  label: string;
  name: string;
  value: string | number | boolean;
  checked: boolean;
}

interface Emits {
  (e: 'update:checked', value: boolean): void;
  (e: 'change'): void;
}

const id = ref<string>(nanoid())

const emit = defineEmits<Emits>()
defineProps<Props>();

const handleChange = (e: Event) => {
  emit('update:checked', (e.target as HTMLInputElement).checked )
  emit('change')
}
</script>

<style lang="scss" scoped>
.radio-label {
  &__wrap {
    position: relative;
  }

  &__label {
    padding: rem(24px 16px);
    border-radius: rem(10px);
    border: 1px solid #fff;
    background: #fff;
    font-weight: 600;
    font-size: rem(18px);
    display: flex;
    align-items: center;
    color: var(--gray);
    justify-content: center;
    transition: 500ms;
    cursor: pointer;

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
      padding: rem(14px);
    }
  }

  &__control {
    position: absolute;
    opacity: 0;
    z-index: -100;

    &:checked {
      ~ label {
        color: #fff;
        background: var(--accent);
        border-color: var(--accent);
        transition: 500ms;
      }
    }
  }
}
</style>
