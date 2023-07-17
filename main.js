import { createChatPage } from './stories/ChatPage'
import {attachEventListeners, allowEnter} from './stories/javascripts/main-scripts'
import { createButtonOptions, cleanUpButtonEventListeners } from './stories/ButtonOptions'
import { createInputSection } from './stories/InputSection'
import { createMessage } from './stories/Message'
import { buttonsStart } from './stories/javascripts/test'
import { gptEventStream } from './stories/javascripts/api-call'
import { setBotText, onStreamFinish } from './stories/javascripts/api-call'

export { gptEventStream } from "./stories/javascripts/api-call"

// document.querySelector('#app').createPage()

export class ChatUI {
  constructor(wrapper){
    this.page = createChatPage({})
    this.wrapper = wrapper
    this.stream = this.initializeStream();

    //last steps
    wrapper.innerHTML = this.page.outerHTML;
    attachEventListeners()
  }

  /** FUNCTION WILL SET BUTTONS UI
   * 
   * @param {str[]} buttonsPreference -- list of str indicating strings of buttons
   * @param {*} callback -- callback fn (By default it is handleButtonInputsClick) that handles when buttons are clicked
   */
  setButtonsInput(buttonsPreference, callback=undefined){
    this.wrapper.querySelector('.messages-wrapper').prepend(createButtonOptions(
      {
        preferences: buttonsPreference,
        ...(callback !== undefined && {callback: callback})
      } 
      ))
  }

  

  setTextInput(callback){
    document.querySelector('.input-div').remove();
    document.querySelector('.sidebar').append(createInputSection({useLabel: 'text', classNames: {
      inputSection: 'input-div', 
      sendBtn: 'send-input-btn'
    }}))
    setInputListeners(callback);
  }

  setFileInput(callback){
    this.wrapper.querySelector('.input-div').remove();
    this.wrapper.querySelector('.sidebar').append(createInputSection({useLabel: 'file', classNames: {
        inputSection: 'input-div', 
        sendBtn: 'send-input-btn'}
    }))
    setInputListeners(callback)
  }

  setContactInput(callback){
    this.wrapper.querySelector('.input-div').remove();
    this.wrapper.querySelector('.sidebar').append(createInputSection({useLabel: 'contact', classNames: {
        inputSection: 'input-div', 
        sendBtn: 'send-input-btn-no-display'}
    }))
    setInputListeners(callback)
  }

  showUIMessage(content, isUser, isFirstMsg){
    const messagesBox = document.querySelector('.messages-wrapper');
    const message = createMessage({content: content, user: isUser, first: isFirstMsg, buttons: false});
    messagesBox.prepend(message);
  }

  initializeStream(){
    const stream = new EventTarget();
    const createContentEvent = (text) => stream.dispatchEvent(new CustomEvent("content", { detail: text }));
    const createMetadataEvent = (metadata) => stream.dispatchEvent(new CustomEvent("metadata", { detail: metadata }));
    const createDoneEvent = () => stream.dispatchEvent(new CustomEvent("done", { detail: true }));
    return stream;
  }
  
  addGptResponse(stream) {
    // create the writing message for 
    this.showUIMessage('', false, false);

    stream.addEventListener("content", (event) => {
      setBotText(event.detail);
    });
    stream.addEventListener("metadata", (event) => {
    });
    stream.addEventListener("done", (event) => {
      onStreamFinish();
    });
  }

}



function simpleTest(i, chatUI) {
  if (i >= 2) return;

  if ( i == 0)
  chatUI.setTextInput((text) => handleTextCallback(i, text, chatUI))
  else
  chatUI.setButtonsInput(["YES", "NO"], (text) => handleButtonsCallback(text)); 
  
  
  
  // {
  //   // const stream = gptEventStream([{speaker: "user", utterance: text}]);
  //   // chatUI.addGptResponse(stream);
  //   // stream.addEventListener("done", () => {
  //   //   simpleTest(i + 1, chatUI);
  //   // });
  // });

}

document.addEventListener('DOMContentLoaded', () => {
  let myChat = new ChatUI(document.body);

  simpleTest(0, myChat);
});

function handleButtonsCallback(text){ 
  console.log(text);

  //btnClickedString takes on values 'yes' , 'no', 'maybe'
  console.log(text);

  document.querySelector('.messages-wrapper').prepend(createMessage({content: `Response: ${text}`, first: true, 
  user: false, buttons: false
  }))

  //clean up the event listeners from the buttons and put in normal file input
  cleanUpButtonEventListeners();
}

function handleTextCallback(i, text, chatUI){

    const stream = gptEventStream([{speaker: "user", utterance: text}]);
    chatUI.addGptResponse(stream);
    stream.addEventListener("done", () => {
      console.log('done');
      simpleTest(i + 1, chatUI)
    });
}


/**Call this when you set the inputs to make sure the right listeners are set for each type of input
   * 
   * @param {function} btnCallback -- handler function for the purple input button
   */
export function setInputListeners(btnCallback){
  if(document.querySelector('.send-input-btn')){ 
    //text or file input

    const text = document.querySelector('.user-inpt').value;
    // document.querySelector('.send-input-btn').addEventListener('click', () => btnCallback(text));
  }
  if(document.querySelector('.user-inpt')){ //if input has user-inpt, give it listeners on focus
    allowEnter(btnCallback);
 }
 if(document.querySelector('.input-book-demo')){
  document.querySelector('.input-book-demo').addEventListener('click', btnCallback)
 }
}