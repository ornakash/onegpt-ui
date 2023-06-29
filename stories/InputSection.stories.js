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
    },
  };


  export const Primary = {
    args: {
        color: 'lightgray'
    },
  };