<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Todo } from 'src/types/global';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/todos.json');

    if (res.ok) {
      const todos = await res.json();
      return {
        props: { todos },
      };
    }

    const { message } = await res.json();
    return {
      error: new Error(message),
    };
  };
</script>

<script lang="ts">
  import TodolistItem from '../components/todolistitem.svelte';

  export let todos: Todo[];

  const TITLE = 'Todos';
</script>

<svelte:head>
  <title>{TITLE}</title>
</svelte:head>

<div class="todos">
  <h1>{TITLE}</h1>

  <form action="/todos.json" method="post" class="new">
    <input
      type="text"
      name="todo_text"
      aria-label="Add a new todo"
      placeholder="+ type to add a todo"
    />
  </form>

  {#each todos as todo}
    <TodolistItem {todo} />
  {/each}
</div>

<style>
  .todos :global(input) {
    border: solid 1px transparent;
  }

  .todos :global(input:focus-visible) {
    box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ff3e00 !important;
    outline: none;
  }

  .todos {
    width: 100%;
    max-width: 42rem;
    margin: 4rem auto 0 auto;
  }

  .new {
    margin: 0 0 0.5rem 0;
  }

  .new input {
    font-size: 28px;
    width: 100%;
    padding: 0.5em, 1em 0.3em 1em;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    text-align: center;
  }
</style>
