import unique from '../lib/unique-selector';

 //get uniqe handler
 const getSelector = (domElement) => {
    const options = {
        selectorTypes: ['Class', 'Tag', 'NthChild', 'Attributes'],
        excludeRegex: RegExp('body'),
        group:true,
    };

    //addition check for selector
    const selector = unique(domElement, options);
    const isNotBodyTag = document.querySelector(selector)?.tagName !== 'BODY';
    const rootContainer = document
        .querySelector('#react-app'); //root

    const outSideOfRoot = !rootContainer.contains(domElement);
    if (isNotBodyTag && outSideOfRoot) {
        return selector;
    }    
    return false;
};
export { getSelector };