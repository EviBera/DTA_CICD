import { validateAddParams, validateSearchParams } from "./validate";

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return with the original params with single string separated with spaces', () => {
    const params = ['Todo Item'];
    const expected = ['Todo Item'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a string', () => {
    const params = [5];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

})


describe('validateSearchParams', () => {
  it('should throw when the param is shorter than 3 characters', () => {
    const params = ['@'];

    expect(() => validateSearchParams(params)
      .toThrow('Give at least 3 characters to search for.'));
  })

  it('should throw when the param is an empty string', () => {
    const params = [''];

    expect(() => validateSearchParams(params)
      .toThrow('Give at least 3 characters to search for.'));
  })

  it('should throw when params is an empty array', () => {
    const params = [];
  
    expect(() => validateSearchParams(params))
      .toThrow('Give a title to search for.');
  });

  it('should throw when all params are empty strings', () => {
    const params = ['', ''];
  
    expect(() => validateSearchParams(params))
      .toThrow('Give at least 3 characters to search for.');
  });

  it('should throw if param is missing', () => {
    const params = undefined;

    expect(() => validateSearchParams(params)
      .toThrow('Give a title to search for.'));
  })

  it('should pass and return with the original params converted to string if params is at least 3 characters long', () => {
    const params = ['test'];
    const expected = 'test';
    
    const current = validateSearchParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return a string when multiple words are provided', () => {
    const params = ['test', 'the', 'app'];
    const expected = 'test the app';
  
    const current = validateSearchParams(params);
  
    expect(current).toStrictEqual(expected);
  });
  
})