export function posthogVisitSignupConfirmation({
    signupIdKey = 'last_signup_id',
    signupUrlKey = 'last_signup_url'
}) {
    if (typeof posthog !== 'undefined') {
        posthog.capture('visit_signup_confirmation', {
            signup_id: localStorage.getItem(signupIdKey) || 'unknown',
            signup_url: localStorage.getItem(signupUrlKey) || 'unknown'
        });
    }
}