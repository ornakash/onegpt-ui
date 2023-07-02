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
      contentType: {control: 'text'},
      apiKey: {control: 'text'},
      project: {control: 'text'},
      cache: {control: 'boolean'},
      metadeta: {control: 'text'},
      threshold: {control: 'number'},
      maxItems: {control: 'number'},
      temperature: {control: 'number'}
    },
  };


  export const Primary = {
    args: {
      contentType: 'application/json',
      apiKey: '2b2e4354-25cc-4972-994e-da93ea0192a9',
      cache: true,
      threshold: .7,
      maxItems: 10,
      temperature: .1      
    },
};