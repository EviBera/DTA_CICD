import { list, formatList, format, add } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateCompleteParams } from './validate.js';


export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  const todos = list(todoStore)
  switch (command) {
    case 'list':
      display([
        ...formatList(todos), 
        `You have ${todos.length} todos.`
      ]);
      console.log(todos);
      
      break;
    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)])
      break;

    case 'complete':
    
      const validate = validateCompleteParams(params, todos.length)
      const selectedTodo =  todos.filter(todo => todo.id === validate)
      selectedTodo[0].done = true
      todoStore.set(todos)
      break;


    default:
      throw new AppError(`Unknown command: ${command}`)

  }
}
