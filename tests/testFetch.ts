import type { FetchLike } from "../src/index.js"

let cookies: string = ""

const testFetch: FetchLike = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) => {
    const res = await fetch(input, {
        ...init, headers: {
            ...init?.headers,
            cookie: cookies
        }
    })
    const newCookies = res.headers.get('set-cookie') 
    if (newCookies) {
        cookies = newCookies.split(';')[0]
    }
    return res
}

export default testFetch