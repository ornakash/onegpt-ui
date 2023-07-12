// let messageCount = 0;

export const params = {
    value: undefined
};

/**
 * 
 * @param {string} text text we get from the askGPT stream
 * @param {boolean} done true if stream is completed
 */
export function setBotText(text, done){
    const messageDiv = document.querySelector(".writing");
    if(messageDiv){ 
        const spanElement = messageDiv.firstChild;
        spanElement.innerHTML = `${text.trimStart()} <span class='cursor-gpt'> | </span>`;
    }

    if (done) {
        //remove the writing class
        console.log('entering done');
        messageDiv.className = 'span-wrapper';
        setTimeout(() => { 
            document.querySelector('.cursor-gpt').remove();
        }, 250);
    }
}

export function addUrl(hrefs, texts){
    const writingEl = document.querySelector(".writing");
    const container = document.createElement("div");
    console.log(hrefs);
    console.log(texts);
    // let htmlString = `<div class="msg center-msg"><div class="msg-bubble"><div class="msg-text">Looking in `
    // htmlString += hrefs.map((href, i) => `<a href=${href}>${texts[i]}</a>`).join(", ");
    // htmlString += `...</div></div></div>`;
    // container.innerHTML = htmlString;
    // writingEl.parentElement.insertBefore(container.firstChild, writingEl);
}

/**
 * 
 * @param {*} chat ['utterance': 'userMsg', 'speaker': 'user']
 * @param {*} onText helper function that writes responses into the UI as they come
 * @param {*} onURL adds the URL source that we prepend before the AI response
 */
export function askGpt(chat, onText, onURL) {
    console.log(chat);
    let writeMarkdown = "";
    onText("", false);
    let abortController = new AbortController();
    const options = {
        method: 'POST',
      headers: {
        'Content-Type': params.value.contentType,
        'api-key': params.value.apiKey,
      },
      body: JSON.stringify({
              input: chat,
        output_type: "json",
        multilingual: {
            enabled: true,
        },
        steps: [
            {
              skill: "bizgpt",
            params: {
                project: params.value.project,
              cache: params.value.cache,
            //   metadata: urlParams,
              threshold: params.value.threshold,
              max_items: params.value.maxItems,
              temperature: params.value.temperature,
            }
          }
        ]
      }),
      mode: 'cors',
      signal: abortController.signal,
    };
      fetch('https://api.oneai.com/api/v0/pipeline/stream', options)
        .then(response => {
        const reader = response.body.getReader();
        let first = true;
        let space = false;
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                    onText(writeMarkdown, true);
                  controller.close();
                  abortController = undefined;
                  return;
                }
                const decodedValue = new TextDecoder('utf-8').decode(value);
                const lines = decodedValue.split("\n");
                for (let line of lines) {
                    if (space && line === "") {
                      writeMarkdown += "\n";
                  }
                  else if (first) {
                    first = false;
                    try {
                      const jsonData = JSON.parse(line);
                      onURL(jsonData["url"], jsonData["country_name"]);
                    } catch (e) {}
                  }
                  else {
                    space = (line === "");
                    writeMarkdown += line;
                  }
                }
                onText(writeMarkdown, false);
                push();
              });
            }
            push();
          }
      })
    }).catch(console.error);
  }