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
    for (const preference of preferences) {
        btnList.push(createMessage({ content: preference, user: true, first: false, buttons: true }))
    }

    const clickHandler = (e) => {
        // handleButtonInputsClick(e);
        const text = e.target.innerText;
        for (let msg of btnList) {
            msg.removeEventListener('click', clickHandler);
            msg.classList.add('disabled');
            if (msg.innerText === text) {
                msg.classList.add('selected');
            }
        }
        if (callback) callback(text);
    }

    //give extra class so we can remove listeners
    for (let msg of btnList) {
        msg.className = 'msg from-user buttons-option'

        //callback === handleButtonInputsClick
        msg.addEventListener('click', clickHandler);
        buttonOptions.append(msg)
    }

    //replace input div and put in an input div disabled
    const inputDiv = document.querySelector('.input-div');
    const input = inputDiv.querySelector('.user-inpt');

    inputDiv.querySelector('.send-input-btn').classList.add('disabled');
    input.value = '';
    input.disabled = true;
    input.placeholder = 'Select an option';

    return buttonOptions;
};


export function handleButtonInputsClick(event) {
    // console.log('clicked')

    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.tagName);

    let userResponseButtons = "";
    if (event.target.tagName === 'SPAN') {
        // console.log('span found');
        userResponseButtons = event.target.innerHTML;
    } else {
        let span = event.target;

        while (span.firstChild.nodeType === Node.ELEMENT_NODE) {
            span = span.firstChild;
        }
        userResponseButtons = span.innerHTML
    }

    //btnClickedString takes on values 'yes' , 'no', 'maybe'
    // console.log(userResponseButtons);

    // document.querySelector('.messages-wrapper').prepend(createMessage({
    //     content: `Response: ${userResponseButtons}`, first: true,
    //     user: false, buttons: false
    // }))

    //clean up the event listeners from the buttons and put in normal file input
    // cleanUpButtonEventListeners();


    // document.querySelector('.input-div').remove();
    // document.querySelector('.sidebar').append(createInputSection({
    //     useLabel: 'text', classNames: {
    //         inputSection: 'input-div',
    //         sendBtn: 'send-input-btn'
    //     }
    // }))
}

// function cleanUpButtonEventListeners() {
//     let count = 1;
//     console.log(document.querySelectorAll('.buttons-option'));
//     const buttonOptions = document.querySelectorAll('.buttons-option')

//     for (let option of buttonOptions) {
//         option.removeEventListener('click', handleButtonInputsClick)
//     }

// }