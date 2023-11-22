<template>
  <div class="checkbox">
    <div class="checkbox__wrap">
      <input type="checkbox" class="checkbox__control" :name="name" :id="id" :value="value" :checked="checked" @change="handleChange">
      <label class="checkbox__label" :for="id">
        <slot></slot>
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
.checkbox {
  &__wrap {
    position: relative;
  }

  &__label {
    padding-left: rem(20px);
    font-size: rem(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 500ms;
    cursor: pointer;

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
    }

    &::before {
      content: '';
      width: rem(20px);
      height: rem(20px);
      border: 1px solid var(--accent);
      border-radius: rem(2px);
      position: absolute;
      top: 0;
      margin: auto;
      bottom: 0;
      left: 0;
    }

    &::after {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M10 3L4.5 8.5L2 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: rem(20px);
      height: rem(20px);
      background-size: rem(12px);
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0;
      position: absolute;
      top: 0;
      margin: auto;
      bottom: 0;
      left: 0;
    }
  }

  &__control {
    position: absolute;
    opacity: 0;
    z-index: -100;

    &:checked {
      ~ label {

        &::before {
          background-color: var(--accent);
        }
        
        &::after {
          opacity: 1;
          transition: 500ms;
        }
      }
    }
  }
}
</style>
