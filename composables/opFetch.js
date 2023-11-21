  export const opFetch = (request, options) => {
    const config = useRuntimeConfig();
    const headers = new Headers();
    if (!(!!options.body && options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("Accept", "application/json");
    return useFetch(request, {
      baseURL: config.public.apiBase,
      headers,
      ...options,

    });
  };
  export const authFetch = (request, options) => {
    const config = useRuntimeConfig();
    const headers = new Headers();
    if (!(!!options.body && options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("Accept", "application/json");
    return useFetch(request, {
      baseURL: config.public.apiBase,
      headers,
      ...options,
      credentials: 'include',
    });
  };
  