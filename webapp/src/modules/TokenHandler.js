import Cookies from 'universal-cookie';

export function saveTokenData(user, token) {
    const cookies = new Cookies();

    cookies.set('user', user, { path: '/' });
    cookies.set('token', token, { path: '/' });
}

export function tempSaveTokenData(user, token) {
    const cookies = new Cookies();

    cookies.set('user', user, { path: '/' , maxAge: 3600000});
    cookies.set('token', token, { path: '/', maxAge: 3600000});
}


export function getTokenData() {
    const cookies = new Cookies();

    const user = cookies.get('user') ?? "";
    const token = cookies.get('token') ?? "";

    return {user, token}
}

