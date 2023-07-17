import './FixedBottomInterface.css';
import { createInputSection } from './InputSection';
import { createSendMessageInterface } from './SendMessageInterface';

export const createFixedBottomInterface = ({
  backgroundColor,
}) => {
  const fixedBottomInterface = document.createElement('div');
  fixedBottomInterface.className = 'fixed-bottom-interface';

  //append input section and send message interface to the fixed bottom interface
  fixedBottomInterface.appendChild(createInputSection({}));
  fixedBottomInterface.appendChild(createSendMessageInterface({}));

  // console.log(fixedBottomInterface.children);
  return fixedBottomInterface;
};