import { createChatBackground } from "./ChatBackground";

export default {
    title: 'ChatComponents/ChatBackground',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createChatBackground({ label, ...args });
    },
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  };


  export const Primary = {
    args: {
      backgroundColor: 'red'
    },
  };