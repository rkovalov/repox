export type Chained<
  Result,
  TransformedResult,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Fn extends (...args: any[]) => Promise<any>,
> = {
  useThen: <TResult>(
    fn: (value: Result) => TResult,
  ) => Chained<Result, TResult, Fn>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  useCatch: (fn: (error: any) => any) => Chained<Result, TransformedResult, Fn>;
  useFinally: (fn: () => void) => Chained<Result, TransformedResult, Fn>;
  useMock: (fn: Fn) => Chained<Result, TransformedResult, Fn>;
  (...args: Parameters<Fn>): Promise<TransformedResult>;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const createProvider = <Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn,
) => {
  type Result = Awaited<ReturnType<Fn>>;
  type TransformedResult = Result;

  let thenFn: (<T>(value: Result) => T) | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let catchFn: ((error: any) => any) | undefined;
  let finallyFn: (() => void) | undefined;
  let mockFn: Fn | undefined;

  const executor = async (...args: Parameters<Fn>): Promise<Result> => {
    const provider = mockFn ? mockFn : fn;
    return provider(...args);
  };

  const execute = (...args: Parameters<Fn>) =>
    executor(...args)
      .then((result) => (thenFn ? thenFn(result) : result))
      .catch((error) =>
        catchFn
          ? catchFn(error)
          : (() => {
              throw error;
            })(),
      )
      .finally(() => {
        mockFn = undefined;
        finallyFn?.();
      });

  const chainable = Object.assign(execute, {
    useMock: (fn: typeof mockFn) => {
      mockFn = fn;
      return chainable;
    },
    useThen: <TransformedResult>(fn: (value: Result) => TransformedResult) => {
      thenFn = fn as typeof thenFn;
      // double casting is needed here because of TypeScript's type system limitations when dealing with recursive types and self-referential objects.
      return chainable as unknown as Chained<Result, TransformedResult, Fn>;
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    useCatch: (fn: (error: any) => any) => {
      catchFn = fn;
      return chainable;
    },
    useFinally: (fn: () => void) => {
      finallyFn = fn;
      return chainable;
    },
  }) as Chained<Result, TransformedResult, Fn>;

  return chainable;
};
