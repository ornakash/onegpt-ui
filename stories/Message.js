import './Message.css';


export const createMessage = ({
  content,
  user = true,
  first
}) => {
  const message = document.createElement('div');
  
  //specify class based on if user
  const isUserClass = user ? 'from-user' : 'from-ai';
  message.className = `msg ${isUserClass}`;

  const spanWrapper = document.createElement('div');
  const spanWrapperClass = !user && !first ? ' writing' : ''
  spanWrapper.className = `span-wrapper${spanWrapperClass}`;

  //the p will store the text
  const span = document.createElement('span');
  span.innerHTML = content;
  spanWrapper.append(span);

  if(!user && !first){ 
    const span = document.createElement('span');
    span.className = 'cursor-gpt';
    span.innerHTML = '|';
    spanWrapper.append(span);
  }

  message.append(spanWrapper)

  
  return message;
};