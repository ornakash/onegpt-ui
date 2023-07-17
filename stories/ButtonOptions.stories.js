import {createButtonOptions, handleButtonInputsClick} from './ButtonOptions';

export default {
    title: 'ChatComponents/ButtonOptions',
      // You can either use a function to create DOM elements or use a plain html string!
      // return `<div>${label}</div>`;
      render: ({ label, ...args }) => {
        // You can either use a function to create DOM elements or use a plain html string!
        // return `<div>${label}</div>`;
        return createButtonOptions({ label, ...args });
      },
    argTypes: {
      preferences: {control: 'list'},
      callback: {control: 'function'}
    },
  };


  export const Primary = {
    args: {
      callback: handleButtonInputsClick
    },
  };
