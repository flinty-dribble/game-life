!function(){var t,e,n,r={710:function(t,e,n){"use strict";function r(t,e,n){var r="<table border=1>".concat(e.map((function(t,e){return"<tr>".concat(t.map((function(t,n){return 1===t?"<td \n        data-x=".concat(n,"\n        data-y=").concat(e,'\n        class="cell alive" \n        style="background-color:#FA58D0; height:10px; width:10px;"></td>'):"<td \n      data-x=".concat(n,"\n      data-y=").concat(e,'\n      class="cell dead" \n      style="background-color:#FFFFFF; height:10px; width:10px;"></td>')})).join(""),"</tr>")})).join(""),"</table>");t.innerHTML=r,t.querySelector("table").addEventListener("click",(function(t){var e=t.target,r=e.getAttribute("data-x"),o=e.getAttribute("data-y");r>=0&&o>=0&&n(Number(r),Number(o))}))}function o(t,e,n){var r=t[n];if(void 0===r)return 0;var o=r[e];return void 0===o?0:o}function a(t,e,n){var a,u=!1;n.innerHTML='<div class="field-wrapper"></div><button>Start</button><input></input>';var c=n.querySelector(".field-wrapper"),i=n.querySelector("button"),d=Array.from({length:e}).map((function(){return Array.from({length:t}).fill(0)})),l=function t(e,n){d[n][e]=0===d[n][e]?1:0,r(c,d,t)};function f(){u=!1,i.innerHTML="Start",clearInterval(a)}r(c,d,l),i.addEventListener("click",(function(){u?f():function(){u=!0,i.innerHTML="Stop";var t=+n.querySelector("input").value;a=setInterval((function(){d=function(t){return t.map((function(e,n){return e.map((function(e,r){var a,u=function(t,e,n){for(var r=0,a=t-1;a<=t+1;a+=1)r+=Number(o(n,a,e-1));for(var u=t-1;u<=t+1;u+=1)r+=Number(o(n,u,e+1));return(r+=Number(o(n,t-1,e)))+Number(o(n,t+1,e))}(r,n,t),c=o(t,r,n);return 3===(a=u)?1:a>3||a<2?0:2===a&&1===c?1:0}))}))}(d),r(c,d,l),function(t){for(var e=0;e<t.length;e+=1)for(var n=t[e],r=0;r<n.length;r+=1)if(n[r])return!0;return!1}(d)||(alert("Death on the block"),f())}),t)}()}))}n.r(e),n.d(e,{createGameOfLife:function(){return a}})}},o={};function a(t){var e=o[t];if(void 0!==e)return e.exports;var n=o[t]={exports:{}};return r[t](n,n.exports,a),n.exports}a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t=a(710).createGameOfLife,e=document.createElement("div"),n=document.createElement("div"),document.body.appendChild(e),document.body.appendChild(n),t(3,3,e),t(10,10,n)}();
//# sourceMappingURL=bundle.js.map