import './Message.css';


export const createMessage = ({
  content,
  user = true,
  first,
  buttons
}) => {
  const message = document.createElement('div');

  //specify class based on if user
  const isUserClass = user ? 'from-user' : 'from-ai';
  message.className = `msg ${isUserClass}`;

  const messageTick = document.createElement('div');
  messageTick.className = 'msg-tick'

  const spanWrapper = document.createElement('div');
  const spanWrapperClass = !user && !first ? ' writing' : ''
  spanWrapper.className = `span-wrapper${spanWrapperClass}`;

  //the p will store the text
  const spanWithResponse = document.createElement('span');
  spanWithResponse.innerHTML = content;

  message.append()
  spanWrapper.append(spanWithResponse);

  if (!user && !first) {
    const spanCursor = document.createElement('span');
    spanCursor.className = 'cursor-gpt';
    spanCursor.innerHTML = '&nbsp;';
    spanWrapper.append(spanCursor);
  }

  if (buttons === true) {
    message.append(spanWrapper)

  } else {
    message.append(messageTick, spanWrapper)
  }


  return message;
};