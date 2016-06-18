// ==UserScript==
// @name         pr0gramm video scroll-by muter
// @namespace    pr0gramm.com
// @version      0.1
// @description  When scrolling down and the webm is out of the visible area(viewport) of the site it gets muted.
// @author       ZungeWegIchFurz
// @match        pr0gramm.com/*
// @match        www.pr0gramm.com/*
// @match        https://pr0gramm.com/*
// @match        https://www.pr0gramm.com/*
// @grant        none
// ==/UserScript==-

(function() {
    'use strict';

    // select actual webm
    function getActualWebm() {
        return document.getElementsByClassName("item-image")[0];
    }

    // --- NEXT STREAM AREA
    function getNextStreamArea() {
        return document.getElementsByClassName("stream-next");
    }

    function setNextStreamArea() {
        var streamNext = getNextStreamArea();

        // add click listener to next stream area
        streamNext[0].addEventListener("click", function(){
            // set nextstreamarea
            setupAreasAndListeners();
        });
    }

    // --- PREVIOUS STREAM AREA
    function getPreviousStreamArea() {
        return document.getElementsByClassName("stream-prev");
    }

    function setPreviousStreamArea() {
        var streamPrev = getPreviousStreamArea();

        // add click listener to previous stream area
        streamPrev[0].addEventListener("click", function(){
            // set prev stream area
            setupAreasAndListeners();
        });
    }

    // --- EVENT LISTENER KEYDOWN
    function setKeyPressingListeners() {
        document.addEventListener("keydown", checkKeyPressed, false);

        function checkKeyPressed(e) {
            // keyCode left arrow: 37
            // keyCode left arrow: 39
            if (e.keyCode == "37" || e.keyCode == "39") {
                setupAreasAndListeners();
            }
        }
    }

    // --- SETUP AREAS AND LISTENERS
    function setupAreasAndListeners() {
        var webm = getActualWebm();

        setPreviousStreamArea();
        setNextStreamArea();
        setKeyPressingListeners();

        // check for muting
        checkMuting(webm);
    }

    // Muting functionality
    function checkMuting(webm) {
        if(typeof webm !== 'undefined' || webm !== null) {
            window.onscroll = function () {
                var viewportOffset = webm.getBoundingClientRect();
                // these are relative to the viewport, i.e. the window
                var relTop = viewportOffset.top;
                var height = viewportOffset.height;

                // mute if scrolled out of viewport
                if((height + relTop) < 0) {
                    if(!webm.muted) {
                        webm.muted = true;
                    }
                } else {
                    if(webm.muted) {
                        webm.muted = false;
                    }
                }
            };
        }
    }

    window.addEventListener('DOMSubtreeModified', function() {
        var itemWrapper = document.getElementsByClassName("item-image-wrapper")[0];
        if(typeof itemWrapper !== 'undefined') {
            var mutedBefore = false;

            // initalize next stream area
            setupAreasAndListeners();
        }
    }, false);
})();