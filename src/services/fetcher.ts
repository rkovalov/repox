import { ENV_VARS } from '@/env';
import ky, {
  type Input,
  type KyInstance,
  type Options,
  type ResponsePromise,
  HTTPError,
} from 'ky';
import { type BaseSchema, type InferOutput, parse } from 'valibot';

type Operation<T> = (url: Input, options?: Options) => ResponsePromise<T>;

function replaceJson(fn: Operation<unknown>) {
  // Enhance response to support schema validation
  return (...args: Parameters<typeof fn>) => {
    const response = fn(...args);
    return {
      ...response,

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      json: async <Schema extends BaseSchema<any, any, any>>(
        schema?: Schema,
      ): Promise<InferOutput<Schema> | null> => {
        const result = await response.json();
        return schema ? parse(schema, result) : result;
      },
    };
  };
}

function enhanceWithResponse(kyInstance: KyInstance) {
  const enhancedInstance = {
    ...kyInstance,
    get: replaceJson(kyInstance.get),
    post: replaceJson(kyInstance.post),
    put: replaceJson(kyInstance.put),
    delete: replaceJson(kyInstance.delete),
    patch: replaceJson(kyInstance.patch),
    head: replaceJson(kyInstance.head),
  };

  return {
    ...enhancedInstance,
    extend: (defaultOptions: Options | ((parentOptions: Options) => Options)) =>
      enhancedInstance.extend(defaultOptions) as typeof enhancedInstance,
  };
}

export const fetcher = enhanceWithResponse(
  ky.create({
    prefixUrl: ENV_VARS.REACT_APP_API_URL,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ENV_VARS.REACT_APP_API_ACCESS_TOKEN}`,
    },
    hooks: {
      beforeError: [
        async (error) => {
          return error;
        },
      ],
      beforeRequest: [
        (request) => {
          return request;
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          if (!response.ok) {
            console.warn(
              '[fetcher]: Request failed:',
              response.status,
              response.statusText,
            );
          }
          return response;
        },
      ],
    },
  }),
);

export { HTTPError };
