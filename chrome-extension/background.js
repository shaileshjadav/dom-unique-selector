
// Extension click event listener
chrome.action.onClicked.addListener((tab) => {
    console.log("tab", tab);
   // For inject external script
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['dist/index.js'],
    });
    
});