import { type EnvVars, validate } from './validators';

describe('validate', () => {
  const validEnvVars: EnvVars = {
    REACT_APP_API_URL: '/api',
    VERSION: 'v1.1.1',
  };

  it('should return valid env vars', () => {
    const result = validate(validEnvVars);
    expect(result).toEqual(validEnvVars);
  });

  it('should throw error if env vars are invalid', () => {
    expect(() =>
      // @ts-ignore
      // Ignoring type check here because VERSION is expected to be a string, but we are testing invalid input
      validate({ ...validEnvVars, VERSION: undefined }),
    ).toThrowError();
  });
});
