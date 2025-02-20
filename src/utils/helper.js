import unique from 'unique-selector';

 //get uniqe handler
 const getSelector = (domElement) => {
    const options = {
        selectorTypes: ['ID', 'Class', 'Tag', 'NthChild', 'Attributes'],
        excludeRegex: RegExp('body'),
    };

    //addition check for selector
    const selector = unique(domElement, options);
    const isNotBodyTag = document.querySelector(selector).tagName !== 'BODY';
    const rootContainer = document
        .querySelector('#react-app'); //root

    const outSideOfRoot = !rootContainer.contains(domElement);
    if (isNotBodyTag && outSideOfRoot) {
        return selector;
    }    
    return false;
};
export { getSelector };