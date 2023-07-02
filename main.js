import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { createChatPage } from './stories/ChatPage'
import {attachEventListeners} from './stories/javascripts/main-scripts'

// document.querySelector('#app').createPage()

const chatPage = createChatPage({})
console.log(chatPage);

document.querySelector('body').innerHTML = chatPage.outerHTML;


document.addEventListener('DOMContentLoaded', () => {
  console.log('document loaded');
  attachEventListeners();
});

