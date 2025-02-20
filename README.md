# dom-unique-selector
This is a chrome extension built using React.js which help to find unique css selector for any webpage.

## Installation:
### Clone the Repository
```
git clone https://github.com/shaileshjadav/dom-unique-selector.git
cd your-extension
```
### Install Dependencies
```
npm install
```
### Build the Extension
```
npm run build
```
- This will create a dist/ folder inside `chrome-extension` folder which containing the necessary files for the Chrome extension.


## Installing the Extension in Chrome

1. Open Google Chrome.

2. Go to `chrome://extensions/` or go to manage extension page using extension menu.

3. Enable Developer Mode (top-right corner).

4. Click Load Unpacked.

5. Select the `chrome-extension` folder.

The extension will now be installed and visible in the extensions bar with name `dom-unique-selector`!


## How to use
- Click on the extension icon in the Chrome toolbar and select `dom-unique-selector`.
- Hover over elements on the webpage to automatically display their unique selector.
- Clicking on a selected element copies its unique selector to the clipboard, displays a confirmation message, and shows a `Continue` button.
- Clicking the `Continue` button allows you to repeat the process for another element.


## Uninstalling the Extension

1. Go to `chrome://extensions/`.
2. Find your extension.
3. Click Remove.
