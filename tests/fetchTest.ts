import type { Fetch } from "../src/index.js"

let cookieText: string = ""

export default (async (
    input: RequestInfo | URL,
    init?: RequestInit,
) => {
    const response = await fetch(input, { ...init, headers: { ...init?.headers, cookie: cookieText } })
    const cookie = response.headers.get("set-cookie")
    if (cookie) {
        cookieText = cookie.split(";")[0]
    }
    return response
}) satisfies Fetch