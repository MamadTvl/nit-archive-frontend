export const setCookie = (
    name: string,
    value: string,
    expireDays: number,
    domain: string
) => {
    const d = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie =
        name +
        '=' +
        value +
        ';' +
        expires +
        `;path=/;domain=${domain};` +
        'SameSite=None; Secure';
};

export const getCookie = (cookieName: string, cookie: string) => {
    let name = cookieName + '=';
    let decodedCookie = decodeURIComponent(cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};
