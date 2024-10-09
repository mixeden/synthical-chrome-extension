import { platforms, findPlatform, extractId } from '../shared/config.js';

function createCheckbox(platform) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = platform.id;

    const span = document.createElement('span');
    span.textContent = platform.name;

    label.appendChild(checkbox);
    label.appendChild(span);

    return label;
}

document.addEventListener('DOMContentLoaded', function() {
    const checkboxGroup = document.getElementById('checkboxes');
    const redirectGroup = document.getElementById('redirect');

    platforms.forEach(platform => {
        checkboxGroup.appendChild(createCheckbox(platform));
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Load saved settings
    chrome.storage.sync.get(platforms.map(p => p.id), function(result) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = result[checkbox.id] !== false; // Default to true if not set
        });
    });

    // Save settings when changed
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            let setting = {};
            setting[this.id] = this.checked;
            chrome.storage.sync.set(setting);
        });
    });

    // Check if current page is a supported platform
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const url = tabs[0].url;
        const platform = findPlatform(url);

        if (platform) {
            const id = extractId(url, platform);

            if (id) {
                const synthicalUrl = platform.synthicalUrl(id);

                // Adding link and separator
                const link = document.createElement("div");
                link.innerHTML = `<div class="link">Go to Synthical</div>`;

                const separator = document.createElement("div");
                separator.innerHTML = `<div class="separator"></div>`;

                const text = document.createElement("div");
                text.innerHTML = `<div class="description">Would you like to open this page at Synthical?</div>`;

                link.addEventListener('click', () => {
                    chrome.tabs.update(tabs[0].id, { url: synthicalUrl });
                });

                // Adding link to redirectGroup
                redirectGroup.appendChild(separator);
                redirectGroup.appendChild(text);
                redirectGroup.appendChild(link);
            }
        }
    });
});