import type { RequestEvent } from '@sveltejs/kit';
import type { Todo } from 'src/types/global';

let todos: Todo[] = [];

export const api = (event: RequestEvent, todo?: Todo) => {
  let body = {};
  let status = 500;

  switch (event.request.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;

    case 'POST':
      if (todo) {
        todos.push(todo);
      }
      body = { todo };
      status = 201;
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
