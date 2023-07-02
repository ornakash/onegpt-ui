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
  const spanWithResponse = document.createElement('span');
  spanWithResponse.innerHTML = content;

  if(!user && !first){ 
    const spanCursor = document.createElement('span');
    spanCursor.className = 'cursor-gpt';
    spanCursor.innerHTML = '|';
    spanWithResponse.append(spanCursor);
  }
  
  spanWrapper.append(spanWithResponse);
  message.append(spanWrapper)

  
  return message;
};