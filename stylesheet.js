/* To prevent 'Unsupported Browser' messages */

function dontShowBrowserNoticePage() {
    const browserNotice = document.getElementById('browser-support-notice');
    console.log({ browserNotice })
    if (browserNotice) {
        // When Spotify displays the browser notice, it's not just the notice,
        // but the entire page is focused on not allowing you to proceed.
        // So in this case, we hide the body element (so nothing shows)
        // until our JS deletes the service worker and reload (which will actually load the player)
        document.getElementsByTagName('body')[0].style.display = 'none';
    }
}

function reload() {
    window.location.href = window.location.href;
}

function nukeWorkers() {
    dontShowBrowserNoticePage();
    if ('serviceWorker' in navigator) {
        caches.keys().then(function (cacheNames) {
            cacheNames.forEach(function (cacheName) {
                console.debug('Deleting cache', cacheName);
                caches.delete(cacheName);
            });
        });
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((worker) =>
                worker.unregister().then((u) => {
                    console.debug('Unregistered worker', worker);
                    reload();
                }).catch((e) =>
                    console.error('Unable to unregister worker', error, { worker })
                )
            );
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    nukeWorkers()
});

if (document.readyState === "interactive") {
    nukeWorkers();
}

/* To mute everytime there's an ad */
/* Credit to Marc Belmont (https://gist.github.com/marcbelmont/1ea63270867a4e8786dd5f172d8d4489) */

!async function () {

    async function queryAsync(query) {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                const element = document.querySelector(query);
                if (element) {
                    clearInterval(interval);
                    return resolve(element);
                }
            }, 250);
        });
    }

    const nowPlayingBar = await queryAsync('.Root__now-playing-bar');
    const volumeButton = await queryAsync('button.volume-bar__icon-button');
    const adQuerySelector = '.Root__now-playing-bar *[aria-label~=Advertisement]';

    let playInterval;
    new MutationObserver(() => {
        if (document.querySelector(adQuerySelector) &&
            volumeButton.attributes['aria-label'].value.toLowerCase().indexOf('unmute') == -1) {
            volumeButton.click();
            if (!playInterval) {
                playInterval = setInterval(() => {
                    if (!document.querySelector(adQuerySelector)) {
                        clearInterval(playInterval);
                        playInterval = null;
                        volumeButton.click();
                    }
                }, 500);
            }
        }
    }).observe(nowPlayingBar, {
        characterData: true,
        childList: true,
        attributes: true,
        subtree: true
    });
}();
