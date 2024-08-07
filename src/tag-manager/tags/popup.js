export function popup({ excludePages, method, timeOnSite, popupAfterDays }) {
    const popupElement = document.getElementById('popup');
    const closeButton = document.getElementById('close-popup');
    let hasShownThisSession = false;

    function init() {
        if (isExcludedPage() || !canShowPopup()) return;

        setupCloseButton();
        setTimeout(() => setupMethod(), timeOnSite * 1000);
    }

    function isExcludedPage() {
        const currentPath = window.location.pathname;
        return excludePages.some(page => 
            page.endsWith('*') 
                ? currentPath.startsWith(page.slice(0, -1))
                : currentPath === page
        );
    }

    function canShowPopup() {
        const lastShown = localStorage.getItem('popupLastShown');
        if (!lastShown) return true;
        const daysSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
        return daysSinceLastShown >= popupAfterDays;
    }

    function setLastShownDate() {
        localStorage.setItem('popupLastShown', Date.now().toString());
    }

    function showPopup() {
        if (hasShownThisSession) return;
        popupElement.style.display = 'flex';
        setLastShownDate();
        hasShownThisSession = true;
    }

    function setupCloseButton() {
        closeButton.addEventListener('click', () => {
            popupElement.style.display = 'none';
        });
    }

    function setupMethod() {
        switch (method) {
            case 'exit':
                setupExitIntent();
                break;
            case 'scroll':
                setupScrollTrigger();
                break;
            case 'time':
                setTimeout(() => showPopup(), timeOnSite * 1000);
                break;
            case 'disabled':
                // Do nothing
                break;
        }
    }

    function setupExitIntent() {
        document.addEventListener('mouseout', (e) => {
            if (e.clientY <= 0) showPopup();
        });
    }

    function setupScrollTrigger() {
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage >= 80) showPopup();
        });
    }

    init();
}