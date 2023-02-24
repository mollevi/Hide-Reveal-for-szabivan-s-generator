// ==UserScript==
// @name         Hide/Reveal for szabivan's generator
// @namespace    http://tampermonkey.net/
// @version      v3.0
// @description  On loading the exorcises, the rows given for self-check are hidden by default, press on the button "Hide/reveal" to toggle them display attributes.
// @author       Molnár Levente

// @match        http://www.inf.u-szeged.hu/~szabivan/download/logika/skolem/*
// @match        https://www.inf.u-szeged.hu/~szabivan/download/logika/cnf/*
// @match        https://www.inf.u-szeged.hu/~szabivan/download/logika/hilbert/*

// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Tampermonkey is running.");

    var selectors = [document.querySelector("#latex"),
                    document.querySelector("#nyilak"),
                    document.querySelector("#nnf"),
                    document.querySelector("#cnf"),
                    document.querySelector("#latex2"),
                    document.querySelector("#rescnf"),
                    document.querySelector("#reslist"),
                    document.querySelector("#arrowfree"),
                    document.querySelector("#renamed"),
                    document.querySelector("#prenex"),
                    document.querySelector("#skolem"),
                    document.querySelector("#closed"),
                    document.querySelector("#proof"),
                    document.querySelector("#latex-2"),
                    document.querySelector("#answers")];
    selectors.forEach(hideTheseSelectors);
    function hideTheseSelectors(value, index, array){
        if(value!=null){
            value.style.display = "none";
            value.insertAdjacentHTML('afterend', "<button \
style='display: inline-block; background-color: #bbbbbb' \
onclick='this.previousSibling.style.display = this.previousSibling.style.display ==\"inline-block\" ? \"none\" : \"inline-block\" ;'>Hide/Reveal</button>");
        }
    }
})();