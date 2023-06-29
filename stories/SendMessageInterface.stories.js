import { createSendMessageInterface } from "./SendMessageInterface.js";

export default {
    title: 'ChatComponents/SendMessageInterface',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createSendMessageInterface({ label, ...args });
    },
    argTypes: {
    },
  };


  export const Primary = {

  };