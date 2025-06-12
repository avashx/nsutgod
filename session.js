function setSession(key, value, expirySeconds) {
    const now = new Date();
    const expiryTime = now.getTime() + expirySeconds * 1000;
    const item = {
        value: value,
        expiry: expiryTime
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getSession(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

function checkSession() {
    const loggedIn = getSession('loggedIn');
    if (!loggedIn) {
        window.location.href = 'login.html';
    }
}
