import { getCookie } from 'typescript-cookie'
import {Me} from "./Login";

export async function fetchAuthenticated(input: RequestInfo | URL, init: RequestInit = {}) {
    const me: Me = JSON.parse(getCookie("me")!) as Me;

    const requestHeaders = (init.headers ?? new Headers()) as Headers;
    requestHeaders.set('Authorization', `Basic ${me.auth_token}`)

    requestHeaders.set('Content-Type', 'application/json');
    init.headers = requestHeaders

    const res = await fetch(input, init)
    if (res.status === 200) {
        return res
    }
    else if (res.status === 401) {
        window.location.replace("/logout")
        return res
    }
    else
        throw Error(`${res.status} - Could not retrieve request ${init.method} ${input}. RequestInit: ${JSON.stringify(init)}`)
}

export async function get(url: RequestInfo | URL, init: RequestInit = {}, asJson = true) {
    init.method = "GET"
    init.body = undefined
    const response = await fetchAuthenticated(url, init)
    if (asJson)
        return await response.json()
    return response
}

export async function post(url: RequestInfo | URL, body: any={}, init: RequestInit = {}, asJson = true) {
    init.method = "POST"
    init.body = JSON.stringify(body)
    const response = await fetchAuthenticated(url, init)
    if (asJson)
        return await response.json()
    return response
}

export async function put(url: RequestInfo | URL, body: any={}, init: RequestInit = {}, asJson = true) {
    init.method = "PUT"
    init.body = JSON.stringify(body)
    const response = await fetchAuthenticated(url, init)
    if (asJson)
        return await response.json()
    return response
}