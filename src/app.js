import { list, formatList, format, add, findByTitle } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateSearchParams } from './validate.js';

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case 'list':
      const todos = list(todoStore)
      display([
        ...formatList(todos), 
        `You have ${todos.length} todos.`
      ]);
      break;
    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)])
      break;
    case 'find-by-title':
      const validatedSerchTerm = validateSearchParams(params);
      const foundByTitle = findByTitle(todoStore, validatedSerchTerm);

      if(typeof foundByTitle === "string"){
        display([foundByTitle]);
      } else {
        display([`Todos containing "${params}": `, ...formatList(Object.values(foundByTitle))]);
      }

      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
