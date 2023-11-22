<template>
  <div class="map">
    <div class="map__wrap">
      <div class="map__closest">
        <ul class="map__closest-list">
          <li class="map__closest-item" v-for="item in nearestOrgs">
            <FormCheckbox
              label=""
              :value="item.label"
              v-model:checked="item.show"
              name="nearest"
              @change="handleUpdateNearest"
            >
              <span class="map__closest-item-content">
                <img :src="item.icon" :alt="item.label" />
                <span class="map__closest-item-title">{{ item.label }}</span>
                <span class="map__closest-item-count">{{ item.count }}</span>
              </span>
            </FormCheckbox>
          </li>
        </ul>
      </div>
      <div
        class="map__container"
        ref="container"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LngLat, YMap, Feature, YMapMarker } from '@yandex/ymaps3-types';
import food from '~~/assets/img/map/food.svg';
import shops from '~~/assets/img/map/shops.svg';
import drugs from '~~/assets/img/map/drugs.svg';
import beauty from '~~/assets/img/map/beauty.svg';
import child from '~~/assets/img/map/child.svg';
import edu from '~~/assets/img/map/edu.svg';
import hospitals from '~~/assets/img/map/hospital.svg';
import type { ComplexData } from '~/types/interfaces';

interface Props {
  complex?: ComplexData;
}

interface FeatureCollection {
  type: string;
  features: Feature[];
}

interface NearestOrgs {
  label: string;
  icon: string;
  show: boolean;
  count: number;
  locations: Feature[];
  query: string;
}

const props = defineProps<Props>();

let ymap: YMap;
let nearestPlacesMarkers:YMapMarker[] = [];

const container = ref<HTMLElement>();
const mainMarker = ref<HTMLElement>();


const center = ref<LngLat>(
  props.complex
    ? [parseFloat(props.complex.longitude), parseFloat(props.complex.latitude)]
    : [37.673856, 55.751574]
);

const nearestOrgs = ref<NearestOrgs[]>([
  {
    label: 'Рестораны',
    icon: food,
    show: true,
    count: 0,
    locations: [],
    query: 'Москва, Московская область, кафе, ресторан',
  },
  {
    label: 'Магазины',
    icon: shops,
    show: true,
    count: 0,
    locations: [],
    query: 'Москва, Московская область, магазин, супермаркет, гипермаркет',
  },
  {
    label: 'Аптеки',
    icon: drugs,
    show: true,
    count: 0,
    locations: [],
    query: 'Москва, Московская область, аптека',
  },
  {
    label: 'Красота',
    icon: beauty,
    show: true,
    count: 0,
    locations: [],
    query: 'Москва, Московская область, парикмахерская, салон красоты, спа',
  },
  {
    label: 'Детские площадки',
    icon: child,
    show: true,
    count: 0,
    locations: [],
    query: 'Москва, Московская область, детская площадка',
  },
  {
    label: 'Образование',
    icon: edu,
    show: true,
    count: 0,
    locations: [],
    query: 'Москва, Московская область, школа, университет, училище',
  },
  {
    label: 'Поликлиники',
    icon: hospitals,
    show: true,
    count: 0,
    locations: [],
    query:
      'Москва, Московская область, клиника, госпиталь, больница, поликлиника',
  },
]);

const handleUpdateNearest = () => {
  nearestPlacesMarkers?.forEach((el) => {
    ymap.removeChild(el as any);
  });

  nearestPlacesMarkers = []


  nearestOrgs.value.filter(el => el.show).forEach((org) => {
    org.locations.forEach((location) => {
      location.geometry?.coordinates &&
        addMapMarker(org.label, location.geometry.coordinates);
    });
  });
};

const handleMainMarkerSizeChange = () => {
  let { zoom } = ymap;

  if (mainMarker.value) {
    mainMarker.value.style.width = `${zoom * 4}px`;
    mainMarker.value.style.height = `${zoom * 4}px`;

    if (zoom < 14.5) {
      mainMarker.value.classList.add('map__marker--no-circle');
    } else {
      mainMarker.value.classList.remove('map__marker--no-circle');
    }
  }
};

const initMap = async (container: HTMLElement) => {
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
  } = ymaps3;

  ymap = new YMap(container, {
    location: {
      center: center.value,
      zoom: 16,
    },
  });

  ymap.addChild(new YMapDefaultSchemeLayer({ theme: 'light' }));
  ymap.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));

  const mapListener = new YMapListener({
    layer: 'any',
    onActionEnd: handleMainMarkerSizeChange,
    onUpdate: handleMainMarkerSizeChange,
  });

  ymap.addChild(mapListener);
};

const searchOrganizations = async (text: string) => {
  const resp = await $fetch<FeatureCollection>(
    'https://search-maps.yandex.ru/v1/',
    {
      params: {
        text: text.toLowerCase(),
        //apikey: '85c87d49-019a-4319-8482-ad53b1dedbd4',
        apikey: '461d3a8a-732f-4b1a-828d-27399a8350f8',
        lang: 'ru_RU',
        ll: `${center.value.join(',')}`,
        spn: '0.005,0.005',
        //bbox: `${ymap.bounds[1].join(',')}~${ymap.bounds[0].join(',')}`,
        results: 200,
      },
    }
  );

  return resp.features;
};

const addCurrentComplexMarker = () => {
  if (!props.complex) return;

  const { YMapMarker } = ymaps3;

  const icon = document.createElement('div');
  const img = document.createElement('img');
  icon.classList.add('map__marker');
  icon.classList.add('map__marker--current');

  if (props.complex?.image_other.images) {
    img.src = `${props.complex?.image_other.path}/${props.complex.image_other.images[0]}`;
  }

  mainMarker.value = icon;

  icon.append(img);

  const marker = new YMapMarker(
    {
      coordinates: [
        parseFloat(props.complex.longitude),
        parseFloat(props.complex.latitude),
      ],
    },
    icon
  );

  ymap?.addChild(marker);

  icon.addEventListener('click', () => {
    ymap?.setLocation({
      center: [
        parseFloat(props.complex!.longitude),
        parseFloat(props.complex!.latitude),
      ],
      zoom: 16,
    });
  });
};

const addMapMarker = (type: string, geo: LngLat) => {
  const iconSrc = () => {
    switch (type) {
      case 'Рестораны':
        return food;
      case 'Магазины':
        return shops;
      case 'Аптеки':
        return drugs;
      case 'Красота':
        return beauty;
      case 'Детские площадки':
        return child;
      case 'Образование':
        return edu;
      case 'Поликлиники':
        return hospitals;
      default:
        return '';
    }
  };

  const { YMapMarker } = ymaps3;

  const icon = document.createElement('div');
  const img = document.createElement('img');
  icon.classList.add('map__marker');
  img.src = iconSrc();

  icon.append(img);

  const marker = new YMapMarker(
    {
      coordinates: geo,
    },
    icon
  );

  ymap?.addChild(marker);

  nearestPlacesMarkers?.push(marker);
};

onMounted(async () => {
  if (!container.value) return;

  await initMap(container.value);

  if (props.complex) {
    addCurrentComplexMarker();
  }

  const orgsArr = nearestOrgs.value.map(async (org) => {
    const locations = await searchOrganizations(org.query);

    return {
      ...org,
      count: locations.length,
      locations: locations,
    };
  });

  nearestOrgs.value = await Promise.all(orgsArr);

  nearestOrgs.value.filter(el => el.show).forEach((org) => {
    org.locations.forEach((location) => {
      location.geometry?.coordinates &&
        addMapMarker(org.label, location.geometry.coordinates);
    });
  });
});
</script>

<style lang="scss">
.map {
  &__marker {
    cursor: pointer;

    &--current {
      width: rem(84px);
      height: rem(84px);
      border-radius: 50%;
      box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
        0px 10px 10px 0px rgba(7, 48, 116, 0.03),
        0px 23px 14px 0px rgba(7, 48, 116, 0.02),
        0px 40px 16px 0px rgba(7, 48, 116, 0.01),
        0px 63px 18px 0px rgba(7, 48, 116, 0);
      transform: translate(-24px, -24px);
      border-radius: 50%;
      z-index: 10;

      &::before {
        content: '';
        position: absolute;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background-color: var(--accent);
        opacity: 0.24;
        border-radius: 50%;
        z-index: -1;
        transition: 500ms;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid #fff;
        transition: 500ms;
      }
    }

    &--no-circle {
      img {
        border-color: var(--accent);
        box-shadow: none;
        transition: 500ms;
      }

      &::before {
        transform: scale(0);
        transition: 500ms;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.map {
  &__wrap {
    position: relative;
    border-radius: rem(15px);
    overflow: hidden;
  }

  &__container {
    width: 100%;
    height: rem(520px);
  }

  &__closest {
    position: absolute;
    left: rem(24px);
    z-index: 11;
    top: 0;
    bottom: 0;
    margin: auto;
    height: fit-content;
    padding: rem(32px);
    background-color: #fff;
    border-radius: rem(20px);
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
    width: 100%;
    max-width: rem(342px);

    @include media-breakpoint-down(md) {
        position: static;
        max-width: 100%;
        padding: rem(16px)
    }
  }

  &__closest-list {
    @include unlist();

    display: grid;
    gap: rem(24px);

    @include media-breakpoint-down(md) {
        gap: rem(16px)
    }
  }

  &__closest-item-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: rem(8px);
    margin-left: rem(8px);

    @include media-breakpoint-down(md) {
        margin-left: rem(16px);
    }
  }

  &__closest-item-count {
    margin-left: auto;
    color: var(--gray);
  }
}
</style>
