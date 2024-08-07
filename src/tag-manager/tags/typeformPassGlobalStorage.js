export function typeformPassGlobalStorage() {
    const typeformScriptUrl = '//embed.typeform.com/next/embed.js';

    function isSimpleValue(value) {
        return typeof value !== 'object' && value !== null && value !== undefined;
    }

    function initializeTypeforms() {
        const hiddenFields = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            
            if (key === 'ghost-history' || key.startsWith('ph_phc_')) {
                continue;
            }

            try {
                const parsedValue = JSON.parse(value);
                if (isSimpleValue(parsedValue)) {
                    hiddenFields[key] = parsedValue;
                }
            } catch (e) {
                if (isSimpleValue(value)) {
                    hiddenFields[key] = value;
                }
            }
        }

        const typeformContainers = document.querySelectorAll('[data-tf-live]');
        if (typeformContainers.length > 0 && Object.keys(hiddenFields).length > 0) {
            const hiddenFieldsString = Object.entries(hiddenFields)
                .map(([key, value]) => `${key}=${value}`)
                .join(',');
            
            typeformContainers.forEach(container => {
                container.setAttribute('data-tf-hidden', hiddenFieldsString);
            });
        }

        if (!document.querySelector(`script[src="${typeformScriptUrl}"]`)) {
            const script = document.createElement('script');
            script.src = typeformScriptUrl;
            document.body.appendChild(script);
        }
    }

    initializeTypeforms();
}