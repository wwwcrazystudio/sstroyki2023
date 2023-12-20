<template>
  <div class="documents-list">
    <button
      class="documents-list__toggler"
      :class="expanded && 'documents-list__toggler--expanded'"
      @click="handleToggle"
      ref="btn"
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.9082 19.6992L25.8977 13.4854C25.6786 13.0363 25.3416 12.6592 24.925 12.3967C24.5084 12.1342 24.0287 11.9968 23.5401 12.0001H10.6251C9.92908 12.0008 9.26183 12.2856 8.7697 12.7917C8.27757 13.2979 8.00076 13.9842 8 14.7V20.1C7.99993 20.2182 8.02252 20.3353 8.06647 20.4445C8.11042 20.5537 8.17487 20.653 8.25614 20.7366C8.3374 20.8201 8.43389 20.8864 8.54008 20.9316C8.64628 20.9768 8.76009 21.0001 8.87502 21H28.1254C28.2744 21 28.4209 20.9609 28.5511 20.8863C28.6812 20.8117 28.7907 20.7042 28.8691 20.5739C28.9475 20.4436 28.9922 20.2948 28.9991 20.1418C29.0059 19.9887 28.9746 19.8364 28.9082 19.6992Z"
          fill="#2358E7"
        />
        <path
          d="M49.36 19H8V45.4412C8 46.1198 8.27814 46.7707 8.77324 47.2505C9.26833 47.7304 9.93983 48 10.64 48H49.36C50.0602 48 50.7317 47.7304 51.2268 47.2505C51.7219 46.7707 52 46.1198 52 45.4412V21.5588C52 20.8802 51.7219 20.2293 51.2268 19.7495C50.7317 19.2696 50.0602 19 49.36 19Z"
          fill="#2358E7"
        />
        <rect x="10" y="22" width="40" height="17" rx="2" fill="#FDEDD3" />
        <rect x="27" y="24" width="21" height="3" rx="1" fill="#D8C3A1" />
        <rect x="13" y="24" width="9" height="3" rx="1" fill="#D8C3A1" />
        <path
          d="M49.36 31H8V46.5C8 46.8978 8.27814 47.2794 8.77324 47.5607C9.26833 47.842 9.93983 48 10.64 48H49.36C50.0602 48 50.7317 47.842 51.2268 47.5607C51.7219 47.2794 52 46.8978 52 46.5V32.5C52 32.1022 51.7219 31.7206 51.2268 31.4393C50.7317 31.158 50.0602 31 49.36 31Z"
          fill="#347DE7"
        />
      </svg>

      <span class="documents-list__toggler-title">
        Проектная декларация

        <span>
          {{ documents.length }}
          {{ plural(documents.length, 'файл', 'файла', 'файлов') }}</span
        >
      </span>

      <span
        class="documents-list__toggler-icon"
        :class="expanded && 'documents-list__toggler-icon--expanded'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 7.15748L12.1575 17L2.31496 7.15748"
            stroke="#777777"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>
    <ul class="documents-list__list" v-if="expanded">
      <DocumentsItem :item="item" v-for="item in documents" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { DocumentItemType } from '~/types/interfaces';
import plural from 'plural-ru';

interface Props {
  documents: DocumentItemType[];
}

defineProps<Props>();

const expanded = ref<boolean>(false);
const btn = ref<HTMLButtonElement>()

const handleToggle = async () => {
  await nextTick()

  if (!expanded.value) {
    window.scrollTo({
      top: btn.value?.offsetTop,
    });
  }

  expanded.value = !expanded.value;
};

</script>

<style lang="scss" scoped>
.documents-list {
  &__toggler {
    display: grid;
    grid-template-columns: rem(60px) auto rem(24px);
    align-items: center;
    text-align: left;
    gap: rem(8px);
    width: 100%;
    padding: rem(24px);
    background-color: #fff;
    transition: 500ms;
    border-radius: rem(10px);

    @include media-breakpoint-down(md) {
        padding: rem(16px);
      }

    &--expanded {
      box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
      transition: 500ms;
    }
  }

  
  &__toggler-title {
      font-size: rem(24px);
      font-style: normal;
      font-weight: 600;

      @include media-breakpoint-down(md) {
        font-size: rem(16px);
      }

      span {
        display: block;
        color: var(--gray);
        font-weight: 400;
        font-size: rem(16px);
      }
    }

  &__toggler-icon {
    svg {
      @include media-breakpoint-down(md) {
        width: rem(16px);
        height: rem(16px);
      }
    }

    &--expanded {
      transform: rotate(180deg);

      svg path {
        stroke: var(--accent);
      }
    }
  }

  &__list {
    @include unlist();

    display: grid;
    gap: rem(24px);
  }
}
</style>
