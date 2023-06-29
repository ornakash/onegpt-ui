import { createDirection } from "./Direction";

export default {
    title: 'ChatComponents/DirectionText',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      return createDirection({ label, ...args });
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