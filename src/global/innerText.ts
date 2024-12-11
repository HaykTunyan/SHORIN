// Parse the HTML string using DOMParser
// Add any additional logic for processing <a> tags if needed

export const processHtmlString = (htmlString: string): string => {
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const aTags = doc.querySelectorAll('a');

    aTags.forEach(aTag => {
        const href = aTag.getAttribute('href');
        if (!href) {
            aTag.setAttribute('href', '#');
        }
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
};
