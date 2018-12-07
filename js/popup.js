'use strict';

let preload = document.getElementById('preload');
let sortUpvotes = document.getElementById('sortUpvotes');

chrome.tabs.executeScript(null, {file: 'lib/JQuery1.9.1.js'});

preload.onclick = event => {
    chrome.tabs.executeScript(null, {file: 'js/preload.js'});
    window.close();
};

sortUpvotes.onclick = event => {
    chrome.tabs.executeScript(null, {file:"js/upvotes.js"});
    window.close();
};