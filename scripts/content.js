function createSynthicalButton(url) {
	const button = document.createElement('a');
	button.href = url;
	button.target = '_blank';

	button.style.cssText = `
        display: inline-flex;
        align-items: center;
        color: #333;
        padding: 8px 12px;
        border-radius: 8px;
        text-decoration: none;
        font-family: Arial, sans-serif;
        font-size: 14px;
        border: 1px solid #ccc;
        margin-top: 16px;
        margin-bottom: 16px;
       	border: 1px solid #d4d4d4;
        flex-direction: row;
        gap: 8px;
        animation: borderColorChange 4s infinite;
    `;

	const logo = document.createElement('img');
	logo.style.width = '16px';
	logo.src = "data:image/png;base64,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"

	button.appendChild(logo);
	button.appendChild(document.createTextNode('Open in Synthical'));

	return button;
}

// Define the CSS animation for border color and inject it after the document is ready
function injectStyles() {
	const style = document.createElement('style');
	style.innerHTML = `
	  @keyframes borderColorChange {
	    0% { border-color: #282828; }
	    50% { border-color: #d4d4d4; }
	    100% { border-color: #282828; }
	  }
	`;
	document.head.appendChild(style);  // Ensure style is added to the head
}

function addButtonToPage(synthicalUrl, platform) {
	const selectors = {
		'arxiv': '.metatable',
		'biorxiv': '.highwire-cite-metadata',
		'medrxiv': '.highwire-cite-metadata',
		'huggingface': '.pb-10.md\\:pt-3',
		'chemrxiv': '.c-article-header__buttons-container'
	};

	const selector = selectors[platform.id] || 'body';
	const targetElement = document.querySelector(selector);

	if (targetElement) {
		const button = createSynthicalButton(synthicalUrl);

		if (platform.id === 'chemrxiv' || platform.id === 'arxiv') {
			targetElement.appendChild(button);
		} else {
			targetElement.parentNode.insertBefore(button, targetElement.nextSibling);
		}
	}
}

function main() {
	const currentUrl = window.location.href;
	injectStyles();  // Inject styles after DOM is ready

	chrome.runtime.sendMessage(
		{ type: 'GET_SYNTHICAL_URL', url: currentUrl },
		(response) => {
			if (response && response.synthicalUrl) {
				addButtonToPage(response.synthicalUrl, response.pl);
			}
		}
	);
}

// Run the main function when the page is fully loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', main);
} else {
	injectStyles();
	main();
}