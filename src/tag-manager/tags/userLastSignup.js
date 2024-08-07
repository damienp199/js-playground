export function userLastSignup({
    emailSelector = 'input[type="email"]',
    signupIdSelector = 'input[name="signup_id"]',
    emailStorageKey = 'last_signup_email',
    signupIdStorageKey = 'last_signup_id',
    signupUrlStorageKey = 'last_signup_url',
    debounceDelay = 300,
    unknownValue = 'unknown'
}) {
    var utils = {
        debounce: function(func, delay) {
            var timeout;
            return function() {
                var context = this;
                var args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, delay);
            };
        },
        cleanUrl: function(url) {
            return url.split('?')[0];
        }
    };

    var storage = {
        set: function(key, value) {
            localStorage.setItem(key, value);
        },
        get: function(key) {
            return localStorage.getItem(key);
        }
    };

    function storeCurrentUrl() {
        var fullUrl = window.location.href;
        var cleanUrl = utils.cleanUrl(fullUrl);
        storage.set(signupUrlStorageKey, cleanUrl || unknownValue);
    }

    var handleEmailInput = utils.debounce(function(event) {
        var email = event.target.value;
        var form = event.target.form || (event.target.closest ? event.target.closest('form') : null);
        var signupIdInput = form ? form.querySelector(signupIdSelector) : null;
        storage.set(emailStorageKey, email);
        storage.set(signupIdStorageKey, (signupIdInput && signupIdInput.value) || unknownValue);
        storeCurrentUrl();
    }, debounceDelay);

    function setupListeners() {
        document.addEventListener('input', function(event) {
            if (event.target && event.target.matches && event.target.matches(emailSelector)) {
                handleEmailInput(event);
            }
        }, true);
    }

    setupListeners();
}