import {handleSubmitFile, handleSubmitHTTP} from '../InputSection'
// import { allowEnter, forbidEnter, sendChat } from './main-scripts';

// Select the target node you want to observe for changes
const targetNode = document.querySelector('body');

export function createDocumentChangeObserver(){
    // Create a new instance of MutationObserver
    const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // New DOM content has been added
        // Perform your desired actions here
        // console.log('New content added:', mutation.addedNodes);
        
        for(const element of mutation.addedNodes){
            if(element.className === 'custom-file-input-div file-input-div-disabled'){
                //if a file has been inputted
                console.log('file inputted');
                document.querySelector('.send-input-btn').addEventListener('click', handleSubmitFile);
            }
            else if(element.className === 'input-div' && element.id === 'file'){
                //file input ui showing (BUT FILE NOT INPUTTED)
                //so button now listens for handleSubmitHttp
                console.log('file input ui showing')
                // document.querySelector('.send-input-btn').addEventListener('click', handleSubmitHTTP);
                // document.querySelector('.user-inpt').addEventListener('focus', allowEnter);
                // document.querySelector('.user-inpt').addEventListener('focusout', forbidEnter);
            }else if(element.className === 'input-div' && element.id === 'text'){
                //main text UI showing now
                //so button now listens for sendChat
                console.log('text input ui showing')
                // document.querySelector('.send-input-btn').addEventListener('click', sendChat);
                // document.querySelector('.user-inpt').addEventListener('focus', allowEnter);
                // document.querySelector('.user-inpt').addEventListener('focusout', forbidEnter);
            }
        }

        // if(element.className === 'input-div' && element.id === 'file'){
        //     console.log('file uploaded')
        // }

        }
    }
    });

    // Configure the MutationObserver to watch for specific types of mutations
    const config = { childList: true, subtree: true };

    // Start observing the target node with the specified configuration
    observer.observe(targetNode, config);

}