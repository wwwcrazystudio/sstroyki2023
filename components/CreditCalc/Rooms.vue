<template>
    <div class="credit-calc-rooms">
        <div class="credit-calc-rooms__wrap">
            <div class="credit-calc-rooms__title">26 планировок</div>

            <ul class="credit-calc-rooms__list">
                <li class="credit-calc-rooms__item" v-for="room in rooms">
                    <button class="credit-calc-rooms__item-button" :class="room.uuid === selectedRoomId && 'credit-calc-rooms__item-button--active'" @click="$emit('select', room)">
                        <span class="credit-calc-rooms__item-img">
                            <img src="@/assets/img/placeholder/room.jpg" alt="">
                        </span>
                        <span class="credit-calc-rooms__item-info">
                            Площадь: <span>{{room.square}} м²</span>
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ComplexSingleRoom } from '~/types/interfaces';

interface Props {
    rooms: ComplexSingleRoom[]
    selectedRoomId?: string
}

interface Emits {
    (e: 'select', value: ComplexSingleRoom): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.credit-calc-rooms {
    &__wrap {
        padding: rem(24px);
        background-color: #fff;
        border-radius: rem(12px);
    }

    &__title {
        font-size: rem(20px);
        font-weight: 600;
        margin-bottom: rem(12px);

        @include media-breakpoint-down(md) {
            font-size: rem(16px);
        }
    }

    &__list {
        @include scrollbar();
        @include unlist();

        padding-right: rem(20px);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: rem(12px);
        height: rem(350px);
        overflow: auto;

        @include media-breakpoint-down(md) {
            grid-template-columns: 1fr 1fr;
            height: rem(275px);
            gap: rem(16px)
        }
    }

    &__item-button {
        border-radius: 8px;
        background: #FFF;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: rem(12px);
        border: 1px solid transparent;
        padding-bottom: rem(12px);
        width: 100%;

        &--active {
            border-color: var(--accent);
        }
    }

    &__item-img {
        border-radius: 8px;
        border: 1px solid #F8F8F8;
        height: rem(110px);

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &__item-info {
        display: flex;
        flex-direction: column;
        gap: rem(8px);
        text-align: center;
        font-size: rem(14px);
        color: var(--gray);

        span {
            display: block;
            color: var(--dark);
        }
    }
}
</style>