export function userGlobalStoreURLParams() {
    let errorMessage = '';
    function appendError(msg) {
        errorMessage += msg + '; ';
    }
    function getUrlParams() {
        try {
            const params = {};
            const search = window.location.search.substring(1);
            const pairs = search.split('&');
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i].split('=');
                if (pair[0]) {
                    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
            }
            return params;
        } catch (e) {
            appendError('Error parsing URL params: ' + e.message);
            return {};
        }
    }
    function setParamsToLocalStorage(params) {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                try {
                    localStorage.setItem(key, params[key]);
                } catch (e) {
                    appendError('Error setting localStorage for ' + key + ': ' + e.message);
                }
            }
        }
    }
    try {
        const urlParams = getUrlParams();
        setParamsToLocalStorage(urlParams);
    } catch (e) {
        appendError('General error: ' + e.message);
    }
    if (errorMessage) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.id = 'urlParamsScriptError';
        hiddenField.value = errorMessage;
        document.body.appendChild(hiddenField);
    }
}