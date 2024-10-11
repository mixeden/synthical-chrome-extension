import { platforms, findPlatform, extractId } from '../shared/config.js';

function handleNavigation(details) {
    const url = details.url;

    chrome.storage.sync.get(platforms.map(p => p.id)).then(result => {
        const platform = findPlatform(url);

        if (platform && result[platform.id] !== false) {
            const id = extractId(url, platform);

            if (id) {
                const synthicalUrl = platform.synthicalUrl(id);
                chrome.tabs.update(details.tabId, { url: synthicalUrl });
            }
        }
    });
}

chrome.webNavigation.onBeforeNavigate.addListener(handleNavigation, {
    url: platforms.flatMap(p => p.hostnames.map(h => ({ hostEquals: h })))
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_SYNTHICAL_URL') {
        const { url } = message;
        const platform = findPlatform(url);
        if (platform) {
            const id = extractId(url, platform);
            if (id) {
                const synthicalUrl = platform.synthicalUrl(id);
                sendResponse({ synthicalUrl, pl: platform });
            }
        }
    }
});
