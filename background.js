var width = 847;
var height = 597;

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
    id: 'SudokuMain',
    bounds: {
      width: width,
      height: height
    },
    minWidth: width,
    minHeight: height,
    maxWidth: width,
    maxHeight: height
  });
});

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus
  chrome.contextMenus.create({
    id: 'disableAnalytics',
    title: 'Disable Google Analytics',
    contexts: ['all'],
    type: 'checkbox',
    checked: false
  });
});