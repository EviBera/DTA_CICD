import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError("Give a title as the only parameter in parenthesis.");
  }
  const [title] = params;
  if (typeof title !== "string" || title?.length === 0) {
    throw new AppError("The title must be a non zero length string.");
  }
  return params;
}

export function validateStatusParams(params) {
  const [status] = params;
  if (status !== "done" && status !== "not-done") {
    throw new AppError(
      'You can only search status by either "done" or "not-done".'
    );
  }

  return status;
}
