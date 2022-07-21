import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export const GET: RequestHandler = (event: RequestEvent) => {
  return api(event);
};

export const POST: RequestHandler = async (event: RequestEvent) => {
  const text = await event.request.formData().then((data) => {
    return data.get('todo_text')?.toString() ?? '';
  });

  return api(event, {
    uid: `${Date.now()}`, // TODO replace by uid from database
    created_at: new Date(),
    done: false,
    text: text,
  });
};
