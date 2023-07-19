import { createChatPage } from './stories/ChatPage'
import { attachEventListeners, allowEnter } from './stories/javascripts/main-scripts'
import { createButtonOptions, handleButtonInputsClick } from './stories/ButtonOptions'
import { createInputSection, handleSubmitHTTP, handleContactClick } from './stories/InputSection'
import { createMessage } from './stories/Message'
import { buttonsStart } from './stories/javascripts/test'
import { gptEventStream, fakeGptEventStream } from './stories/javascripts/api-call'
import { setBotText, onStreamFinish } from './stories/javascripts/api-call'

export { gptEventStream, fakeGptEventStream } from "./stories/javascripts/api-call"

// document.querySelector('#app').createPage()

export class ChatUI {
  constructor(wrapper) {
    this.page = createChatPage({})
    this.wrapper = wrapper
    this.history = []

    //last steps
    wrapper.innerHTML = this.page.outerHTML;
    attachEventListeners()
  }

  /** FUNCTION WILL SET BUTTONS UI
   * 
   * @param {str[]} buttonsPreference -- list of str indicating strings of buttons
   * @param {*} callback -- callback fn (By default it is handleButtonInputsClick) that handles when buttons are clicked
   */
  setButtonsInput(buttonsPreference, callback = undefined) {
    this.wrapper.querySelector('.messages-wrapper').prepend(createButtonOptions(
      {
        preferences: buttonsPreference,
        ...(callback !== undefined && { callback: callback })
      }
    ))
  }

  setTextInput(callback) {
    document.querySelector('.input-div').remove();
    document.querySelector('.sidebar').append(createInputSection({
      useLabel: 'text', classNames: {
        inputSection: 'input-div',
        sendBtn: 'send-input-btn'
      }
    }));
    document.querySelector('.user-inpt').focus();
    setInputListeners((text) => {
      this.history.push({
        speaker: "user",
        utterance: text,
      });
      callback(text);
    });
  }

  setDisabledInput() {
    this.wrapper.querySelector('.input-div').remove();
    this.wrapper.querySelector('.sidebar').append(createInputSection({
      useLabel: 'disabled', classNames: {
        inputSection: 'input-div input-disabled',
        sendBtn: 'send-input-btn input-disabled-btn'
      },
    }))
    setInputListeners(callback)
  }

  setFileInput(callback) {
    this.wrapper.querySelector('.input-div').remove();
    this.wrapper.querySelector('.sidebar').append(createInputSection({
      useLabel: 'file', classNames: {
        inputSection: 'input-div',
        sendBtn: 'send-input-btn'
      }
    }))
    setInputListeners(callback)
  }

  setContactInput(callback) {
    this.wrapper.querySelector('.input-div').remove();
    this.wrapper.querySelector('.sidebar').append(createInputSection({
      useLabel: 'contact', classNames: {
        inputSection: 'input-div',
        sendBtn: 'send-input-btn-no-display'
      }
    }))
    setInputListeners(callback)
  }

  showUIMessage(content, isUser, isFirstMsg) {
    const messagesBox = document.querySelector('.messages-wrapper');
    const message = createMessage({ content: content, user: isUser, first: isFirstMsg, buttons: false });
    messagesBox.prepend(message);
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
      this.history.push({
        speaker: "assistant",
        utterance: event.detail,
      })
    });
  }
}

let metadata = {};

function convFlow(chatUI, type) {
  if (type == "start") {
    const stream = fakeGptEventStream(`Hey there! 😊 I'm curious to learn more about your product and AI needs. Mind sharing some details with me?`)
    chatUI.addGptResponse(stream);
    stream.addEventListener("done", () => {
      convFlow(chatUI, "text");
    });
  } else if (type == "text") {
    chatUI.setTextInput((text) => {
      const stream = gptEventStream(chatUI.history, metadata);
      chatUI.addGptResponse(stream);
      stream.addEventListener("metadata", (event) => {
        console.log(event.detail);
        const fields = ["industry", "use_case", "content_type"];
        // take ONLY fields from event.detail and add to metadata
        metadata = {
          ...metadata,
          ...Object.fromEntries(
            Object.entries(event.detail).filter(([key, value]) =>
              fields.includes(key) && value !== "none"
            )
          ),
        };
        console.log(metadata);
      });
      stream.addEventListener("done", () => {
        if (Object.keys(metadata).length < 3) {
          convFlow(chatUI, "text");
        } else {
          convFlow(chatUI, "buttons");
        }
      });
    });
  } else if (type == "buttons") {
    chatUI.setButtonsInput(["CORRECT", "EDIT"], (text) => {
      if (text == "EDIT") {
        const stream = fakeGptEventStream("Okay. What else would you like me to know?");
        chatUI.addGptResponse(stream);
        stream.addEventListener("done", () => {
          convFlow(chatUI, "text");
        });
      } else {
        const stream = fakeGptEventStream("Great! We'll be in touch soon.");
        chatUI.addGptResponse(stream);
        stream.addEventListener("done", () => {
          console.log("done");
        });
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.body.style.background = '#1d1c29';
  window.chat = new ChatUI(document.body);

  convFlow(window.chat, "start");
});

/**Call this when you set the inputs to make sure the right listeners are set for each type of input
   * 
   * @param {function} btnCallback -- handler function for the purple input button
   */
export function setInputListeners(btnCallback) {
  if (document.querySelector('.send-input-btn')) {
    //text or file input

    const text = document.querySelector('.user-inpt').value;
    // document.querySelector('.send-input-btn').addEventListener('click', () => btnCallback(text));
  }
  if (document.querySelector('.user-inpt')) {
    //if input has user-inpt, give it listeners on focus
    allowEnter(btnCallback);
  }
  if (document.querySelector('.input-book-demo')) {
    //setting the listeners for the BOOK DEMO input section
    document.querySelector('.input-book-demo').addEventListener('click', btnCallback)
  }
}