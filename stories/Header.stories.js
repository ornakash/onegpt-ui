import { createHeader } from './Header';

export default {
  title: 'ChatComponents/Header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/html/writing-docs/autodocs
  tags: ['autodocs'],
  render: ({label,  ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createHeader({label, ...args });
  },
    argTypes: {
  },
};

export const Primary = {
  args: {
  },
};

