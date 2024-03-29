<template>
  <div class="credit-calc">
    <div class="credit-calc__wrap">
      <div class="credit-calc__heading">Ипотечный калькулятор</div>
      <div class="credit-calc__subheading">
        Рассчитайте ежемесячный платёж по ипотеке для покупки квартиры в ЖК
        {{ complex.name }}
      </div>

      <div class="credit-calc__content">
        <div class="credit-calc__col">
          <CreditCalcGroup
            class="credit-calc__credit-calc-group"
            title="Цена квартиры"
            v-model:value="calcData.price"
            :min="parseInt(complex.rooms[roomType].price_min)"
            :max="parseInt(complex.rooms[roomType].price_max)"
            postfix="₽"
            disabled
          />
          <CreditCalcGroup
            title="Первоначальный взнос"
            class="credit-calc__credit-calc-group"
            v-model:value="calcData.firstPay"
            :min="Math.round(calcData.price * 0.05)"
            :max="Math.round(calcData.price * 0.95)"
            postfix="₽"
            :additionalValue="firstPayPercentage"
            minLabelPostfix="5%"
            maxLabelPostfix="95%"
          />
          <CreditCalcGroup
            title="Срок кредитования"
            class="credit-calc__credit-calc-group"
            v-model:value="calcData.years"
            :max="30"
            :min="1"
            postfix="год"
          />
          <CreditCalcGroup
            class="credit-calc__credit-calc-group"
            title="Ставка"
            v-model:value="calcData.percent"
            :max="15"
            :min="0.1"
            :step="0.1"
            postfix="%"
          />

          <template v-if="!room">
            <div class="credit-calc__total">
              Ежемесячный платеж
              <span>{{ total.toLocaleString() }} ₽</span>
            </div>
            <div class="credit-calc__notice">
              Расчет условий не является публичной офертой. <br />
              Финальные условия кредитования определяются при заключении
              договора.
            </div>
          </template>
        </div>

        <div class="credit-calc__col">
          <div class="credit-calc__types" v-if="!room">
            <template v-for="(group, index) in complex.rooms">
              <FormRadioLabel
                v-if="group.array.length"
                :label="getRoomType(index)"
                :value="index"
                name="type"
                :checked="roomType === index"
                @change="roomType = index"
              />
            </template>
          </div>

          <CreditCalcRoomPreview
            @prev="handlePrev"
            @next="handleNext"
            v-if="selectedRoom"
            :hide-nav="room !== undefined"
            :room="selectedRoom"
            :current="selectedRoomIndex"
            :total="complex.rooms[roomType].array.length"
          />

          <CreditCalcRooms
            v-if="!room"
            :rooms="complex.rooms[roomType].array"
            :selectedRoomIndex="selectedRoomIndex"
            @select="selectedRoomIndex = $event"
          />

          <template v-if="room">
            <div class="credit-calc__total">
              Ежемесячный платеж
              <span>{{ total.toLocaleString() }} ₽</span>
            </div>
            <div class="credit-calc__notice">
              Расчет условий не является публичной офертой. <br />
              Финальные условия кредитования определяются при заключении
              договора.
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComplexData, ComplexSingleRoom } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
  room?: ComplexSingleRoom;
}

const props = defineProps<Props>();

const roomType = ref<number>(props.complex.rooms.findIndex(el => parseInt(el.quantity)));
const selectedRoomIndex = ref<number>(0);

const selectedRoom = computed(() => {
  return props.room || props.complex.rooms[roomType.value].array[selectedRoomIndex.value]
})

const calcData = reactive({
  price: parseInt(selectedRoom.value.price) || 568000,
  firstPay: Math.round(
    (parseInt(selectedRoom.value.price) || 568000) * 0.2
  ),
  years: 20,
  percent: 8,
});

const firstPayPercentage = computed(() => {
  return `${Math.round(100 / (calcData.price / calcData.firstPay))}%`;
});

const total = computed(() => {
  const leftoverSumm = calcData.price - calcData.firstPay;
  const totalMonthes = calcData.years * 12;
  const percentPerMonth = calcData.percent / 100 / 12;

  const monthlyPayment =
    leftoverSumm *
    ((percentPerMonth * Math.pow(1 + percentPerMonth, totalMonthes)) /
      (Math.pow(1 + percentPerMonth, totalMonthes) - 1));

  if (monthlyPayment > 0) {
    return Math.ceil(monthlyPayment);
  } else {
    return 0;
  }
});

const getRoomType = (index: number) => {
  switch (index) {
    case 0:
      return 'Студия';
    case 1:
      return '1';
    case 2:
      return '2';
    case 3:
      return '3';
    case 4:
      return '4+';
    default:
      return '---';
  }
};


const handlePrev = () => {
  const length = props.complex.rooms[roomType.value].array.length

  if (selectedRoomIndex.value === 0) {
    selectedRoomIndex.value = length - 1
    return
  }

  selectedRoomIndex.value -= 1
}

const handleNext = () => {
  const length = props.complex.rooms[roomType.value].array.length

  if (selectedRoomIndex.value === length - 1) {
    selectedRoomIndex.value = 0
    return
  }

  selectedRoomIndex.value += 1
}

watch(() => roomType.value, () => {
  selectedRoomIndex.value = 0
})

watch(
  () => selectedRoom.value,
  () => {
    const roomPrice = parseInt(selectedRoom.value?.price || '');
    calcData.price = roomPrice;
    calcData.firstPay = Math.round(roomPrice * 0.2);
  }
);
</script>

<style lang="scss" scoped>
.credit-calc {
  &__wrap {
    padding-left: rem(32px);

    @include media-breakpoint-down(md) {
      padding-left: 0;
    }
  }

  &__heading {
    @extend %h2;

    margin-bottom: rem(16px);
  }

  &__subheading {
    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
      margin-bottom: rem(24px);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: rem(24px);

    @include media-breakpoint-down(xl) {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  &__col {
    min-width: 1px;
  }

  &__credit-calc-group {
    margin-bottom: rem(24px);
  }

  &__total {
    padding: rem(24px 16px);
    border-radius: rem(12px);
    background: #fff;
    box-shadow: 0px 2px 3px 0px rgba(15, 52, 112, 0.02),
      0px 6px 6px 0px rgba(15, 52, 112, 0.02),
      0px 14px 8px 0px rgba(15, 52, 112, 0.01),
      0px 24px 10px 0px rgba(15, 52, 112, 0),
      0px 38px 11px 0px rgba(15, 52, 112, 0);

    span {
      margin-top: rem(16px);
      display: block;
      font-size: rem(24px);
      font-weight: 600;
      color: var(--accent);
    }
  }

  &__notice {
    margin-top: rem(24px);

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
      margin-top: rem(18px);
    }
  }

  &__types {
    display: flex;
    align-items: center;
    width: 100%;
    gap: rem(12px);
    margin-bottom: rem(12px);

    &:deep(.radio-label__wrap) {
      min-width: rem(64px);

      @include media-breakpoint-down(md) {
        min-width: rem(54px);
      }
    }
  }
}
</style>
