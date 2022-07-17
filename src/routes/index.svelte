<script>
  import TodolistItem from '../components/todolistitem.svelte';

  const TITLE = 'Todos';
</script>

<svelte:head>
  <title>{TITLE}</title>
</svelte:head>

<h1>{TITLE}</h1>

<form action="">
  <input
    type="text"
    name="todo_text"
    aria-label="Add a new todo"
    placeholder="+ type to add a todo"
  />
</form>

<TodolistItem />
