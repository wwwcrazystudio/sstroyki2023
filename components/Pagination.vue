<template>
    <div class="pagination">
        <VueAwesomePaginate :total-items="totalItems" :items-per-page="9" :max-pages-shown="3" v-model="active"
            hide-prev-next-when-ends pagination-container-class="pagination__list" paginate-buttons-class="pagination__link"
            active-page-class="pagination__link--active">
            <template #prev-button>
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
                    <path d="M28.5 32L21.5 25L28.5 18" stroke="#454545" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </template>
            <template #next-button>
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
                    <path d="M22.5 32L29.5 25L22.5 18" stroke="#454545" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </template>
        </VueAwesomePaginate>
    </div>
</template>
  
<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate';

interface Props {
    totalItems: number;
    perPage: number;
    activePage: number;
}

interface Emits {
    (e: 'update:activePage', value: number): void;
    (e: 'change', value: number): void;
}


const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const active = ref<number>(props.activePage);

const handleChange = (page: number) => {
    emits('update:activePage', page);
    emits('change', page);
};

watch(
    () => active.value,
    () => {
        handleChange(active.value);
    }
);
</script>
  
<style lang="scss" scoped>
.pagination {
    &:deep(.pagination__list) {
        @include unlist();

        display: flex;
        align-items: center;
        justify-content: center;
        gap: rem(18px);
    }

    &:deep(.pagination__link) {
        width: rem(50px);
        height: rem(50px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: rem(18px);
        color: var(--dark);
        text-decoration: none;
        transition: 500ms;
        border-radius: rem(5px);
        border: 1px solid #ddd;

        &:hover {
            color: $main;
            transition: 500ms;
        }
    }

    &:deep(.pagination__link--active) {

        color: #fff;
        border-color: var(--accent);
        background-color: var(--accent);
        transition: 500ms;
    }
}
</style>
  