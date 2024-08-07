export function userLogin({ signupEmailKey = 'last_signup_email', loggedUserEmailKey = 'user_email' }) {
    function getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
    function setToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
    function updateLoggedUserEmail() {
        var signupEmail = getFromLocalStorage(signupEmailKey);
        if (signupEmail) {
            setToLocalStorage(loggedUserEmailKey, signupEmail);
        }
    }
    updateLoggedUserEmail();
}