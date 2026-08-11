type JsonValue = Record<string, unknown> | unknown[] | string | number | boolean | null;

export interface ApiRequestOptions {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
}

export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
}

const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 400;
export const LONG_REQUEST_LOADER_DELAY_MS = 45000;
export const LONG_API_REQUEST_OPTIONS: Required<ApiRequestOptions> = {
  // 20s per attempt x 3 attempts (+ backoff) gives users
  // enough time before we show an unrecoverable error.
  timeoutMs: 20000,
  retries: 2,
  retryDelayMs: 1500,
};

const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Request failed';
};

const isAbortError = (error: unknown): boolean => {
  return error instanceof DOMException && error.name === 'AbortError';
};

const isRetryableError = (error: unknown): boolean => {
  // Network failures in fetch commonly surface as TypeError in browsers.
  return isAbortError(error) || error instanceof TypeError;
};

const parseJsonSafely = async <T>(response: Response): Promise<T | null> => {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
};

export async function requestJsonWithRetry<T>(
  url: string,
  init?: RequestInit,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retries = options?.retries ?? DEFAULT_RETRIES;
  const retryDelayMs = options?.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      });
      window.clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await parseJsonSafely<{ error?: string }>(response);
        const error = errorBody?.error ?? `Request failed with status ${response.status}`;
        const shouldRetry = RETRYABLE_STATUS_CODES.has(response.status) && attempt < retries;

        if (shouldRetry) {
          await wait(retryDelayMs * (attempt + 1));
          continue;
        }

        return {
          ok: false,
          status: response.status,
          data: null,
          error,
        };
      }

      const data = await parseJsonSafely<T>(response);
      if (data === null) {
        return {
          ok: false,
          status: response.status,
          data: null,
          error: 'Invalid JSON response',
        };
      }

      return {
        ok: true,
        status: response.status,
        data,
        error: null,
      };
    } catch (error) {
      window.clearTimeout(timeoutId);
      const shouldRetry = isRetryableError(error) && attempt < retries;

      if (shouldRetry) {
        await wait(retryDelayMs * (attempt + 1));
        continue;
      }

      return {
        ok: false,
        status: 0,
        data: null,
        error: isAbortError(error) ? 'Request timed out' : toErrorMessage(error),
      };
    }
  }

  return {
    ok: false,
    status: 0,
    data: null,
    error: 'Request failed after retries',
  };
}

export async function postJsonWithRetry<T>(
  url: string,
  body: JsonValue,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
  return requestJsonWithRetry<T>(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
    options
  );
}
