import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export let DELETE: RequestHandler = (event: RequestEvent) => {
  return api(event);
};

export let PATCH: RequestHandler = async (event: RequestEvent) => {
  const formData = await event.request.formData();
  const todoText = formData.get('todo_text');
  const isDone = formData.get('is_done');

  return api(event, {
    text: todoText,
    done: isDone ? !!isDone : undefined,
  });
};
