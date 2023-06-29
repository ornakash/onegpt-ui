import './chatbackground.css';


export const createChatBackground = ({
  backgroundColor,
}) => {
  const chatBackground = document.createElement('div');

  chatBackground.className = 'sidebar';
  // chatBackground.id = 'storybook-background'

  chatBackground.backgroundColor = backgroundColor;

  return chatBackground;
};