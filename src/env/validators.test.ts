import { type EnvVars, validate } from './validators';

describe('validate', () => {
  const validEnvVars: EnvVars = {
    // biome-ignore lint/style/useNamingConvention: suppress capitalized key
    REACT_APP_API_ACCESS_TOKEN: '1234567890',
    // biome-ignore lint/style/useNamingConvention: suppress capitalized key
    REACT_APP_API_URL: '/api',
    // biome-ignore lint/style/useNamingConvention: suppress capitalized key
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
      // biome-ignore lint/style/useNamingConvention: suppress capitalized key
      validate({ ...validEnvVars, VERSION: undefined }),
    ).toThrowError();
  });
});
