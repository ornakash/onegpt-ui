import './header.css';
import { createButton } from './Button';
import { xCloseIcon } from './javascripts/svg-strings';
import { svgHandler } from './javascripts/utilities';

export const createHeader = ({ }) => {
  const header = document.createElement('div');
  header.className = 'header-grid';
  const introductionSpan = document.createElement('span');
  introductionSpan.className ='intro-chat-span'
  introductionSpan.innerHTML = 'Chat with OneAI';

  const closeWrapper = document.createElement('div');
  closeWrapper.className = 'close-wrapper-div';

  let closeBtn = document.createElement('span')
  closeBtn.innerHTML = 'CLOSE';
  closeBtn.className = 'close-btn';

  console.log(xCloseIcon);

  const closeIcon = svgHandler(xCloseIcon);
  
  closeWrapper.append(closeBtn, closeIcon)


  header.append(introductionSpan, closeWrapper)

  return header;
};
