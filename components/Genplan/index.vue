<template>
  <div class="genplan">
    <div class="genplan__wrap">
      <div class="genplan__heading">Генплан проекта</div>

      <div class="genplan__img">
        <img src="@/assets/img/placeholder/plan.jpg" alt="" />

        <GenplanPopup class="genplan__genplan-popup" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.genplan {
  &__wrap {
    border-radius: rem(20px);
    border: 1px solid #f8f8f8;
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
    padding: rem(32px);

    @include media-breakpoint-down(md) {
      padding: rem(16px);
      border-radius: rem(16px);
    }
  }

  &__heading {
    @extend %h2;
    
    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__img {
    height: rem(540px);
    position: relative;

    @include media-breakpoint-down(md) {
      max-height: rem(300px);
      height: auto;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__genplan-popup {
    position: absolute;
    right: 10%;
    top: 20%;
    width: 100%;
    max-width: rem(352px);

    @include media-breakpoint-down(md) {
      display: none;
    }
  }
}
</style>
