import { ChatUI } from "../../main";

export let chatUI = undefined;

export function buttonsStart(){
  const div = document.createElement('div');
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.backgroundColor = 'red'

  div.addEventListener('click', () => {
    chatUI = bringUpChatPage()
  });

  return div
}


function bringUpChatPage(){
  const wrapper = document.body;
  return new ChatUI(wrapper);
}
