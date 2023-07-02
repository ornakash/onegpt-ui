import { createMessage } from "../Message";
import { addUrl, askGpt, setBotText } from "./api-call";

let chatAllowed = true;

export function attachEventListeners(){
  document.querySelector('.button-send').addEventListener('click', sendChat);
  document.querySelector('.user-inpt').addEventListener('focus', allowEnter);
  document.querySelector('.user-inpt').addEventListener('focusout', forbidEnter);
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

    //create element to add to the screen
    const messagesBox = document.querySelector('.messages');
    const userMsg = createMessage({content: userQuery, user: true, first: false});
    messagesBox.prepend(userMsg)
  
    textInput.value = '';
  
    receiveAiMessage(userQuery);

  }

  /** Function will call api wait for AI response and add it into the chat interface
   * 
   * @param {string} userMsg 
   */
  function receiveAiMessage(userMsg){
    //messages box is the container for all the messages
    const messagesBox = document.querySelector('.messages');
  
    let chat = [{'utterance': userMsg, speaker: 'user'}];
    askGpt(chat, setBotText, addUrl);

    //make the new box chat instance
    const aiResponse = createMessage({content: '', user: false});
  
    //prepend as first element in the messages container
    messagesBox.prepend(aiResponse);
  
    chatAllowed = true;
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


