<template>
  <div class="genplan-popup">
    <div class="genplan-popup__wrap">
      <div class="genplan-popup__title">Корпус 6</div>
      <div class="genplan-popup__finished">Сдача в 4 кв. 2024 г.</div>
      <ul class="genplan-popup__list">
        <li class="genplan-popup__item" v-for="roomType in roomtTypes">
          <NuxtLink class="genplan-popup__item-link">
            {{ roomType }} <span>от 4,3 млн ₽</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.57874 1L8.5 5.92126L3.57874 10.8425"
                stroke="#347DE7"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink class="genplan-popup__link">
        55 предложений

        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.57874 1L8.5 5.92126L3.57874 10.8425"
            stroke="#347DE7"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const roomtTypes = [
  'Студии',
  '1-комнатные',
  '2-комнатные',
  '3-комнатные',
  '4-комнатные+',
];
</script>

<style lang="scss" scoped>
.genplan-popup {
  &__wrap {
    padding: rem(24px);
    background: #fff;
    border-radius: rem(10px);
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
  }

  &__title {
    font-weight: 600;
    font-size: rem(18px);
    margin-bottom: rem(12px);
  }

  &__list {
    @include unlist();

    border-top: 1px solid #ddd;
    padding-top: rem(24px);
    margin-top: rem(24px);
    display: grid;
    gap: rem(16px);
  }

  &__item-link {
    display: flex;
    align-items: center;
    gap: rem(12px);
    text-decoration: none;

    span {
      margin-left: auto;
    }
  }

  &__link {
    text-decoration: none;
    margin-top: rem(24px);
    font-weight: 500;
    color: var(--accent);
    display: block;
  }
}
</style>
