import './InputSection.css';
import { createMessage } from './Message';
import {allowEnter} from './javascripts/main-scripts.js'
import {forbidEnter} from './javascripts/main-scripts.js'
import { trashCanSvg } from './javascripts/svg-strings';
import {svgHandler} from './javascripts/utilities'

//arguments decide what the component will look like
export const createInputSection = ({
    useLabel,
    classNames
}) => {
  const inputSection = document.createElement('div');
  inputSection.className = classNames.inputSection;


  const input = document.createElement('input');
  input.className = 'user-inpt';
  input.addEventListener('focus', allowEnter);
  input.addEventListener('focusout', forbidEnter);
  

  if(useLabel === 'disabled'){
    inputSection.append(document.createElement('div'), createPurpleSendButton(classNames));
    inputSection.id = 'disabled';
  }else if(useLabel === 'file'){
    inputSection.append(createFileInputSection(), createPurpleSendButton(classNames));
    inputSection.id = 'file';
  }
  else{ //useLabel === 'text'
    inputSection.id = 'text';
    inputSection.append(createTextInputSection(), createPurpleSendButton(classNames));
  }


  return inputSection;
};


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
export function handleSubmitFile(){
  const submittedFile = document.querySelector('.custom-file-input').files[0];

  const usersFileMsg = createMessage({content: `&#128448; ${submittedFile.name}`, user: true, first: false})
  document.querySelector('.messages-wrapper').prepend(usersFileMsg);

}


function createTextInputSection(inputSection){
  const input = document.createElement('input');
  input.className = 'user-inpt';
  input.addEventListener('focus', allowEnter);
  input.addEventListener('focusout', forbidEnter);
  return input
}

//shows the ui of just the fileName
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

  fileInputWrapGrid.append(fileNameSpan, customFileInputDiv, trashCanIcon);

}

//clears the input div with the file and buts a new input section 
function handleClearFile(){
  document.querySelector('.input-div').remove();
  document.querySelector('.sidebar').append(createInputSection({useLabel: 'file', classNames: {
    inputSection: 'input-div', 
    sendBtn: 'send-input-btn'
  }}))
}

function createPurpleSendButton(classNames){
  const sendBtn = document.createElement('div');
  sendBtn.className = classNames.sendBtn;

  const arrowRight = document.createElement('div');
  arrowRight.className = 'arrow-right'

  const smallerArrowRight = document.createElement('div');
  smallerArrowRight.className = 'smaller-arrow-right';
  
  arrowRight.append(smallerArrowRight);
  sendBtn.append(arrowRight)
  return sendBtn;
}