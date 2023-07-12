import {handleSubmitFile} from '../InputSection'

// Select the target node you want to observe for changes
const targetNode = document.querySelector('body');

export function createDocumentChangeObserver(){
    // Create a new instance of MutationObserver
    const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // New DOM content has been added
        // Perform your desired actions here
        console.log('New content added:', mutation.addedNodes);
        
        for(const element of mutation.addedNodes){
            if(element.className === 'custom-file-input-div file-input-div-disabled'){
                console.log('file inputted');
                document.querySelector('.send-input-btn').addEventListener('click', handleSubmitFile);

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