import type { FetchLike } from "../src/index.js"

let cookies: string = ""

const testFetch: FetchLike = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) {
    const res = await fetch(input, {
        ...init, headers: {
            ...init?.headers,
            cookies
        }
    })
    cookies = res.headers.get('Set-Cookie') ?? ""
    return res
}

export default testFetch