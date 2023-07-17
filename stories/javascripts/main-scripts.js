import { createInputSection, handleSubmitHTTP } from "../InputSection";
import { createMessage } from "../Message";
import { addUrl, askGpt, setBotText } from "./api-call";
import { createDocumentChangeObserver } from "./mutation-observer";

let chatAllowed = true;

export function attachEventListeners(){
  // document.querySelector('.send-input-btn').addEventListener('click', sendChat)
  // document.querySelector('.user-inpt').addEventListener('focus', allowEnter);
  // document.querySelector('.user-inpt').addEventListener('focusout', forbidEnter);
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
  const userMsg = createMessage({content: userQuery, user: true, first: false, buttons: false});
  messagesBox.prepend(userMsg)

  
  // //and receive the AI message needed
  // receiveAiMessage(userQuery, chatAllowed);

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
      displayFileUploadSetting();
      return
    }

    let chat = [{'utterance': userMsg, speaker: 'user'}];
    askGpt(chat, setBotText, addUrl);

    //make the new box chat instance
    const aiResponse = createMessage({content: '', user: false, first: false, buttons: false});
  
    //prepend as first element in the messages container
    messagesBox.prepend(aiResponse);

    console.log(messagesBox.scrollHeight)
  
    chatAllowed = true;
  }

  function ifUserRequestsFileUpload(input){
    return /(?=.*file)(?=.*upload)/.test(input)
  }

  function displayFileUploadSetting(){
      const aiResponse = createMessage({content: `Which content/data did you want to process? 
      add URL or upload a file`, first: true, user: false, buttons: false});
      document.querySelector('.messages-wrapper').prepend(aiResponse);
      // document.querySelector('.cursor-gpt').remove();
      document.querySelector('.input-div').remove();

      const outerGrid = document.querySelector('.sidebar');
      outerGrid.append(createInputSection({useLabel: 'file', classNames: {
        inputSection: 'input-div', 
        sendBtn: 'send-input-btn'
      }}));

      chatAllowed = true;

    }


  /**
 * 
 * @param {*} event -- listening to keydown "Enter" when user is focused within input box
 */
function checkForEnter(event){
  const userInput = document.querySelector('.user-inpt');
  
  const value = userInput.value;

  const isEnter = (event.key === 'Enter' && document.activeElement === userInput) || 
    ( event.type === 'click' && event.target.classList.contains('send-input-btn')); 
    
  console.log(event.target)
  console.log(event.target.classList)
  console.log(isEnter);
  if(isEnter && userInput.id === 'text'){
    console.log('sendChat() being called in checkForEnter')
    // sendChat();
    userInput.value = '';
    userInput.disabled = true;
    return value;
  } else if(isEnter && userInput.id === 'file'){
    handleSubmitHTTP();
    return value
  }else{
    return undefined
  }
}


  /**
 * Function allows enter to be pressed when the user focuses on text input
 */
let eventListener = undefined;
export function allowEnter(callback) {
  eventListener = (e) => {
    //text returns if there is input or value
    const text = checkForEnter(e);

    if(text){
      document.querySelector('.messages-wrapper').prepend(createMessage({content: text, user: true, first: false, buttons:false}))
      window.removeEventListener('keydown', eventListener);
      window.removeEventListener('click', eventListener);
      callback(text);
    }
  };
  window.addEventListener('keydown', eventListener);
  window.addEventListener('click', eventListener);
}  



