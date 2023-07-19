const headerText = `Greetings, human! Let's put a smile on that face! Tell us what you need and brace yourself for some fun!`
const buttonsText = [['CREATE', 'I know what I want'],[ 'EXPLORE', `I need some inspiration`], ['KEEP SCROLLING', 'Learn more about One AI']];

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
        const [btnHeader, descText] = btnText;
        console.log(btnHeader);
        console.log(descText);
        const btn = document.createElement('div');
        btn.className = 'chat-ui-home-btns-wrapper';

        const headerSpan = document.createElement('span');
        headerSpan.innerHTML = btnHeader;
        headerSpan.style.color = '#00FFFF';
        const descSpan = document.createElement('span');
        descSpan.innerHTML = descText; 
        descSpan.style.color = '#EDEDED'

        btn.append(headerSpan, descSpan);
        bttnsContainer.append(btn);
    }

    container.append(header);
    container.append(bttnsContainer);
    wrapper.append(container)

    return wrapper;
}

//cb for closing OneAgent
function onCloseCallback() {
    console.log('pooping');
    document.querySelector('.sidebar-wrapper.fade-in').classList.toggle('fade-in');
    document.querySelector('.sidebar-wrapper').classList.add('fade-out');
}


let chatUICreated = false; 
function showBizGPTUI(event) {
    console.log('test');
    console.log(event);

    if(!chatUICreated){
        createChatUI({ wrapper: document.querySelector('.chat-ui-wrapper'), onClose: onCloseCallback });
        chatUICreated = true;
    }
    //give style to the div surrounding the ONE AI chat
    const UIWrapper = document.querySelector('.chat-ui-wrapper').firstChild;
    UIWrapper.className = 'sidebar-wrapper'
    UIWrapper.classList.add('fade-in');

    //then change the buttons when animation is finished 
    setTimeout(replaceHomePageBtns, 450);
}

function replaceHomePageBtns() { 
    console.log('pooping')
    for(const child of document.querySelector('.interface-wrapper').children){
        child.remove();
    }


}



function attachEventListeners(raiseUICallback) {
    const btns = document.querySelectorAll('.chat-ui-home-btns-wrapper');

    for (const btn of btns) {
        btn.addEventListener('click', (event) => raiseUICallback(event));

    }
}