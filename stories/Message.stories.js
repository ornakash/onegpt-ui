import {createMessage} from './Message.js';

export default {
    title: 'ChatComponents/Message',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createMessage({ label, ...args });
    },
    argTypes: {
      content: {control: 'text'},
      user: { control: 'boolean' },
    },
  };


  export const User = {
    args: {
      content: 'User asking a question...',
      user: true,
    },
  };

  export const Ai = {
    args: {
      content: 'Ai\'s response' ,
      user: false
    },
  };