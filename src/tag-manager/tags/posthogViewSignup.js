export function posthogViewSignup({ signupIdField = 'signup_id' }) {
    function isVisible(elem) {
        if (!(elem instanceof Element)) return false;
        const style = getComputedStyle(elem);
        return style.display !== 'none' && style.visibility === 'visible' && style.opacity > 0.1 &&
               elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
               elem.getBoundingClientRect().width > 0;
    }

    function extractFormData(form) {
        const formData = {};
        form.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.name) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    if (field.checked) {
                        formData[field.name] = field.value;
                    }
                } else {
                    formData[field.name] = field.value;
                }
            }
        });
        return formData;
    }

    function handleFormVisibility(form, formData) {
        const signupId = formData[signupIdField] || 'unknown';
        const signupUrl = window.location.href || 'unknown';

        if (typeof posthog !== 'undefined') {
            posthog.capture('view_signup', {
                signup_id: signupId,
                signup_url: signupUrl
            });
            console.log('Posthog event fired:', { signup_id: signupId, signup_url: signupUrl });
        } else {
            console.error('Posthog is not available');
        }

        console.log('Form data:', formData);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && isVisible(entry.target) && !entry.target.dataset.triggered) {
                const formData = extractFormData(entry.target);
                handleFormVisibility(entry.target, formData);
                entry.target.dataset.triggered = 'true';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('form').forEach(form => observer.observe(form));
}