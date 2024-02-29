import { jwtDecode } from "jwt-decode";
export function readToken (token) {
    const jwt = jwtDecode(token);
    return jwt;
}