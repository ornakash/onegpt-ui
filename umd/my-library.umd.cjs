(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";const s="",L="",k="",p=({backgroundColor:t})=>{const e=document.createElement("div");return e.className="sidebar",e.backgroundColor=t,e},M="",b="",I="",a=({content:t,user:e=!0})=>{const n=document.createElement("div"),o=e?"from-user":"from-ai";n.className=`msg ${o}`;const c=document.createElement("p");return c.innerHTML=t,n.append(c),n};let r=!0;function g(){document.querySelector(".button-send").addEventListener("click",d),document.querySelector(".user-inpt").addEventListener("focus",i),document.querySelector(".user-inpt").addEventListener("focusout",l)}function d(){console.log("sending chat");const t=document.querySelector(".user-inpt"),e=t.value;if(console.log(e),!e||!r)return;r=!1;const n=document.querySelector(".messages"),o=a({content:e,user:!0});n.prepend(o),t.value="",setTimeout(f,1e3)}function f(){const t=document.querySelector(".messages"),e=a({content:"Your AI response",user:!1});t.prepend(e),r=!0}function u(t){t.key==="Enter"&&d()}function i(){window.addEventListener("keydown",u)}function l(){window.removeEventListener("keydown",u)}const E=({onFocus:t=i,onFocusOut:e=l})=>{const n=document.createElement("div");n.className="input-div";const o=document.createElement("input");return o.className="user-inpt",n.appendChild(o),n},N="",w="",v=({backgroundColor:t="yellow",label:e="SEND",onClick:n=d}={})=>{const o=document.createElement("input");return o.type="button",o.value=e,o.className="button-send",o.style.backgroundColor=t,console.log(o),o},x="",h=({label:t="Or press Enter &#9166;",color:e})=>{const n=document.createElement("span");return n.className="direction-span",n.innerHTML=t,n.style.color=e,n},S=({})=>{const t=document.createElement("div"),e=h({}),n=v({});return t.className="direction-interface",t.append(e),t.append(n),t},C=({backgroundColor:t})=>{const e=document.createElement("div");return e.className="fixed-bottom-interface",e.appendChild(E({})),e.appendChild(S({})),console.log(e.children),e},m=(({})=>{const t=document.createElement("div");let e=p({});const n=document.createElement("div");n.className="wrapper";let o=document.createElement("span");o.innerHTML="CLOSE",o.className="close-btn",n.append(o);let c=document.createElement("div");c.className="messages";let y=a({content:"Your AI assistant...",user:!1});c.append(y);let B=C({});return e.appendChild(n),e.append(c),e.append(B),t.append(e),t})({});console.log(m),document.querySelector("body").innerHTML=m.outerHTML,document.addEventListener("DOMContentLoaded",()=>{console.log("document loaded"),g()})});
