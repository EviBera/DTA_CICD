import { validateAddParams, validateStatusParams } from "./validate";

describe("validateAddParams", () => {
  it("should pass and return with the original params with single string", () => {
    const params = ["Todo"];
    const expected = ["Todo"];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it("should pass and return with the original params with single string separated with spaces", () => {
    const params = ["Todo Item"];
    const expected = ["Todo Item"];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it("should throw when multiple strings given", () => {
    const params = ["Todo Item", "Other string"];

    expect(() => validateAddParams(params)).toThrow(
      "Give a title as the only parameter in parenthesis."
    );
  });

  it("should throw when no params given.", () => {
    const params = [];

    expect(() => validateAddParams(params)).toThrow(
      "Give a title as the only parameter in parenthesis."
    );
  });

  it("should throw when the param is not a string", () => {
    const params = [5];

    expect(() => validateAddParams(params)).toThrow(
      "The title must be a non zero length string."
    );
  });

  it("should throw when the param is a zero length string", () => {
    const params = [""];

    expect(() => validateAddParams(params)).toThrow(
      "The title must be a non zero length string."
    );
  });
});

describe("validateStatusParams", () => {
  it('should pass and return "done" if the param is "done"', () => {
    const params = ["done"];
    const expected = "done";

    const current = validateStatusParams(params);

    expect(current).toStrictEqual(expected);
  });

  it('should pass and return "not-done" if the param is "not-done"', () => {
    const params = ["not-done"];
    const expected = "not-done";

    const current = validateStatusParams(params);

    expect(current).toStrictEqual(expected);
  });

  it("should throw when the param is anything else", () => {
    const params = [""];

    expect(() => validateStatusParams(params)).toThrow(
      'You can only search status by either "done" or "not-done".'
    );
  });
});
