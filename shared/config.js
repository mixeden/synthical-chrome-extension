export const platforms = [
    {
        id: 'arxiv',
        name: 'arXiv',
        hostnames: ['arxiv.org', 'browse.arxiv.org'],
        urlPatterns: [
            { pattern: /\/(pdf|abs|html)\/(.+)/, idIndex: 2 },
            { pattern: /\/pdf\/(.+)\.pdf/, idIndex: 1 }
        ],
        synthicalUrl: (id) => `https://synthical.com/abs/${id}`
    },
    {
        id: 'biorxiv',
        name: 'bioRxiv',
        hostnames: ['www.biorxiv.org', 'biorxiv.org'],
        urlPatterns: [{ pattern: /\/content\/(.+)/, idIndex: 1 }],
        synthicalUrl: (id) => `https://synthical.com/biorxiv/${id}`
    },
    {
        id: 'medrxiv',
        name: 'medRxiv',
        hostnames: ['www.medrxiv.org', 'medrxiv.org'],
        urlPatterns: [{ pattern: /\/content\/(.+)/, idIndex: 1 }],
        synthicalUrl: (id) => `https://synthical.com/medrxiv/${id}`
    },
    {
        id: 'huggingface',
        name: 'HuggingFace Papers',
        hostnames: ['huggingface.co'],
        urlPatterns: [{ pattern: /\/papers\/(.+)/, idIndex: 1 }],
        synthicalUrl: (id) => `https://synthical.com/abs/${id}`
    },
    {
        id: 'chemrxiv',
        name: 'ChemRxiv',
        hostnames: ['chemrxiv.org'],
        urlPatterns: [{ pattern: /\/(\d+\.\d+)/, idIndex: 1 }],
        synthicalUrl: (id) => `https://synthical.com/chemrxiv/${id}`
    }
];

export function findPlatform(url) {
    const hostname = new URL(url).hostname;
    return platforms.find(p => p.hostnames.includes(hostname));
}

export function extractId(url, platform) {
    const pathname = new URL(url).pathname;
    for (const { pattern, idIndex } of platform.urlPatterns) {
        const match = pathname.match(pattern);
        if (match) {
            return match[idIndex];
        }
    }
    return null;
}