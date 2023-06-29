import { createMessage } from "../Message";


let chatAllowed = true;

export function sendChat(){
    
  console.log('sending chat');  
  
  //get the user input
  const textInput = document.querySelector('.user-inpt');
  const textValue = textInput.value;

  console.log(textValue);
  
  //check for no value or chat not allowed
  if(!textValue || !chatAllowed){
    return;
  }
  
    chatAllowed = false;

    //create element to add to the screen
    const messagesBox = document.querySelector('.messages');
    const userMsg = createMessage({content: textValue, user: true});
    messagesBox.prepend(userMsg)
  
    textInput.value = '';
  
    setTimeout(receiveAiMessage, 1000);
  
  }

  /**
   * Function will call api wait for AI response and add it into the chat interface
   */
  function receiveAiMessage(){
    //messages box is the container for all the messages
    const messagesBox = document.querySelector('.messages');
  
    //make the new box chat instnace
    const aiResponse = createMessage({content: 'Your AI response', user: false});
  
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