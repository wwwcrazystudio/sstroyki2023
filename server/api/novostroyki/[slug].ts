import type { ComplexData, DeveloperData } from './../../../types/interfaces.d';
import { decode } from 'msgpack-lite';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const slug = getRouterParam(event, 'slug');

  try {
    const resp = await $fetch<ArrayBuffer>(`/url/${slug}?house`, {
      method: 'GET',
      baseURL: config.public.apiBase,
      responseType: 'arrayBuffer',
    });

    const complex = decode(Buffer.from(resp)) as ComplexData

    const developer = await $fetch<DeveloperData>(`/api/developer/${complex.developer_url}`)

    return { complex, developer };
  } catch (err) {
    return err;
  }
});
