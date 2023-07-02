import './ChatPage.css';
import './extra.css'
import {createChatBackground} from './ChatBackground.js'
import {createFixedBottomInterface} from './FixedBottomInterface.js'
import { createMessage } from './Message';
import * as apiCall from './javascripts/api-call';

//arguments decide what the component will look like
export const createChatPage = ({
    contentType = 'application/json',
    apiKey = '2b2e4354-25cc-4972-994e-da93ea0192a9',
    project = 'countrypedia-v25',
    cache = true,
    metadeta = undefined,
    threshold = .7,
    maxItems = 10,
    temperature = 0.01
}) => {
    apiCall.params.value = {
        contentType,
        apiKey,
        project,
        cache,
        metadeta,
        threshold,
        maxItems,
        temperature,
    }
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
    let message = createMessage({content: 'Your AI assistant...', user: false, first: true});
    message.className = 'msg from-ai'
    messagesDiv.append(message);

    //create fixedBottomInterface
    let fixedBottomInterface = createFixedBottomInterface({})


    //append all to chatBackground
    chatBackground.appendChild(closeBtnWrapper);
    chatBackground.append(messagesDiv)
    chatBackground.append(fixedBottomInterface);

    //and then to chat page
    chatPage.append(chatBackground);



    localStorage.setItem('headers', {'Content-Type': contentType, 'api-key': apiKey});
    localStorage.setItem('params', 
        {project: project, 
        cache: cache, 
        metadeta: metadeta, 
        threshold: threshold,
        max_items: maxItems, 
        temperature: temperature}
    );
    
    

    
    return chatPage;
};