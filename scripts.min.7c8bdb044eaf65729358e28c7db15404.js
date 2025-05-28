var loginWidgetLoadFailure = false;
var ghpBannerloginLoadFail = false;
window.addEventListener("resize", loginWidgetLoad);

function isMobile() {
    const minWidth = 768; // Minimum width for desktop devices
    return window.innerWidth < minWidth || screen.width < minWidth;
}
async function loginWidgetLoad() {
    if (!isMobile()) {  
        setTimeout(function () {     
            const authElem = document.createElement("auth-login-rwc");
            authElem.setAttribute('redirect', "true"); 
            console.log("Auth Elem created : " +new Date().toUTCString());  
            console.log("GHP Banner available : " +document.querySelector('.ghp-login-banner') +" :: "+new Date().toUTCString());
        if (document.querySelector('.ghp-login-banner') && document.querySelector('.fallback-text.is-hidden') && !(document.querySelector('auth-login-rwc'))) {
            document.querySelector('.login-widget-wrapper').appendChild(authElem);
            document.querySelector('auth-login-rwc').style.display = "block";
            console.log('Auth login available in Banner : : ' + new Date().toUTCString());
        }
    }, 1000); 
    }
    return;
}
document.addEventListener('DOMContentLoaded', function () {
    if (!isMobile()) {
        loginWidgetLoad().then(
    setTimeout(function () {
            if (document.querySelector('.ghpBanner')) {
                try {
                    var loginWidget = document.querySelector(' #ReactLoginWidgetApp');
                    if (!loginWidget) {
                        var fallbackText = document.querySelector('.fallback-text');
                        fallbackText.classList.remove('is-hidden');
                        fallbackText.classList.add('is-fallBack');
                        var authLoginRwc = document.querySelectorAll('auth-login-rwc[redirect="true"]');
                        if (authLoginRwc) {
                            authLoginRwc.forEach(e => e.remove());
                        }
                        ghpBannerloginLoadFail = true;
                        throw new Error('Sorry login widget fail to load in Ghp Banner' + new Date().toUTCString());
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }

        }, 5000)

        );
    }
});