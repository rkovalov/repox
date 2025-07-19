import ky, { HTTPError, type Input, type KyInstance, type Options, type ResponsePromise } from 'ky';
import { type BaseSchema, type InferOutput, parse } from 'valibot';
import { ENV_VARS } from '@/env';

type Operation<T> = (url: Input, options?: Options) => ResponsePromise<T>;

function replaceJson(fn: Operation<unknown>) {
  // Enhance response to support schema validation
  return (...args: Parameters<typeof fn>) => {
    const response = fn(...args);
    return {
      ...response,

      json: async <Schema extends BaseSchema<any, any, any>>(schema?: Schema): Promise<InferOutput<Schema> | null> => {
        const result = await response.json();
        return schema ? parse(schema, result) : result;
      },
    };
  };
}

function enhanceWithResponse(kyInstance: KyInstance) {
  const enhancedInstance = {
    ...kyInstance,
    delete: replaceJson(kyInstance.delete),
    get: replaceJson(kyInstance.get),
    head: replaceJson(kyInstance.head),
    patch: replaceJson(kyInstance.patch),
    post: replaceJson(kyInstance.post),
    put: replaceJson(kyInstance.put),
  };

  return {
    ...enhancedInstance,
    extend: (defaultOptions: Options | ((parentOptions: Options) => Options)) =>
      enhancedInstance.extend(defaultOptions) as typeof enhancedInstance,
  };
}

export const fetcher = enhanceWithResponse(
  ky.create({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ENV_VARS.REACT_APP_API_ACCESS_TOKEN}`,
    },
    hooks: {
      afterResponse: [
        async (_request, _options, response) => {
          if (!response.ok) {
            console.warn('[fetcher]: Request failed:', response.status, response.statusText);
          }
          return response;
        },
      ],
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
    },
    prefixUrl: ENV_VARS.REACT_APP_API_URL,
  }),
);

export { HTTPError };
