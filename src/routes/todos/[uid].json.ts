import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export let DELETE: RequestHandler = (event: RequestEvent) => {
  return api(event);
};

export let PATCH: RequestHandler = async (event: RequestEvent) => {
  const todoText = await event.request.formData().then((data) => {
    return data.get('todo_text')?.toString() ?? '';
  });

  return api(event, {
    text: todoText,
  });
};
