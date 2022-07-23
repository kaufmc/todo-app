import type { RequestEvent } from '@sveltejs/kit';
import type { Todo } from 'src/types/global';

let todos: Todo[] = [];

export const api = (event: RequestEvent, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;

  switch (event.request.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;

    case 'POST':
      if (data) {
        todos.push(data as Todo);
      }
      body = { todo: data };
      status = 201;
      break;

    case 'PATCH':
      if (data) {
        console.log(data);
        todos = todos.map((todo) => {
          if (todo.uid === event.params.uid) {
            if (data.text) todo.text = data.text as string;
            else todo.done = data.done as boolean;
          }
          return todo;
        });
      }
      status = 200;
      break;

    case 'DELETE':
      todos = todos.filter((todo) => todo.uid !== event.params.uid);
      break;

    default:
      break;
  }

  if (event.request.method.toUpperCase() !== 'GET') {
    return {
      status: 303, //redirect browser to location "/"
      headers: {
        location: '/',
      },
    };
  }

  return {
    status,
    body,
  };
};
