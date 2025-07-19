import { createProvider } from './data-provider';

describe('createProvider', () => {
  const mockApiResult = { data: 'test' };
  const mockResult = { data: 'mock' };
  const mockError = new Error('mock error');

  const apiFunction = vi.fn().mockResolvedValue(mockApiResult);
  const mockFunction = vi.fn().mockResolvedValue(mockResult);
  const errorFunction = vi.fn().mockRejectedValue(mockError);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should execute api function and return result', async () => {
    const provider = createProvider(apiFunction);
    const result = await provider();

    expect(apiFunction).toHaveBeenCalled();
    expect(result).toEqual(mockApiResult);
  });

  it('should execute mock function when provided', async () => {
    const provider = createProvider(apiFunction).useMock(mockFunction);
    const result = await provider();

    expect(mockFunction).toHaveBeenCalled();
    expect(apiFunction).not.toHaveBeenCalled();
    expect(result).toEqual(mockResult);
  });

  it('should handle then callback', async () => {
    const thenCallback = vi.fn();
    const provider = createProvider(apiFunction);

    await provider().then(thenCallback);

    expect(thenCallback).toHaveBeenCalledWith(mockApiResult);
  });

  it('should handle catch callback', async () => {
    const catchCallback = vi.fn();
    const provider = createProvider(errorFunction)
      .useThen(() => {
        throw new Error();
      })
      .useCatch(catchCallback);
    await provider();

    expect(catchCallback).toHaveBeenCalledWith(mockError);
  });

  it('should handle finally callback', async () => {
    const finallyCallback = vi.fn();
    const provider = createProvider(apiFunction);

    await provider().finally(finallyCallback);

    expect(finallyCallback).toHaveBeenCalled();
  });

  it('should chain callbacks', async () => {
    const thenCallback = vi.fn();
    const catchCallback = vi.fn();
    const finallyCallback = vi.fn();

    const provider = createProvider(apiFunction);

    await provider().then(thenCallback).catch(catchCallback).finally(finallyCallback);

    expect(thenCallback).toHaveBeenCalledWith(mockApiResult);
    expect(catchCallback).not.toHaveBeenCalled();
    expect(finallyCallback).toHaveBeenCalled();
  });

  it('should abort fetch and not call then callback', async () => {
    const thenCallback = vi.fn();
    const finallyCallback = vi.fn();
    const catchCallback = vi.fn();
    const controller = new AbortController();

    const fetchData = (signal: AbortController['signal']) =>
      new Promise<void>((resolve, reject) => {
        // Simulate a fetch operation with a timeout
        const timeoutId = setTimeout(() => {
          console.log('Data fetched');
          resolve();
        }, 5000); // Simulate a 5-second fetch operation

        // Listen for abort signal and reject the promise if the signal is triggered
        signal.addEventListener('abort', () => {
          clearTimeout(timeoutId); // Clear the timeout to stop the operation
          reject(new Error('AbortError'));
        });
      });

    // const controller = new AbortController();
    const provider = createProvider(fetchData);
    const promise = provider(controller.signal).then(thenCallback).catch(catchCallback).finally(finallyCallback);
    controller.abort();
    await promise;
    // await expect(promise).rejects.toThrow('AbortError');
    expect(catchCallback).toHaveBeenCalledWith(new Error('AbortError'));
    expect(thenCallback).not.toHaveBeenCalled();
    expect(finallyCallback).toHaveBeenCalled();
  });
});

describe('createProvider type tests', () => {
  it('should properly type basic promise function', () => {
    const mockFn = async (id: number) => ({ data: id });
    const provider = createProvider(mockFn);

    type Result = typeof provider extends (...args: [number]) => Promise<{ data: number }> ? true : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestCase = Expect<Equal<Result, true>>;
  });

  it('should properly type chained methods', () => {
    const mockFn = async (id: number) => ({ data: id });
    const provider = createProvider(mockFn);

    // Test useThen types
    const withThen = provider.useThen((result) => result.data);
    type ThenResult = typeof withThen extends (...args: [number]) => Promise<number> ? true : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestThen = Expect<Equal<ThenResult, true>>;

    // Test useCatch types
    const withCatch = provider.useCatch((_error: Error) => ({ data: 0 }));
    type CatchResult = typeof withCatch extends (...args: [number]) => Promise<{ data: number }> ? true : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestCatch = Expect<Equal<CatchResult, true>>;

    // Test useFinally types
    const withFinally = provider.useFinally(() => console.log('done'));
    type FinallyResult = typeof withFinally extends (...args: [number]) => Promise<{ data: number }> ? true : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestFinally = Expect<Equal<FinallyResult, true>>;

    // Test useMock types
    const withMock = provider.useMock(async (id: number) => ({ data: id * 2 }));
    type MockResult = typeof withMock extends (...args: [number]) => Promise<{ data: number }> ? true : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestMock = Expect<Equal<MockResult, true>>;
  });

  it('should properly type chain combinations', () => {
    const mockFn = async (id: number) => ({ data: id });
    const provider = createProvider(mockFn);

    const chainedProvider = provider
      .useThen((result) => result.data)
      .useCatch((_error: Error) => 0)
      .useFinally(() => console.log('done'));

    type ChainedResult = typeof chainedProvider extends (...args: [number]) => Promise<number> ? true : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestChained = Expect<Equal<ChainedResult, true>>;
  });

  it('should properly handle different argument types', () => {
    const mockFn = async (id: number, name: string) => ({ id, name });
    const provider = createProvider(mockFn);

    type ArgsResult = typeof provider extends (...args: [number, string]) => Promise<{ id: number; name: string }>
      ? true
      : false;
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    type TestArgs = Expect<Equal<ArgsResult, true>>;
  });
});
