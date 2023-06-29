import './sendbutton.css';
import { sendChat } from './javascripts/main-scripts.js';

//arguments decide what the component will look like
export const createSendButton = ({
  backgroundColor = 'yellow',
  label = 'SEND',
  onClick = sendChat,
} = {}) => {
  const sendBtn = document.createElement('input');

  sendBtn.type = 'button';
  sendBtn.value = label;
  sendBtn.className = 'button-send'
  sendBtn.style.backgroundColor = backgroundColor;

  sendBtn.addEventListener('click', onClick)
  


  return sendBtn;
};