<template>
  <div class="price-chart">
    <div class="price-chart__wrap">
      <div class="price-chart__heading">Уровень изменения цен на квартиру</div>

      <ul class="price-chart__range">
        <li class="price-chart__range-item">
          Мин:
          <span>{{ Math.min(...historyPrices).toLocaleString() }} ₽</span>
        </li>

        <li class="price-chart__range-item">
          Макс:
          <span>{{ Math.max(...historyPrices).toLocaleString() }} ₽</span>
        </li>
      </ul>

      <ClientOnly>
        <Line class="price-chart__chart" :options="options" :data="data" />
      </ClientOnly>

      <div class="price-chart__tooltip" ref="tooltipEl">123</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

import type { ChartData, ChartOptions } from 'chart.js';
import type { HistoryItem } from '~/types/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

interface Props {
  history: HistoryItem[];
}

const props = defineProps<Props>();

const historyPrices = computed(() => {
  const prices = props.history.map((el) => parseInt(el.price, 10));

  return prices;
});

const tooltipEl = ref<HTMLElement>();

const data = {
  labels: props.history.map((el) => el.date),
  datasets: [
    {
      fill: 'start',
      borderColor: '#347DE7',
      borderWidth: 3,
      pointRadius: 0,
      pointHoverRadius: 8,
      pointHoverBorderWidth: 2,
      pointHoverBorderColor: '#347DE7',
      pointHoverBackgroundColor: '#fff',
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, 'rgba(255,255,255, 0)');
        gradient.addColorStop(1, '#347DE7');

        return gradient;
      },
      data: historyPrices.value,
    },
  ],
} as ChartData<'line'>;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  hover: {
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  layout: {
    padding: 0,
  },

  scales: {
    x: {
      offset: false,
      display: process.client ? window.matchMedia('(min-width: 768px)').matches : true,
      grid: {
        display: false,
      },
      bounds: 'data',
      ticks: {
        align: 'inner',
        padding: 20,
        color: '#777',
        font: {
          size: 14,
        },
      },
    },
    y: {
      grace: '30',
      ticks: {
        maxTicksLimit: 7,
        align: 'start',
        backdropPadding: {
          bottom: 100,
        },
        color: '#777',
        font: {
          size: 14,
        },
      },
      grid: {
        color: '#F8F8F8',
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: (context) => {
        // Tooltip Element
        const { chart, tooltip } = context;

        if (!tooltipEl.value) return;

        if (tooltip.opacity === 0) {
          tooltipEl.value.style.opacity = '0';
          return;
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

        tooltipEl.value.style.opacity = '1';
        tooltipEl.value.style.left = positionX + tooltip.caretX - 35 + 'px';
        tooltipEl.value.style.top = positionY + tooltip.caretY - 60 + 'px';
        tooltipEl.value.innerHTML = tooltip.dataPoints[0].formattedValue;
      },
    },
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
} as ChartOptions<'line'>;
</script>

<style lang="scss" scoped>
.price-chart {
  &__wrap {
    padding: rem(32px);
    border-radius: rem(20px);
    background: #fff;

    @include media-breakpoint-down(md) {
      padding: rem(16px);
    }
  }

  &__heading {
    @extend %h2;

    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__range {
    @include unlist();

    display: flex;
    align-items: center;
    gap: rem(16px);
    margin-bottom: rem(24px);
  }

  &__range-item {
    padding: rem(8px 16px);
    border-radius: rem(5px);
    background: #f8f8f8;
    color: var(--gray);

    span {
      color: var(--dark);
      display: block;
      font-weight: 600;
      margin-top: rem(12px);
    }
  }

  &__chart {
    max-height: rem(325px);

    @include media-breakpoint-down(md) {
      max-height: rem(240px);
    }
  }

  &__tooltip {
    border-radius: rem(40px);
    border: 1px solid #ddd;
    background: #fff;
    padding: rem(8px 16px);
    padding-left: rem(44px);
    position: absolute;
    opacity: 0;

    &::before {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M2 14L7.29289 8.70711C7.68342 8.31658 8.31658 8.31658 8.70711 8.70711L14 14' stroke='%23347DE7' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M2 8L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L14 8' stroke='%23347DE7' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      width: rem(16px);
      height: rem(16px);
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      left: rem(16px);
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>
