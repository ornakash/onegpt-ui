import './Message.css';


export const createMessage = ({
  content,
  user = true
}) => {
  const message = document.createElement('div');
  
  //specify class based on if user
  const isUserClass = user ? 'from-user' : 'from-ai';
  message.className = `msg ${isUserClass}`;

  const p = document.createElement('p');
  p.innerHTML = content;

  message.append(p);

  
  return message;
};