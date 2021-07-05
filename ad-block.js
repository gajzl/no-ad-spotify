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
