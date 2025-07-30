(function () {
    'use strict';

    const DEBUG = false; // Set to true for verbose logging

    const MIN_DESKTOP_WIDTH = 768;

    function log(...args) {
        if (DEBUG) {
            console.log(...args);
        }
    }

    function isMobile() {
        return window.innerWidth < MIN_DESKTOP_WIDTH || screen.width < MIN_DESKTOP_WIDTH;
    }

    function safelyQuery(selector) {
        return document.querySelector(selector);
    }

    function safelyQueryAll(selector) {
        return document.querySelectorAll(selector);
    }

    function createAuthLoginElement() {
        const authElem = document.createElement("auth-login-rwc");
        authElem.setAttribute("redirect", "true");
        return authElem;
    }

    function loginWidgetLoad() {
        if (isMobile()) return;

        setTimeout(() => {
            const authElem = createAuthLoginElement();
            const banner = safelyQuery('.ghp-login-banner');
            const fallbackHidden = safelyQuery('.fallback-text.is-hidden');
            const alreadyExists = safelyQuery('auth-login-rwc');

            log("Auth Elem created:", new Date().toUTCString());
            log("GHP Banner available:", banner, "::", new Date().toUTCString());

            if (banner && fallbackHidden && !alreadyExists) {
                const wrapper = safelyQuery('.login-widget-wrapper');
                if (wrapper) {
                    wrapper.appendChild(authElem);
                    authElem.style.display = "block";
                    log("Auth login appended to banner at:", new Date().toUTCString());
                }
            }
        }, 1000);
    }

    function fallbackToStaticText() {
        const fallbackText = safelyQuery('.fallback-text');
        if (fallbackText) {
            fallbackText.classList.remove('is-hidden');
            fallbackText.classList.add('is-fallBack');
        }
    }

    function removeAuthLoginWidgets() {
        const widgets = safelyQueryAll('auth-login-rwc[redirect="true"]');
        widgets.forEach(el => el.remove());
    }

    function handleGhpBannerFailure() {
        const loginWidget = safelyQuery('#ReactLoginWidgetApp');
        if (!loginWidget) {
            fallbackToStaticText();
            removeAuthLoginWidgets();
            throw new Error("Login widget failed to load in GHP banner: " + new Date().toUTCString());
        }
    }

    // Load widget on resize for non-mobile
    window.addEventListener("resize", () => {
        if (!isMobile()) {
            loginWidgetLoad();
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        if (!isMobile()) {
            loginWidgetLoad();

            // Check fallback after timeout
            setTimeout(() => {
                try {
                    const ghpBanner = safelyQuery('.ghpBanner');
                    if (ghpBanner) {
                        handleGhpBannerFailure();
                    }
                } catch (err) {
                    console.error("Error during GHP banner login load:", err);
                }
            }, 5000);
        }
    });
})();
