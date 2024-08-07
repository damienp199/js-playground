export function posthogIdentify({ localStorageKey = 'user_email' }) {
    const userEmail = localStorage.getItem(localStorageKey);
    if (userEmail && typeof posthog !== 'undefined') {
        posthog.identify(userEmail, { email: userEmail });
    }
}