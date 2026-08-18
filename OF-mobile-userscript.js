// ==UserScript==
// @name         Onlyfans - Download pics and vids via long-press on mobile
// @namespace    github.com/AnimatedEightball
// @version      1.0
// @description  Re-enable long press / context menu on images even if disabled by the site
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @downloadURL https://raw.githubusercontent.com/AnimatedEightball/OF-mobile-userscript/refs/heads/main/OF-mobile-userscript.js
// @updateURL   https://raw.githubusercontent.com/AnimatedEightball/OF-mobile-userscript/refs/heads/main/OF-mobile-userscript.js
// @homepageURL https://github.com/AnimatedEightball/OF-mobile-userscript/

// @author       AnimatedEightball
// ==/UserScript==

(function() {
    'use strict';

    // Remove inline event handlers from all images
    const restoreImage = (img) => {
        img.oncontextmenu = null;
        img.ontouchstart = null;
        img.ontouchend = null;
        img.style.pointerEvents = 'auto';
        img.style.webkitTouchCallout = 'default';
        img.style.userSelect = 'auto';
    };

    // Observe DOM changes to catch dynamically loaded images
    const observer = new MutationObserver(() => {
        document.querySelectorAll('img').forEach(restoreImage);
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Also run immediately for already loaded images
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img').forEach(restoreImage);
    });

    // Override global event listeners that block context menu
    const unblockContextMenu = (e) => {
        e.stopPropagation();
    };
    window.addEventListener('contextmenu', unblockContextMenu, true);
    window.addEventListener('touchstart', unblockContextMenu, true);
    window.addEventListener('touchend', unblockContextMenu, true);
})();
