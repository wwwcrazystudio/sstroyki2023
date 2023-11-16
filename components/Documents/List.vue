<template>
  <div class="documents-list">
    <ul class="documents-list__list">
      <DocumentsItem :item="''" />
      <DocumentsItem :item="''" />
      <DocumentsItem :item="''" />
    </ul>
  </div>
</template>

<script lang="ts" setup>

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

