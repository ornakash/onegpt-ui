const headerText = `Greetings, human! Let's put a smile on that face! Tell us what you need and brace yourself for some fun!`
const buttonsText = [`I'VE GOT AN AI-DEA`, `SPY ON COMPETITORS`, `LEMME SCROLL PLZ`];

function createHomePageMain() {
    // createChatUI({wrapper: document.body});

    const wrapper = document.createElement('div');
    wrapper.className = 'main-wrapper'
    const h1 = document.createElement('h1');
    h1.style.color = 'white';
    h1.style.textAlign = 'center';
    h1.innerHTML = 'Welcome to One AI! Put this in you product ASAP guys';
    wrapper.append(h1);
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'chat-ui-wrapper'
    wrapper.append(wrapperDiv);
    wrapper.append(createInterface(headerText, buttonsText));

    document.body.append(wrapper);
    attachEventListeners(showBizGPTUI);
}

/**
 * 
 * @param {string} headerText  -- str of header
 * @param {string[]} buttonsText -- list of strs for btns
 * @returns 
 */
function createInterface(headerText, buttonsText) {
    const wrapper = document.createElement('div');
    wrapper.className = 'interface-wrapper'

    const container = document.createElement('div');
    container.className = 'chat-ui-home-controller';

    const header = document.createElement('div');
    header.className = 'chat-ui-controller-header';
    const headerSpan = document.createElement('span');
    headerSpan.innerHTML = headerText;
    header.append(headerSpan)

    const bttnsContainer = document.createElement('div');
    bttnsContainer.className = 'chat-ui-controller-btns-ctr';

    for (const btnText of buttonsText) {
        const btn = document.createElement('div');
        btn.className = 'chat-ui-home-btns-wrapper';

        const btnSpan = document.createElement('span');
        btnSpan.className = 'chat-ui-btn';
        btnSpan.innerHTML = btnText;
        btn.append(btnSpan);
        bttnsContainer.append(btn);
    }

    container.append(header);
    container.append(bttnsContainer);
    wrapper.append(container)

    return wrapper;
}

function onCloseCallback(){ 
    
}

function showBizGPTUI(event) {
    console.log('test');
    console.log(event);

    createChatUI({ wrapper: document.querySelector('.chat-ui-wrapper') });

    //give style to the div surrounding the ONE AI chat
    const UIWrapper = document.querySelector('.chat-ui-wrapper').firstChild;
    UIWrapper.className = 'sidebar-wrapper'
    UIWrapper.classList.add('fade-in');


    //add event listener to the close button

}


function attachEventListeners(raiseUICallback) {
    const btns = document.querySelectorAll('.chat-ui-home-btns-wrapper');

    for (const btn of btns) {
        btn.addEventListener('click', (event) => raiseUICallback(event));

    }
}