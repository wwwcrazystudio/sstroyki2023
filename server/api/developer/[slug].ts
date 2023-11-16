import { DeveloperData } from './../../../types/interfaces.d';
import { decode } from 'msgpack-lite';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const slug = getRouterParam(event, 'slug');

  try {
    const resp = await $fetch<ArrayBuffer>(`/url/${slug}?developer`, {
      method: 'GET',
      baseURL: config.public.apiBase,
      responseType: 'arrayBuffer',
    });

    return decode(Buffer.from(resp)) as DeveloperData;
  } catch (err) {
    return err;
  }
});
