<template>
  <div class="documents-list">
    <ul class="documents-list__list">
      <DocumentsItem :item="item" v-for="item in documents" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { DocumentItemType } from '~/types/interfaces';

interface Props {
  documents: DocumentItemType[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.documents-list {
  &__list {
    @include unlist();

    display: grid;
    gap: rem(24px)
  }
}
</style>

