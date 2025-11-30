/**
 * Represents the configuration for an HTTP request.
 * It uses a discriminated union based on the HTTP `method` to determine if a `body` is allowed.
 * * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
export type HttpRequest = {
    method: "GET" | "DELETE" | "HEAD"
    url: string
    headers?: Record<string, string>
    params?: Record<string, string>
    timeout?: number
} | {
    method: "POST" | "PATCH" | "PUT"
    url: string
    headers?: Record<string, string>
    params?: Record<string, string>
    timeout?: number
    body?: unknown
}

/**
 * Interface for an HTTP client abstracting the underlying networking logic (e.g., fetch, axios).
 */
export type HttpClient = {
    /**
     * Executes an asynchronous HTTP request and returns the parsed response body.
     * * This method should handle serialization of the request body and parsing of the response body.
     * It is expected to throw an error if the network request fails or if the server returns a non-success status code (e.g., 4xx, 5xx).
     * @template TResponse - The expected type of the response body.
     * @param request - The request configuration object containing method, URL, headers, etc.
     * @returns A Promise that resolves to the parsed response data of type `TResponse`.
     * @example
     * ```ts
     * const user = await client.fetch<User>({
     * method: 'GET',
     * url: '/users/123'
     * });
     * console.log(user.email);
     * ```
     */
    fetch: <TResponse>(request: HttpRequest) => Promise<TResponse>
}