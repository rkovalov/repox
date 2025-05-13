import { ENV_VARS } from './env';

describe('env', () => {
  beforeAll(() => {
    process.stdout.write('ENV_VARS');
  });
  it('should have keys', () => {
    expect(Object.hasOwn(ENV_VARS, 'REACT_APP_API_URL')).toBe(true);
  });
});
