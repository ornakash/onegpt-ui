import { createInputSection } from "../InputSection";
import { createMessage } from "../Message";
import { addUrl, askGpt, setBotText } from "./api-call";
import { createDocumentChangeObserver } from "./mutation-observer";

let chatAllowed = true;

export function attachEventListeners(){
  document.querySelector('.send-input-btn').addEventListener('click', sendChat)
  document.querySelector('.user-inpt').addEventListener('focus', allowEnter);
  document.querySelector('.user-inpt').addEventListener('focusout', forbidEnter);
  createDocumentChangeObserver();
}

  export function sendChat(){
    
  console.log('sending chat');  
  
  //get the user input
  const textInput = document.querySelector('.user-inpt');
  const userQuery = textInput.value;

  console.log(userQuery);
  
  //check for no value or chat not allowed
  if(!userQuery || !chatAllowed){
    return;
  }
  
  chatAllowed = false;

  //send the users messages into the UI
  const messagesBox = document.querySelector('.messages-wrapper');
  const userMsg = createMessage({content: userQuery, user: true, first: false});
  messagesBox.prepend(userMsg)

  textInput.value = '';

  //and receive the AI message needed
  receiveAiMessage(userQuery);

}


  /** Function will call api wait for AI response and add it into the chat interface
   * 
   * @param {string} userMsg 
   */
  function receiveAiMessage(userMsg){
    //messages box is the container for all the messages
    const messagesBox = document.querySelector('.messages-wrapper');
  
    //if there is a file upload requested
    if(ifUserRequestsFileUpload(userMsg)){
      console.log('requested file upload')
      displayFileUploadSetting(chatAllowed);
      return
    }

    let chat = [{'utterance': userMsg, speaker: 'user'}];
    askGpt(chat, setBotText, addUrl);

    //make the new box chat instance
    const aiResponse = createMessage({content: '', user: false});
  
    //prepend as first element in the messages container
    messagesBox.prepend(aiResponse);

    console.log(messagesBox.scrollHeight)
  
    chatAllowed = true;
  }

  function ifUserRequestsFileUpload(input){
    return /(?=.*file)(?=.*upload)/.test(input)
  }

  function displayFileUploadSetting(chatAllowed){
      const aiResponse = createMessage({content: `Which content/data did you want to process? 
      add URL or upload a file`, user: false});
      document.querySelector('.messages-wrapper').prepend(aiResponse);
      document.querySelector('.cursor-gpt').remove();
      document.querySelector('.input-div').remove();

      const outerGrid = document.querySelector('.sidebar');
      outerGrid.append(createInputSection({useLabel: 'file', classNames: {
        inputSection: 'input-div', 
        sendBtn: 'send-input-btn'
      }}));

    }


  /**
 * 
 * @param {*} event -- listening to keydown "Enter" when user is focused within input box
 */
function checkForEnter(event){
  if(event.key === 'Enter'){
    sendChat();
  }
}


  /**
 * Function allows enter to be pressed when the user focuses on text input
 */
export function allowEnter(){
  window.addEventListener('keydown', checkForEnter)
}


/**
 * Function forbids enter when the user leaves focus of the input element
 */
export function forbidEnter(){
  window.removeEventListener('keydown', checkForEnter)
}


