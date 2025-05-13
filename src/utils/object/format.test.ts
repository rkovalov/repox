import { formatPublicVars } from './format';

describe('formatPublicVars', () => {
  it('should format boolean strings to boolean values', () => {
    const input = { isActive: 'true', isVerified: 'false' };
    const expected = { isActive: true, isVerified: false };
    expect(formatPublicVars(input)).toEqual(expected);
  });

  it('should keep boolean values as is', () => {
    const input = { isActive: true, isVerified: false };
    const expected = { isActive: true, isVerified: false };
    expect(formatPublicVars(input)).toEqual(expected);
  });

  it('should keep non-boolean strings as is', () => {
    const input = { name: 'John', age: '30' };
    const expected = { name: 'John', age: '30' };
    expect(formatPublicVars(input)).toEqual(expected);
  });

  it('should handle mixed types correctly', () => {
    const input = { isActive: 'true', name: 'John', isVerified: false };
    const expected = { isActive: true, name: 'John', isVerified: false };
    expect(formatPublicVars(input)).toEqual(expected);
  });

  it('should handle empty input', () => {
    const input = {};
    const expected = {};
    expect(formatPublicVars(input)).toEqual(expected);
  });

  it('should handle invalid JSON strings gracefully', () => {
    const input = { data: '{invalidJson' };
    const expected = { data: '{invalidJson' };
    expect(formatPublicVars(input)).toEqual(expected);
  });
});
