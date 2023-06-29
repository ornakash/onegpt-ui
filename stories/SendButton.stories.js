import { createSendButton } from "./SendButton";
import {sendChat} from './javascripts/main-scripts.js';

export default {
    title: 'ChatComponents/SendButton',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createSendButton({ label, ...args });
    },
    argTypes: {
      backgroundColor: { control: 'color' },
      label: {control: 'text'},
      onClick: { action: 'onClick' },

    },
  };


  export const Primary = {
    args: {
      backgroundColor: 'yellow',
      label: 'SEND',
      onClick: sendChat,
    },
  };