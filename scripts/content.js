import { platforms, findPlatform, extractId } from '../shared/config.js';

function createSynthicalButton(url) {
	const button = document.createElement('a');
	button.href = url;
	button.target = '_blank';
	button.style.cssText = `
        display: inline-flex;
        align-items: center;
        background-color: #f0f0f0;
        color: #333;
        padding: 5px 10px;
        border-radius: 4px;
        text-decoration: none;
        font-family: Arial, sans-serif;
        font-size: 14px;
        margin-left: 10px;
        border: 1px solid #ccc;
    `;

	const logo = document.createElement('img');
	logo.src = chrome.runtime.getURL('icon.png');
	logo.style.width = '16px';
	logo.style.marginRight = '5px';

	button.appendChild(logo);
	button.appendChild(document.createTextNode('Open in Synthical'));

	return button;
}

function addButtonToPage(synthicalUrl, platform) {
	const selectors = {
		'arxiv': '.full-text',
		'biorxiv': '.hw-citation-top .article-source',
		'medrxiv': '.hw-citation-top .article-source',
		'huggingface': '.relative.text-lg.font-bold.leading-6',
		'chemrxiv': '.c-article-header__buttons-container'
	};

	const selector = selectors[platform.id] || 'body';
	const targetElement = document.querySelector(selector);

	if (targetElement) {
		const button = createSynthicalButton(synthicalUrl);
		if (platform.id === 'chemrxiv') {
			targetElement.appendChild(button);
		} else {
			targetElement.parentNode.insertBefore(button, targetElement.nextSibling);
		}
	}
}

function main() {
	const currentUrl = window.location.href;
	const platform = findPlatform(currentUrl);

	if (platform) {
		const id = extractId(currentUrl, platform);

		if (id) {
			const synthicalUrl = platform.synthicalUrl(id);
			addButtonToPage(synthicalUrl, platform);
		}
	}
}

// Run the main function when the page is fully loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', main);
} else {
	main();
}