import { createFixedBottomInterface } from "./FixedBottomInterface.js";

export default {
    title: 'ChatComponents/FixedBottomInterface',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createFixedBottomInterface({ label, ...args });
    },
    argTypes: {
    },
  };


  export const Primary = {
  };