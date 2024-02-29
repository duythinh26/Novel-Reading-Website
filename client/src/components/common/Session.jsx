const storeInSession = (key, value) => {
    sessionStorage.setItem(key, value);
}

const lookInSession = (key) => {
    return sessionStorage.getItem(key);
}

const removeFormSession = (key) => {
    return sessionStorage.removeItem(key);
}

const logoutUser = () => {
    sessionStorage.clear();
}

export { storeInSession, lookInSession, removeFormSession, logoutUser }