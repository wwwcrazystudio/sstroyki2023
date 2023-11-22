<template>
    <div class="apartment-documents">
        <div class="apartment-documents__wrap">
            <div class="apartment-documents__heading">
                Документация
            </div>

            <DocumentsList :documents="documents" class="apartment-documents__documents-list" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DocumentItemType } from '~/types/interfaces';

interface Props {
    documents: DocumentItemType[];
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.apartment-documents {
    &__wrap {
    margin-left: rem(16px);

    @include media-breakpoint-down(md) {
      margin-left: 0;
    }
  }

  &__heading {
    @extend %h2;
    
    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

}
</style>