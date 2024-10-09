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