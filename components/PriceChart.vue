<template>
  <div class="price-chart">
    <div class="price-chart__wrap">
      <div class="price-chart__heading">Уровень изменения цен на квартиру</div>

      <ul class="price-chart__range">
        <li class="price-chart__range-item">
          Мин:
          <span>2 350 000 ₽</span>
        </li>

        <li class="price-chart__range-item">
          Макс:
          <span>2 820 000 ₽</span>
        </li>
      </ul>

      <Line class="price-chart__chart" :options="options" :data="data" />

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const tooltipEl = ref<HTMLElement>();

const data = {
  labels: ['Сентябрь 2023', 'Октябрь 2023', 'Ноябрь 2023', 'Декабрь 2023'],
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
      data: [2400000, 2600000, 2300000, 2700000],
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
