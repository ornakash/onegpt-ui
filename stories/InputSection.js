import './InputSection.css';
import {allowEnter} from './javascripts/main-scripts.js'
import {forbidEnter} from './javascripts/main-scripts.js'

//arguments decide what the component will look like
export const createInputSection = ({
    onFocus = allowEnter,
    onFocusOut = forbidEnter,
}) => {
  const inputSection = document.createElement('div');
  inputSection.className = 'input-div';
  const input = document.createElement('input');
  input.className = 'user-inpt';
  input.addEventListener('focus', allowEnter);
  input.addEventListener('focusout', forbidEnter);

  inputSection.appendChild(input)




  return inputSection;
};