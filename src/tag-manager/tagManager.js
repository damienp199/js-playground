import * as tags from './tagImporter.js';

// Initialize Tag Manager

export function initializeTagManager() {

  // Pageview
  (function() {
    // Tracking codes
    tags.trackingPosthog({
      id: 'phc_jmSV7rDFqFkinYVIn3MxM0rOrmwOHYkqbKbphPcRE1B',
      api_host: 'https://e.organisologie.com/',
      ui_host: 'https://eu.i.posthog.com',
      person_profiles: 'identified_only'
    });

    /*
    tags.trackingGA4({
      measurementId: 'G-KLE40YER40'
    });

    tags.trackingActivecampaign({
      account: '475762827',
      trackByDefault: true
    });

    tags.trackingFacebook({
      pixelId: '823300964730932',
      agent: 'tmgoogletagmanager'
    });

    tags.trackingProvensource({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1YmRmYWY1Zjc0OWRlMzI2NTQ1MGZkNmUiLCJpYXQiOjE2MDYwODk3MTR9.PNN-cnpTH5Jo_Zf4eMDKY9b7j5TD-QrA3njlKozXUtM"
    });
    */

    // User
    tags.userGlobalStoreURLParams();

    if (window.location.pathname.includes('/merci')) {
      tags.userLogin({
        signupEmailKey: 'last_signup_email',
        loggedUserEmailKey: 'user_email'
      });
    }

    // Posthog
    tags.posthogIdentify({
      localStorageKey: 'user_email'
    });

    if (window.location.pathname.includes('/merci')) {
      tags.posthogVisitSignupConfirmation({
        signupIdKey: 'last_signup_id',
        signupUrlKey: 'last_signup_url'
      });
    }


    
  })();

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    // User
    tags.userLastSignup({
      emailSelector: 'input[type="email"]',
      signupIdSelector: 'input[name="signup_id"]',
      emailStorageKey: 'last_signup_email',
      signupIdStorageKey: 'last_signup_id',
      signupUrlStorageKey: 'last_signup_url',
      debounceDelay: 300,
      unknownValue: 'unknown'
  });

    // Posthog
    tags.posthogViewSignup({
      signupIdField: 'signup_id'
    });

    // Misc
    tags.popup({ 
      excludePages: [/*'/',*/ '/tags/', '/tag/*', '/articles/', '/a-propos/', '/academie/'],
      method: 'exit', // Possible values: 'exit', 'scroll', 'time', 'disabled'
      timeOnSite: 1, // Value in seconds
      popupAfterDays: 0 // Number of days to wait before showing the popup again
    });

    tags.typeformPassGlobalStorage();
    
  });

  // Window loaded
  window.addEventListener('load', function() {

  });
}