export function format(todo) {
  return `${todo.id} - [${todo.done ? '✅' : ' '}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format)
}

function nextId(todos) {
  const ids = todos.map(todo => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get();
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get()
  const newTodo = {
    title,
    done: false,
    id: nextId(todos)
  }
  const toStore = [...todos, newTodo]
  store.set(toStore)
  return newTodo;
}

export function complete(store, params) {
  const [id] = params;
  const todos = store.get()
  const toStore = todos.map(todo => {
    if (todo.id === parseInt(id)) {
      return {
        ...todo,
        done: true
      }
    }
    return todo;
  })
  store.set(toStore)
}

export function updateTitle(store, id, newTitle) {
  const todos = store.get();
  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, title: newTitle };
    }
    return todo;
  });

  store.set(updatedTodos);
  return updatedTodos.find(todo => todo.id === id);
}
