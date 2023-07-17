import './SendMessageInterface.css';

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