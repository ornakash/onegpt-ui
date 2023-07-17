import { createInputSection, handleSubmitHTTP } from "./InputSection";
import { sendChat } from "./javascripts/main-scripts";

export default {
    title: 'ChatComponents/InputSection',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createInputSection({ label, ...args });
    },
    argTypes: {
      useLabel: {control: 'text'}, 
      classNames: {control: 'object'},
      sendBtnCallback: {control: 'function'}
    },
  };


  export const Primary = {
    args: {
        useLabel: 'text',
        classNames: {
          inputSection: 'input-div', 
          sendBtn: 'send-input-btn'
        },
        sendBtnCallback: sendChat
    },
  };

  export const FileInput = {
    args: {
      useLabel: 'file',
      classNames: {
        inputSection: 'input-div', 
        sendBtn: 'send-input-btn'
      },
      sendBtnCallback: handleSubmitHTTP
    }
  }

  export const Disabled = {
    args: {
      useLabel: 'disabled',
      classNames: {
        inputSection: 'input-div input-disabled', 
        sendBtn: 'send-input-btn input-disabled-btn'
      },
      sendBtnCallback: undefined
    }
  }

  export const Contact = {
    args:{ 
      useLabel: 'contact',
      classNames: {
        inputSection: 'input-div',
        sendBtn: 'send-input-btn-no-display'
      },
    }
  }
