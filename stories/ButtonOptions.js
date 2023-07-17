import { setInputListeners } from '../main';
import './buttonOptions.css';
import { createInputSection } from './InputSection';
import { createMessage } from './Message';

export const createButtonOptions = ({
    preferences,
    callback = undefined,
}) => {
    const buttonOptions = document.createElement('div');
    buttonOptions.className = 'button-options-input-div'

    let btnList = [];
    for(const preference of preferences){
        btnList.push(createMessage({content: preference, user: true, first: false, buttons: true}))
    }

    //give extra class so we can remove listeners
    for(let msg of btnList){
        msg.className = 'msg from-user buttons-option'

        //callback === handleButtonInputsClick
        msg.addEventListener('click', (e) => {
            // disable buttons
            handleButtonInputsClick(e);
            if (callback) callback(msg.innerText);
        });

        buttonOptions.append(msg)
    }

    //replace input div and put in an input div disabled
    document.querySelector('.input-div').remove();
    document.querySelector('.sidebar').append(createInputSection({useLabel: "disabled", classNames:{
        inputSection: 'input-div input-disabled', 
        sendBtn: 'send-input-btn input-disabled-btn'
      }}))

    return buttonOptions;
};


export function handleButtonInputsClick(event){
    console.log('clicked')

    console.log(event);
    console.log(event.target);
    console.log(event.target.tagName);

    let userResponseButtons = "";
    if(event.target.tagName === 'SPAN'){
        console.log('span found');
        userResponseButtons = event.target.innerHTML;
    }else{ 
        let span = event.target;
        
        while(span.firstChild.nodeType === Node.ELEMENT_NODE){
            span = span.firstChild;
        }
        userResponseButtons = span.innerHTML
    }
    
    //btnClickedString takes on values 'yes' , 'no', 'maybe'
    console.log(userResponseButtons);

    document.querySelector('.messages-wrapper').prepend(createMessage({content: `Response: ${userResponseButtons}`, first: true, 
    user: false, buttons: false
    }))

    //clean up the event listeners from the buttons and put in normal file input
    cleanUpButtonEventListeners();


    document.querySelector('.input-div').remove();
    document.querySelector('.sidebar').append(createInputSection({useLabel: 'text', classNames: {
      inputSection: 'input-div', 
      sendBtn: 'send-input-btn'
    }}))
}

function cleanUpButtonEventListeners(){ 
    let count = 1;
    console.log(document.querySelectorAll('.buttons-option'));
    const buttonOptions = document.querySelectorAll('.buttons-option')

    for(let option of buttonOptions){
        option.removeEventListener('click', handleButtonInputsClick)
    }

}