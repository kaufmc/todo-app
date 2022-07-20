import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Todo } from 'src/types/global';
let todos: Todo[] = [];

export const GET: RequestHandler = () => {
  return {
    status: 200,
    body: todos,
  };
};

export const POST: RequestHandler = async (event: RequestEvent) => {
  const promise = await event.request.formData();
  todos.push({
    created_at: new Date(),
    done: false,
    text: promise.get('todo_text'),
  });
  return {
    status: 303, //redirect browser to location "/"
    headers: {
      location: '/',
    },
  };
};
