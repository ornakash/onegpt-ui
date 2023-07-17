import { createButtonOptions, handleButtonInputsClick } from './ButtonOptions';
import './InputSection.css';
import { createMessage } from './Message';
import {allowEnter} from './javascripts/main-scripts.js'
import { trashCanSvg } from './javascripts/svg-strings';
import {svgHandler} from './javascripts/utilities'

//arguments decide what the component will look like
export const createInputSection = ({
    useLabel,
    classNames,
}) => {
  const inputSection = document.createElement('div');
  inputSection.className = classNames.inputSection;


  const input = document.createElement('input');
  input.className = 'user-inpt';
  // input.addEventListener('focus', allowEnter);
  

  if(useLabel === 'disabled'){
    console.log('creating a disabled input')
    inputSection.append(document.createElement('div'), createPurpleSendButton(classNames));
    inputSection.id = 'disabled';
  }else if(useLabel === 'file'){
    inputSection.append(createFileInputSection(), createPurpleSendButton(classNames));
    inputSection.id = 'file';
  }else if(useLabel === 'contact'){
    inputSection.append(createBookDemoContactInputSection(), createPurpleSendButton(classNames));
    inputSection.id = 'contact';
  }
  else{ //useLabel === 'text'
    inputSection.id = 'text';
    console.log('creating a text input')
    inputSection.append(createTextInputSection(), createPurpleSendButton(classNames));
  }


  return inputSection;
};

function replaceInputSection(desiredInput, wrapper = document.body){
  wrapper.querySelector('input-div').remove();
  // wrapper.querySelector('.messages-div').append(createInputSection({useLabel: desiredInput, clas}))
}

function createBookDemoContactInputSection(){
  const bookDemoDiv = document.createElement('div');
  bookDemoDiv.className = 'input-book-demo';

  const spanBookDemo = document.createElement('span');
  spanBookDemo.innerHTML = 'BOOK DEMO';
  bookDemoDiv.append(spanBookDemo);

  return bookDemoDiv;
}

function createFileInputSection(){
  const fileInputWrapper = document.createElement('div');
  fileInputWrapper.className = 'file-input-wrap-grid';

  const httpSpan = document.createElement('span');
  httpSpan.className = 'file-input-http-span';
  httpSpan.innerHTML =  `http://`;

  const inputAndUploadFileGrid = document.createElement('div');
  inputAndUploadFileGrid.className = 'file-input-inner-grid';

  const httpInput = document.createElement('input');
  httpInput.className = 'user-inpt';
  httpInput.id = 'file';

  const uploadFileDiv = document.createElement('div');
  uploadFileDiv.className = 'custom-file-input-div'
  const uploadFileSpan = document.createElement('span');
  uploadFileSpan.innerHTML = "Or "

  const customFileInputDiv = document.createElement('div');
  customFileInputDiv.className = 'custom-file-input-div';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'customFileInpt';
  fileInput.className = 'custom-file-input'
  fileInput.addEventListener('change', handleFileInput);

  let fileInputLabel = document.createElement('label');
  fileInputLabel.htmlFor = 'customFileInpt';
  fileInputLabel.innerHTML = `<span style="color: #00FFFF">Upload File </span> <span> &#128448; </span>`;

  customFileInputDiv.append(fileInput, fileInputLabel);
  uploadFileDiv.append(uploadFileSpan,customFileInputDiv)

  inputAndUploadFileGrid.append(httpInput, uploadFileDiv)

  fileInputWrapper.append(httpSpan, inputAndUploadFileGrid);

  return fileInputWrapper;
}

function handleFileInput(event){
  const selectedFile = event.target.files[0]; // Get the selected file object

  // Perform actions with the selected file
  console.log('File submitted:', selectedFile);

  showFileNameToSubmit(selectedFile.name);
}

/**
 * This is handler for the purple button press when a file is inputted
 * (1) Show a user message that that the file has been uploaded
 * (2) Now we can use the submitted file for API call
 */
export function handleSubmitFile(callback){
  const submittedFile = document.querySelector('.custom-file-input').files[0];

  const usersFileMsg = createMessage({content: `&#128448; ${submittedFile.name}`, user: true, first: false, buttons: false})
  document.querySelector('.messages-wrapper').prepend(usersFileMsg);

  document.querySelector('.messages-wrapper').prepend(createMessage({content: 'Is this a good analysis? ->', 
  user: false, first: true, buttons: false}));

  // callback(submittedFile);

  showButtonsInput();
}

/**
 * This is handler for the purple button press when we are on the file input screen but 
 * (1) Show a user message that that the url has been uploaded
 * (2) Now we can use the submitted http url for API call
 */
export function handleSubmitHTTP(){
  console.log('handleSubmitHTTP called');
  const httpInput = document.querySelector('.user-inpt');
  const httpValue = httpInput.value;

  document.querySelector('.messages-wrapper').prepend(createMessage({content: httpValue, 
  user: true, first: false, buttons: false}));
  console.log(httpValue);

}

function createTextInputSection(inputSection){
  const input = document.createElement('input');
  input.className = 'user-inpt';
  input.id = 'text';
  // input.addEventListener('focus', allowEnter);
  // input.addEventListener('focusout', forbidEnter);
  return input
}

//shows the ui of just the fileName UI step
function showFileNameToSubmit(fileName){
  const fileInputWrapGrid = document.querySelector('.file-input-wrap-grid');

  //save the file input so we have the file still
  const customFileInputDiv = document.querySelector('.custom-file-input-div');
  customFileInputDiv.className = 'custom-file-input-div file-input-div-disabled'

  console.log(document.querySelector('.custom-file-input').files)
  while(fileInputWrapGrid.firstChild){
    fileInputWrapGrid.firstChild.remove();
  }
  
  const fileNameSpan = document.createElement('span');
  fileNameSpan.innerHTML = `File: ${fileName}`;

  //add trashcan and event listener to it
  const trashCanIcon = svgHandler(trashCanSvg)
  trashCanIcon.style.marginLeft = 'auto';
  trashCanIcon.addEventListener('click', handleClearFile);

  //remove the event listener from listening to the https
  document.querySelector('.send-input-btn').removeEventListener('click', handleSubmitHTTP);

  fileInputWrapGrid.append(fileNameSpan, customFileInputDiv, trashCanIcon);

}

/**
 * showButtonsInput created the three button options, send it in ui, and makes input UI disabled
 */
function showButtonsInput(){
    console.log('trying to append buttons');
    document.querySelector('.messages-wrapper').prepend(createButtonOptions({preferences: ['YES', 'NO', 'IMPROVE'], callback: handleButtonInputsClick}));
    document.querySelector('.input-div').remove();
    document.querySelector('.sidebar').append(createInputSection({useLabel: 'disabled', 
    classNames: { inputSection: 'input-div input-disabled', sendBtn: 'send-input-btn input-disabled-btn',
    callback: undefined}}));

}

//clears the input div with the file and buts a new input section 
function handleClearFile(){
  document.querySelector('.input-div').remove();
  document.querySelector('.sidebar').append(createInputSection({useLabel: 'file', classNames: {
    inputSection: 'input-div', 
    sendBtn: 'send-input-btn'
  }}))
  document.querySelector('.send-input-btn').removeEventListener('click', handleSubmitFile)
}

export function handleContactClick(){
    console.log('FN TO HANDLE BOOKING A DEMO');
}

function createPurpleSendButton(classNames){
  const sendBtn = document.createElement('div');
  sendBtn.className = classNames.sendBtn;
  // sendBtn.addEventListener('click', handleSubmitFile);

  const arrowRight = document.createElement('div');
  arrowRight.className = 'arrow-right'

  const smallerArrowRight = document.createElement('div');
  smallerArrowRight.className = 'smaller-arrow-right';
  
  arrowRight.append(smallerArrowRight);
  sendBtn.append(arrowRight)
  return sendBtn;
}