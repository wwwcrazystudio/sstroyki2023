import { ref } from 'vue';
import type {
    ResponsiveImage,
    ResponsiveImagesList,
} from './../types/interfaces.d';

export const useResponsiveImage = (imgs: ResponsiveImagesList) => {
    const list = ref<ResponsiveImage[]>([]);

    if (imgs?.desktop) {
        list.value = Object.values(imgs.desktop)?.filter(el => typeof el === 'string').map((el) => {
            const mobImage = imgs.mob ? Object.values(imgs.mob)?.find((mobEl) => el === mobEl) : undefined;
            return {
                desktop: `${imgs.path}/desktop/${el}`,
                mobile: mobImage && `${imgs.path}/mob/${mobImage}`,
            };
        });
    }

    if (imgs?.images) {
        list.value = Object.values(imgs.images)?.filter(el => typeof el === 'string').map((el) => {
            return {
                desktop: `${imgs.path}/${el}`,
                mobile: `${imgs.path}/${el}`,
            };
        });
    }

    return list;
};
