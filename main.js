import { createChatPage } from './stories/ChatPage'
import {attachEventListeners, allowEnter} from './stories/javascripts/main-scripts'
import { createButtonOptions, handleButtonInputsClick } from './stories/ButtonOptions'
import { createInputSection, handleSubmitHTTP, handleContactClick } from './stories/InputSection'
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

  /** FUNCTION WILL HOW BUTTONS UI
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
      console.log(event.detail);
      setBotText(event.detail);
    });
    stream.addEventListener("metadata", (event) => {
      console.log(event.detail)
    });
    stream.addEventListener("done", (event) => {
      console.log(event.detail);
      console.log("stream done");
      onStreamFinish();
    });
  }

}



function simpleTest(i, chatUI) {
  console.log(chatUI);
  if (i >= 2) return;

  //the callback function is this in the param
  if ( i == 0)
  // chatUI.setTextInput((text) => {
  //   const stream = gptEventStream([{speaker: "user", utterance: text}]);
  //   chatUI.addGptResponse(stream);
  //   stream.addEventListener("done", () => {
  //     simpleTest(i + 1, chatUI);
  //   });
  // });
  chatUI.setTextInput((text) => handleTextCallback(text, chatUI))
  else
  chatUI.setButtonsInput(["YES", "NO"], (text) => {
    const stream = gptEventStream([{speaker: "user", utterance: text}]);
    chatUI.addGptResponse(stream);
    stream.addEventListener("done", () => {
      simpleTest(i + 1, chatUI);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let myChat = new ChatUI(document.body);
  // window.gptEventStream = gptEventStream;
 
  simpleTest(0, myChat);
});


function handleTextCallback(text, chatUI){
  
    console.log('within handleTextCallback');
    console.log(chatUI)

    const stream = gptEventStream([{speaker: "user", utterance: text}]);
    chatUI.addGptResponse(stream);
    stream.addEventListener("done", () => {
      console.log('done');
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