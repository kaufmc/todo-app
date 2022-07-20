import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Todo } from 'src/types/global';
let todos: Todo[] = [];

export const GET: RequestHandler = () => {
  return {
    status: 200,
    body: todos,
  };
};

export const POST: RequestHandler<{}, FormData> = async (
  event: RequestEvent
) => {
  const text = await event.request.formData().then((data) => {
    return data.get('todo_text')?.toString();
  });

  if (text) {
    todos.push({
      created_at: new Date(),
      done: false,
      text: text,
    });
  } else {
    console.log("Error getting form data.")
  }

  return {
    status: 303, //redirect browser to location "/"
    headers: {
      location: '/',
    },
  };
};
