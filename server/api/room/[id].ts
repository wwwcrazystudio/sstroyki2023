import { ComplexSingleRoom } from './../../../types/interfaces.d';
import { decode } from 'msgpack-lite';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, 'id');

  try {
    const resp = await $fetch<ArrayBuffer>(`/room/${id}`, {
      method: 'GET',
      baseURL: config.public.apiBase,
      responseType: 'arrayBuffer',
    });

    return decode(Buffer.from(resp)) as ComplexSingleRoom;
  } catch (err) {
    return err;
  }
});
