import Cookies from 'universal-cookie';
import { base64Decode, base64Encode } from '../utils';

let cookies = new Cookies();
const API_URL =
process.env.NEXT_PUBLIC_WORDPRESS_API_URL || process.env.WORDPRESS_API_URL;
const TOKEN_KEY = base64Encode(`${API_URL}-at`);

export function initializeServerCookie(cookie?: string) {
    cookies = new Cookies(cookie);
}

export function getAccessToken() {
    const token: string = cookies.get(TOKEN_KEY);

    if (!token) {
        return;
    }

    return base64Decode(token);
}

export function storeAccessToken(token?: string) {
    if (!token) {
        cookies.remove(TOKEN_KEY);

        return;
    }

    cookies.set(TOKEN_KEY, base64Encode(token));
}
