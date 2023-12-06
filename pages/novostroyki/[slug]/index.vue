<template>
  <div class="apartment-page" v-if="data?.complex && data?.developer">
    <ApartmentHead :complex="data.complex" :developer="data.developer" />

    <div class="container">
      <div class="apartment-page__content">
        <div class="apartment-page__col">
          <ApartmentRooms
            class="apartment-page__apartment-rooms"
            :rooms="data.complex.rooms"
            :date-updated="data.complex.price_date_update"
          />

          <Genplan :complex="data.complex" class="apartment-page__genplan" />

          <CreditCalc
            v-if="data.complex.rooms"
            :complex="data.complex"
            class="apartment-page__credit-calc"
          />

          <ApartmentDetails
            :complex="data.complex"
            class="apartment-page__apartment-details"
          />

          <ApartmentLocation :complex="data.complex" />

          <ApartmentFacing :complex="data.complex" />

          <ApartmentDeveloper
            :complex="data.complex"
            :developer="data.developer"
          />
          <ApartmentRelatedApartments
            title="Другие ЖК от застройщика"
            :houses="
              Object.values(data.developer.houses).filter(
                (el) => el.developer_id && el.house_id !== data?.complex.house_id
              )
            "
          />

          <ApartmentDocuments :documents="data.complex.documents" />

          <ApartmentRelatedApartments
            title="ЖК в том же ценовом диапазоне"
            :houses="data.complex.recommended.filter(el => el.house_id !== data?.complex.house_id)"
          />
        </div>

        <div class="apartment-page__col">
          <ApartmentMiniInfo
            :complex="data.complex"
            :developer="data.developer"
            class="apartment-page__apartment-mini-info"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ComplexData,
  DeveloperData,
  Route,
  Tag,
} from '~/types/interfaces';

interface PageData {
  complex: ComplexData;
  developer: DeveloperData;
}

const route = useRoute();

const { data } = await useFetch<PageData>(
  `/api/novostroyki/${route.params.slug}`
);

console.log(data.value);

// if (!data.value?.complex) {
//   navigateTo('/');
// }
</script>

<style lang="scss" scoped>
.apartment-page {
  &__apartment-mini-info {
    position: sticky;
    background: #fff;
    padding: rem(24px);
    top: rem(32px);

    @include media-breakpoint-down(md) {
      padding: rem(16px);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: auto rem(374px);
    gap: rem(24px);
    margin: rem(56px 0);

    @include media-breakpoint-down(xxl) {
      gap: rem(32px);
    }

    @include media-breakpoint-down(lg) {
      grid-template-columns: 1fr;
      margin: rem(24px 0);
      gap: rem(24px);
    }
  }

  &__col {
    min-width: 1px;
    display: flex;
    flex-direction: column;
    gap: rem(56px);

    @include media-breakpoint-down(lg) {
      gap: rem(24px);
    }
  }
}
</style>
