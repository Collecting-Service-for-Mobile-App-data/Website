/**
 * This code was taken from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/frontend/js/tools.js
 */

export function setCookie(cookieName, cookieValue, exDays) {
    const date = new Date();
    date.setTime(date.getTime() + (exDays *24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
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
    return "";
}

export function deleteCokkie(cookieName) {
    setCookie(cookieName, "", -1);
}

