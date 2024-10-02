import { list, formatList, format, add, findByStatus } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams, validateStatusParams } from "./validate.js";

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;
    case "add":
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(["New Todo added:", format(added)]);
      break;
    case "status":
      const statusParams = validateStatusParams(params);
      const listedByStatus = findByStatus(todoStore, statusParams);
      if (listedByStatus.length === 0) {
        display([`No todos are ${statusParams}.`]);
      } else {
        display([
          `Todos that are ${statusParams}`,
          ...formatList(listedByStatus),
        ]);
      }
      break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
