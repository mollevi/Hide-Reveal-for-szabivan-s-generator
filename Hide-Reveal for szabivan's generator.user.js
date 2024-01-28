// ==UserScript==
// @name         Hide/Reveal for szabivan's generator
// @namespace    http://tampermonkey.net/
// @version      v4.3
// @description  This extension hides the solutions on szabivan's generator pages
// @author       Molnár Levente
// @updateURL    https://github.com/mollevi/Hide-Reveal-for-szabivan-s-generator/raw/main/Hide-Reveal%20for%20szabivan's%20generator.user.js
// @downloadURL  https://github.com/mollevi/Hide-Reveal-for-szabivan-s-generator/raw/main/Hide-Reveal%20for%20szabivan's%20generator.user.js

// @include      /^http(?:s)?:\/\/www\.inf\.u-szeged\.hu\/~szabivan\/download\/logika\/skolem\/(?:index\.html)?$/
// @include      /^http(?:s)?:\/\/www\.inf\.u-szeged\.hu\/~szabivan\/download\/logika\/cnf\/(?:index\.html)?$/
// @include      /^http(?:s)?:\/\/www\.inf\.u-szeged\.hu\/~szabivan\/download\/logika\/hilbert\/(?:index\.html)?$/
// @include      /^http(?:s)?:\/\/www\.inf\.u-szeged\.hu\/~szabivan\/download\/logika\/groundtermgen\.html$/
// @include      /^http(?:s)?:\/\/www\.inf\.u-szeged\.hu\/~szabivan\/download\/logika\/groundgen\/(?:index\.html)?$/

// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Tampermonkey is running.");
    function coverOnlySolutionCharacters(){
        const answers = document.querySelector("#answers");
        answers.style.display = "none";
        const szintaktikusosAnswerList = document.querySelectorAll("#answers > table > tbody > tr > td");
        const szintaktikusosBtn = document.querySelector("#click-me-too-button");
        const alaptermesAnswerList = document.querySelectorAll("#answers > td");
        const alaptermesBtn = document.querySelector("#generateButton");
        if(szintaktikusosAnswerList[0] != null && szintaktikusosBtn != null ){
            szintaktikusosAnswerList.forEach(element => {
                let html = element.innerHTML;
                ['☐', '☑'].forEach(char => {
                    const regex = new RegExp(char, 'g');
                    html = html.replace(regex, `<span class="hide-character" style="display: none">${char}</span>`);
                });
                element.innerHTML = html + `<input disabled class="replacement" style="display:inline-block" type="checkbox">`;
            });
            answers.style.display = "inline-block";
        }else if(alaptermesAnswerList[0] != null && alaptermesBtn != null ){
            alaptermesAnswerList.forEach(element => {
                let html = element.innerHTML;
                ['☐', '☑'].forEach(char => {
                    const regex = new RegExp(char, 'g');
                    html = html.replace(regex, `<span class="hide-character" style="display: none">${char}</span>`);
                });
                element.innerHTML = html + `<input disabled class="replacement" style="display:inline-block" type="checkbox">`;
            });
            answers.style.display = "inline-block";
        }else{
            window.setTimeout(coverOnlySolutionCharacters, 500);
            console.log("not loaded yet");
        }
    }

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
                    document.querySelector("#ground"),
                    document.querySelector("#unified")
                    ];

    function hideTheseSelectors(value, index, array){
        if(value!=null){
            value.style.display = "none";
        }
    }

    function addBtnForEach(value, index, array){
        if(value!=null){
            value.insertAdjacentHTML('afterend', "<button \
style='display: inline-block; background-color: #bbbbbb' \
onclick='this.previousSibling.style.display = this.previousSibling.style.display ==\"inline-block\" ? \"none\" : \"inline-block\" ;'>Hide/Reveal</button>");
        }
    }

    document.querySelector("body").insertAdjacentHTML('beforeend', "<button id=all-btn \
clicked='false'\
style='display: block; background-color: #bbbbbb' \
onclick=\"[document.querySelector('#latex'),\
  document.querySelector('#nyilak'),\
  document.querySelector('#nnf'),\
  document.querySelector('#cnf'),\
  document.querySelector('#latex2'),\
  document.querySelector('#rescnf'),\
  document.querySelector('#reslist'),\
  document.querySelector('#arrowfree'),\
  document.querySelector('#renamed'),\
  document.querySelector('#prenex'),\
  document.querySelector('#skolem'),\
  document.querySelector('#closed'),\
  document.querySelector('#proof'),\
  document.querySelector('#latex-2'),\
  document.querySelector('#ground'),\
  document.querySelector('#unified')].forEach(function(value,index,array){\
   if(value!=null){\
    if(document.querySelector('#all-btn').getAttribute('clicked')=='true'){\
     value.style.display = 'none';\
    }else{\
     value.style.display = 'inline-block';\
   }}\
  });\
  document.querySelector('#all-btn').setAttribute('clicked', document.querySelector('#all-btn').getAttribute('clicked')=='true'? 'false' : 'true');\
  document.querySelectorAll('.hide-character').forEach(element => { element.style.display = document.querySelector('#all-btn').getAttribute('clicked')=='true'? 'inline-block' : 'none' });\
  document.querySelectorAll('.replacement').forEach(element => { element.style.display = document.querySelector('#all-btn').getAttribute('clicked')=='true'? 'none' : 'inline-block' });\"\
'>TOGGLE ALL</button>");

    selectors.forEach(hideTheseSelectors);
    selectors.forEach(addBtnForEach);
    document.querySelectorAll("#answers").forEach( value => {
        if(value!=null){
            value.insertAdjacentHTML('afterend', "<button \
style='display: inline-block; background-color: #bbbbbb' \
onclick=\"this.previousSibling.querySelectorAll('.hide-character, .replacement').forEach(element => { \
  element.style.display = (element.style.display == 'inline-block') ? 'none' : 'inline-block'; \
});\
\">Hide/Reveal</button>");
        }
    });
    [document.querySelector("#click-me-button-2"),
    document.querySelector("#click-me-button")].forEach( function(value, index, array){
        if(value != null){
            value.click();
            value.addEventListener('click', function() {
                document.querySelector("#all-btn").click();
                if(document.querySelector("#all-btn").getAttribute('clicked') == 'true'){
                    document.querySelector("#all-btn").click();
                }
            });
        }
    });
    [document.querySelector("#click-me-too-button"),
    document.querySelector("#generateButton")].forEach( function(value, index, array){
        if(value != null){
            value.click();
            coverOnlySolutionCharacters();
            value.addEventListener('click', function() {
                document.querySelector("#all-btn").click();
                if(document.querySelector("#all-btn").getAttribute('clicked') == 'true'){
                    document.querySelector("#all-btn").click();
                    coverOnlySolutionCharacters();
                }
            });
        }
    });

})();
