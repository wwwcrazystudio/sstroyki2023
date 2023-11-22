import { ref } from 'vue';
import type {
    ResponsiveImage,
    ResponsiveImagesList,
} from './../types/interfaces.d';

export const useResponsiveImage = (imgs: ResponsiveImagesList) => {
    const list = ref<ResponsiveImage[]>([]);

    if (imgs.desktop) {
        list.value = imgs.desktop?.map((el) => {
            const mobImage = imgs.mob?.find((mobEl) => el === mobEl);
            return {
                desktop: `${imgs.path}/desktop/${el}`,
                mobile: mobImage && `${imgs.path}/mob/${mobImage}`,
            };
        });
    }

    if (imgs.images) {
        list.value = imgs.images?.map((el) => {
            return {
                desktop: `${imgs.path}/${el}`,
                mobile: `${imgs.path}/${el}`,
            };
        });
    }

    return list;
};
