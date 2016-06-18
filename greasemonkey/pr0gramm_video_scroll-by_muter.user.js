// ==UserScript==
// @name        pr0gramm video scroll-by muter
// @namespace   pr0gramm.com
// @description When scrolling down and the webm is out of the visible area(viewport) of the site it gets muted.
// @include     https://www.pr0gramm.com/*
// @include     http://www.pr0gramm.com/*
// @include     http://pr0gramm.com/*
// @include     https://pr0gramm.com/*
// @author      ZungeWegIchFurz
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    'use strict';

    // Muting functionality
    function checkMuting(webm) {
        var videoElement = document.getElementsByTagName("video")[0];
        if(typeof videoElement !== 'undefined' || videoElement !== null) {
            var viewportOffset = videoElement.getBoundingClientRect();
            // these are relative to the viewport, i.e. the window
            var relTop = viewportOffset.top;
            var height = viewportOffset.height;

            // mute if scrolled out of viewport
            if((height + relTop) < 0) {
                if(!videoElement.muted) {
                    videoElement.muted = true;
                }
            } else {
                if(videoElement.muted) {
                    videoElement.muted = false;
                }
            }
        }
    }
    window.addEventListener("scroll", checkMuting);
})();