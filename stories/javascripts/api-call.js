// let messageCount = 0;

export const params = {
  value: undefined
};

/**
 * 
 * @param {string} text text we get from the askGPT stream
 * @param {boolean} done true if stream is completed
 */
export function setBotText(text) {
  const messageDiv = document.querySelector(".writing");
  if (messageDiv) {
    const spanElement = messageDiv.firstChild;
    spanElement.innerHTML = text.trimStart();
  }
}

export function onStreamFinish() {
  //remove the writing class and cursor
  const messageDiv = document.querySelector(".writing");
  // console.log('entering done');
  messageDiv.className = 'span-wrapper';
  setTimeout(() => {
    document.querySelector('.cursor-gpt').remove();
  }, 250);
}

export function addUrl(hrefs, texts) {
  const writingEl = document.querySelector(".writing");
  const container = document.createElement("div");
  // let htmlString = `<div class="msg center-msg"><div class="msg-bubble"><div class="msg-text">Looking in `
  // htmlString += hrefs.map((href, i) => `<a href=${href}>${texts[i]}</a>`).join(", ");
  // htmlString += `...</div></div></div>`;
  // container.innerHTML = htmlString;
  // writingEl.parentElement.insertBefore(container.firstChild, writingEl);
}

export function gptEventStream(chat, metadata = {}) {
  const stream = new EventTarget();
  const createContentEvent = (text) => stream.dispatchEvent(new CustomEvent("content", { detail: text }));
  const createMetadataEvent = (metadata) => stream.dispatchEvent(new CustomEvent("metadata", { detail: metadata }));
  const createDoneEvent = (text) => {
    stream.dispatchEvent(new CustomEvent("done", { detail: text }));
  };

  askGpt(chat, metadata, createContentEvent, createMetadataEvent, createDoneEvent);
  return stream;
}

export function fakeGptEventStream(message) {
  const stream = new EventTarget();
  const words = message.split(" ");
  const createContentEvent = (i) => {
    if (i === words.length) stream.dispatchEvent(new CustomEvent("done", { detail: message }));
    else {
      stream.dispatchEvent(new CustomEvent("content", { detail: words.slice(0, i + 1).join(" ") }));
      setTimeout(() => createContentEvent(i + 1), 100 * Math.random());
    }
  };
  setTimeout(() => createContentEvent(0), 500);
  return stream;
}

/**
 * 
 * @param {*} chat ['utterance': 'userMsg', 'speaker': 'user']
 * @param {*} onText helper function that writes responses into the UI as they come
 * @param {*} onMetadata adds the URL source that we prepend before the AI response
 */
export function askGpt(chat, metadata, onText, onMetadata, onFinish) {
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
            metadata,
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
                if (onFinish) onFinish(writeMarkdown);
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
                    onMetadata(jsonData);
                  } catch (e) { }
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