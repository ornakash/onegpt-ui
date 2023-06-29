import './ChatPage.css';
import './extra.css'
import {createChatBackground} from './ChatBackground.js'
import {createFixedBottomInterface} from './FixedBottomInterface.js'
import { createMessage } from './Message';

//arguments decide what the component will look like
export const createChatPage = ({
}) => {
    const chatPage = document.createElement('div');
    
    //append the other stories
    let chatBackground = createChatBackground({});
    
    //create the close button and wrapper
    const closeBtnWrapper = document.createElement('div');
    closeBtnWrapper.className = 'wrapper';
    let closeBtn = document.createElement('span')
    closeBtn.innerHTML = 'CLOSE';
    closeBtn.className = 'close-btn';
    closeBtnWrapper.append(closeBtn)


    //create the section where messages are stored and append first message
    let messagesDiv = document.createElement('div')
    messagesDiv.className = 'messages';
    let message = createMessage({content: 'Your AI assistant...', user: false});
    messagesDiv.append(message);

    //create fixedBottomInterface
    let fixedBottomInterface = createFixedBottomInterface({})


    //append all to chatBackground
    chatBackground.appendChild(closeBtnWrapper);
    chatBackground.append(messagesDiv)
    chatBackground.append(fixedBottomInterface);

    //and then to chat page
    chatPage.append(chatBackground);
    

    return chatPage;
};