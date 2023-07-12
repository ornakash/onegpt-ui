import { createInputSection } from "./InputSection";

export default {
    title: 'ChatComponents/InputSection',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createInputSection({ label, ...args });
    },
    argTypes: {
        onfocus: {action: 'onFocus'},
      color: { control: 'color' },
      label: {control: 'text'},
      useLabel: {control: 'text'}, 
      classNames: {control: 'object'}
    },
  };


  export const Primary = {
    args: {
        useLabel: 'text',
        classNames: {
          inputSection: 'input-div', 
          sendBtn: 'send-input-btn'
        }
    },
  };

  export const FileInput = {
    args: {
      useLabel: 'file',
      classNames: {
        inputSection: 'input-div', 
        sendBtn: 'send-input-btn'
      }
    }
  }

  export const Disabled = {
    args: {
      useLabel: 'disabled',
      classNames: {
        inputSection: 'input-div input-disabled', 
        sendBtn: 'send-input-btn input-disabled-btn'
      }
    }
  }
