 
# API
------
### `createProvider` - creates chainable Promise wrappers with support for mocking, transformations, and error handling. Type safe.
------
```typescript
import { createProvider } from '@/utils/data-provider';
```

## Core Concepts

The provider creates a chainable API around asynchronous functions, allowing you to:
- Transform Promise results
- Mock implementations designed for `development` and `testing` purposes.
- Handle errors

## API Reference

### `createProvider<Fn>`

Creates a chainable wrapper around an async function.

```typescript
const provider = createProvider(asyncFunction);
```

#### Type Parameters
  - `Fn`: The type of the async function being wrapped
  - Must return a Promise
  - Can accept any number of parameters

### Chainable Methods

#### `useThen<TResult>`
Transforms the Promise result.

```typescript
provider.useThen((result) => transformedResult)
```

- Parameters:
  - `fn: (value: Result) => TResult`: Transform function
- Returns: Chained instance with updated result type

#### `useCatch`
Handles errors in the Promise chain.

```typescript
provider.useCatch((error) => handleError(error))
```

- Parameters:
  - `fn: (error: any) => any`: Error handler
- Returns: Chained instance

#### `useFinally`
Executes cleanup code after Promise resolution.

```typescript
provider.useFinally(() => cleanup())
```

- Parameters:
  - `fn: () => void`: Cleanup function
- Returns: Chained instance

#### `useMock`
Provides a mock implementation for testing.

```typescript
provider.useMock(mockImplementation)
```

- Parameters:
  - `fn: Fn`: Mock function matching original signature
- Returns: Chained instance

## Type Safety

The provider maintains type safety throughout the chain:
- Result transformations update the return type
- Parameter types are preserved from the original function
- Mock implementations must match the original signature

## Best Practices

1. **Chain Order**: While the order of chain operations doesn't affect execution, maintain consistent ordering for readability:
   ```typescript
   provider
     .useMock()
     .useThen()
     .useCatch()
     .useFinally()
   ```

3. **Mocking**: Keep mock implementations close to the provider.

    ```text
    --/data-provider
    ----/api
    ----/mock
    ----/normalize
    ----data-provider.ts
    ```


# Usage

```javascript
import { createProvider } from '@utils/data-provider';

// api.ts
export const fetchUser = async (id: string, { signal }) => {
  const response = await fetch(`/api/users/${id}`, { signal });
  return response.json();
};

// mock.ts
export const fetchUser = (id, { signal }) =>
  mockService.delay(() => ({ id, firstName: "Test", lastName: "User" }), { signal })

// data-provider.ts
export const fetchUser = createProvider(api.fetchUser)
  .useMock(mock.fetchUser)
  .useThen(user => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`
  }))
  .useCatch((e) => {
    if (e instanceof Error && e.name === 'AbortError') {
      logger.warn('Fetch corrections aborted');
    } else {
      logger.error('Fetch corrections was failed:', e);
    }
    return Promise.reject(e);
  })

const user = await fetchUser(id);
```