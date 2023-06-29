import { createChatPage } from "./ChatPage";

export default {
    title: 'ChatComponents/ChatPage',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createChatPage({ label, ...args });
    },
    argTypes: {
      color: { control: 'color' },
      label: {control: 'text'},
    },
  };


  export const Primary = {
    args: {
        color: 'lightgray'
    },
};