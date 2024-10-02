import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if (typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validateCompleteParams(params, toDoLength) {


  const [id] = params
  const idNumber = Number(id)

  if (idNumber > toDoLength) {
    throw new AppError('Todo with the given ID is not exist.')
  }

  if (isNaN(idNumber)) {
    throw new AppError('Not a valid input please give number.')
  }

  if (typeof idNumber !== 'number') {
    throw new AppError('Give a number as the only parameter in parenthesis.')
  }

  return idNumber;
}

export function validateUpdateTitleParams(id, newTitle, todos) {
  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    throw new AppError('The ID must be a number.');
  }

  const todoExists = todos.some(todo => todo.id === idNumber);
  if (!todoExists) {
    throw new AppError(`Todo with ID ${idNumber} not found.`);
  }

  if (typeof newTitle !== 'string' || newTitle.length === 0) {
    throw new AppError('The new title must be a non-zero length string.');
  }

  return idNumber;
}
