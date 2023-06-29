import './SendMessageInterface.css';
import { createSendButton } from './SendButton';
import {createDirection}  from './Direction.js';

//arguments decide what the component will look like
export const createSendMessageInterface = ({}) => {
  const SendMessageInterface = document.createElement('div');
  const direction = createDirection({});
  const sendButton = createSendButton({});

  SendMessageInterface.className = 'direction-interface';

  SendMessageInterface.append(direction);
  SendMessageInterface.append(sendButton);


  return SendMessageInterface;
};