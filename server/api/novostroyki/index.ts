import type { ComplexData } from './../../../types/interfaces.d';
import { decode } from 'msgpack-lite';

interface Response {
    houses: ComplexData[]
    price_date_update: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const resp = await $fetch<ArrayBuffer>(`/house`, {
      method: 'GET',
      baseURL: config.public.apiBase,
      responseType: 'arrayBuffer',
    });

    const data = decode(Buffer.from(resp)) as Response

    return {
      ...data,
      houses: Object.values(data.houses).filter(el => Boolean(el))
    };
  } catch (err) {
    return err;
  }
});
