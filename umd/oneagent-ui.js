const B = ({
  backgroundColor: t
}) => {
  const e = document.createElement("div");
  return e.className = "sidebar", e.backgroundColor = t, e;
};
const f = ({
  content: t,
  user: e = !0,
  first: n,
  buttons: s
}) => {
  const o = document.createElement("div"), r = e ? "from-user" : "from-ai";
  o.className = `msg ${r}`;
  const i = document.createElement("div");
  i.className = "msg-tick";
  const a = document.createElement("div"), d = !e && !n ? " writing" : "";
  a.className = `span-wrapper${d}`;
  const c = document.createElement("span");
  if (c.innerHTML = t, o.append(), a.append(c), !e && !n) {
    const l = document.createElement("span");
    l.className = "cursor-gpt", l.innerHTML = "&nbsp;", a.append(l);
  }
  return s === !0 ? o.append(a) : o.append(i, a), o;
}, C = ({
  preferences: t,
  callback: e = void 0
}) => {
  const n = document.createElement("div");
  n.className = "button-options-input-div";
  let s = [];
  for (const a of t)
    s.push(f({ content: a, user: !0, first: !1, buttons: !0 }));
  const o = (a) => {
    const d = a.target.innerText;
    for (let c of s)
      c.removeEventListener("click", o), c.classList.add("disabled"), c.innerText === d && c.classList.add("selected");
    e && e(d);
  };
  for (let a of s)
    a.className = "msg from-user buttons-option", a.addEventListener("click", o), n.append(a);
  const r = document.querySelector(".input-div"), i = r.querySelector(".user-inpt");
  return r.querySelector(".send-input-btn").classList.add("disabled"), i.value = "", i.disabled = !0, i.placeholder = "Select an option", n;
};
function D(t) {
  if (t.target.tagName === "SPAN")
    t.target.innerHTML;
  else {
    let e = t.target;
    for (; e.firstChild.nodeType === Node.ELEMENT_NODE; )
      e = e.firstChild;
    e.innerHTML;
  }
}
const u = {
  value: void 0
};
function F(t) {
  const e = document.querySelector(".writing");
  if (e) {
    const n = e.firstChild;
    n.innerHTML = t.trimStart();
  }
}
function O() {
  const t = document.querySelector(".writing");
  t.className = "span-wrapper", setTimeout(() => {
    document.querySelector(".cursor-gpt").remove();
  }, 250);
}
function H(t, e = {}) {
  const n = new EventTarget();
  return R(t, e, (i) => n.dispatchEvent(new CustomEvent("content", { detail: i })), (i) => n.dispatchEvent(new CustomEvent("metadata", { detail: i })), (i) => {
    n.dispatchEvent(new CustomEvent("done", { detail: i }));
  }), n;
}
function y(t) {
  const e = new EventTarget(), n = t.split(" "), s = (o) => {
    o === n.length ? e.dispatchEvent(new CustomEvent("done", { detail: t })) : (e.dispatchEvent(new CustomEvent("content", { detail: n.slice(0, o + 1).join(" ") })), setTimeout(() => s(o + 1), 100 * Math.random()));
  };
  return setTimeout(() => s(0), 500), e;
}
function R(t, e, n, s, o) {
  let r = "";
  n("", !1);
  let i = new AbortController();
  const a = {
    method: "POST",
    headers: {
      "Content-Type": u.value.contentType,
      "api-key": u.value.apiKey
    },
    body: JSON.stringify({
      input: t,
      output_type: "json",
      multilingual: {
        enabled: !0
      },
      steps: [
        {
          skill: "bizgpt",
          params: {
            project: u.value.project,
            cache: u.value.cache,
            metadata: e,
            disable_search: !0,
            threshold: u.value.threshold,
            max_items: u.value.maxItems,
            temperature: u.value.temperature
          }
        }
      ]
    }),
    mode: "cors",
    signal: i.signal
  };
  fetch("https://api.oneai.com/api/v0/pipeline/stream", a).then((d) => {
    const c = d.body.getReader();
    let l = !0, m = !1;
    return new ReadableStream({
      start(L) {
        function b() {
          c.read().then(({ done: M, value: T }) => {
            if (M) {
              n(r, !0), L.close(), i = void 0, o && o(r);
              return;
            }
            const x = new TextDecoder("utf-8").decode(T).split(`
`);
            for (let E of x)
              if (m && E === "")
                r += `
`;
              else if (l) {
                l = !1;
                try {
                  const k = JSON.parse(E);
                  s(k);
                } catch {
                }
              } else
                m = E === "", r += E;
            n(r, !1), b();
          });
        }
        b();
      }
    });
  }).catch(console.error);
}
const W = document.querySelector("body");
function G() {
  const t = new MutationObserver((n) => {
    for (const s of n)
      if (s.type === "childList" && s.addedNodes.length > 0)
        for (const o of s.addedNodes)
          o.className === "custom-file-input-div file-input-div-disabled" ? document.querySelector(".send-input-btn").addEventListener("click", q) : o.className === "input-div" && o.id === "file" || o.className === "input-div" && o.id;
  }), e = { childList: !0, subtree: !0 };
  t.observe(W, e);
}
function P() {
  G();
}
function j(t) {
  const e = document.querySelector(".user-inpt"), n = document.querySelector(".send-input-btn"), s = e.value, o = t.key === "Enter" && document.activeElement === e || t.type === "click" && t.target.classList.contains("send-input-btn");
  return o && e.id === "text" ? (e.value = "", e.disabled = !0, e.placeholder = "Waiting for AI response...", n.classList.add("disabled"), s) : o && e.id === "file" ? (I(), s) : void 0;
}
let v;
function A(t) {
  v = (e) => {
    const n = j(e);
    n && (document.querySelector(".messages-wrapper").prepend(f({ content: n, user: !0, first: !1, buttons: !1 })), window.removeEventListener("keydown", v), window.removeEventListener("click", v), t(n));
  }, window.addEventListener("keydown", v), window.addEventListener("click", v);
}
const _ = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.00085 1L5.07203 5.07118L1.00085 9.14236M9.14147 9.14236L5.07029 5.07118L9.14147 1" stroke="#EDEDED" stroke-linecap="round"/>
</svg>`, Z = '<svg height="30px" version="1.1" viewBox="0 0 30 30" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#929292" id="icon-27-trash-can"><path d="M23,7 L21,7 L21,7 L21,5.0048815 C21,3.89761602 20.1041422,3 19.0026083,3 L13.9973917,3 C12.8942627,3 12,3.8938998 12,5.0048815 L12,7 L10,7 L6,7 L6,8 L8,8 L8,26.9931517 C8,28.6537881 9.33396149,30 11.0001262,30 L21.9998738,30 C23.6567977,30 25,28.6640085 25,26.9931517 L25,8 L27,8 L27,7 L23,7 L23,7 L23,7 Z M9,8 L9,27.0054385 C9,28.1070044 9.89339733,29 10.9918842,29 L22.0081158,29 C23.1082031,29 24,28.0976562 24,27.0054385 L24,8 L9,8 L9,8 Z M12,10 L12,27 L13,27 L13,10 L12,10 L12,10 Z M16,10 L16,27 L17,27 L17,10 L16,10 L16,10 Z M20,10 L20,27 L21,27 L21,10 L20,10 L20,10 Z M14.0029293,4 C13.4490268,4 13,4.44266033 13,4.99895656 L13,7 L20,7 L20,4.99895656 C20,4.44724809 19.5621186,4 18.9970707,4 L14.0029293,4 L14.0029293,4 Z" id="trash-can"/></g></g></svg>';
function N(t) {
  let e = document.createElement("svg");
  return e.innerHTML = t, e = e.firstChild, console.log(e), e;
}
const p = ({
  useLabel: t,
  classNames: e
}) => {
  const n = document.createElement("div");
  n.className = e.inputSection;
  const s = document.createElement("input");
  return s.className = "user-inpt", t === "disabled" ? (e.sendBtn += " disabled", n.append(V(), S(e)), n.id = "disabled") : t === "file" ? (n.append(J(), S(e)), n.id = "file") : t === "contact" ? (n.append($(), S(e)), n.id = "contact") : (n.id = "text", e.sendBtn += " disabled", n.append(K(), S(e))), n;
};
function V() {
  const t = document.createElement("input");
  t.disabled = !0, t.className = "user-inpt", t.id = "text", t.autocomplete = "off", t.spellcheck = !1, t.placeholder = "Waiting for AI response...";
  const e = () => {
    document.querySelector(".send-input-btn").classList.toggle("disabled", t.value.length === 0);
  };
  return t.addEventListener("input", e), t;
}
function $() {
  const t = document.createElement("div");
  t.className = "input-book-demo";
  const e = document.createElement("span");
  return e.innerHTML = "BOOK DEMO", t.append(e), t;
}
function J() {
  const t = document.createElement("div");
  t.className = "file-input-wrap-grid";
  const e = document.createElement("span");
  e.className = "file-input-http-span", e.innerHTML = "http://";
  const n = document.createElement("div");
  n.className = "file-input-inner-grid";
  const s = document.createElement("input");
  s.className = "user-inpt", s.id = "file";
  const o = document.createElement("div");
  o.className = "custom-file-input-div";
  const r = document.createElement("span");
  r.innerHTML = "Or ";
  const i = document.createElement("div");
  i.className = "custom-file-input-div";
  const a = document.createElement("input");
  a.type = "file", a.id = "customFileInpt", a.className = "custom-file-input", a.addEventListener("change", z);
  let d = document.createElement("label");
  return d.htmlFor = "customFileInpt", d.innerHTML = '<span style="color: #00FFFF">Upload File </span> <span> &#128448; </span>', i.append(a, d), o.append(r, i), n.append(s, o), t.append(e, n), t;
}
function z(t) {
  const e = t.target.files[0];
  Y(e.name);
}
function q(t) {
  const e = document.querySelector(".custom-file-input").files[0], n = f({ content: `&#128448; ${e.name}`, user: !0, first: !1, buttons: !1 });
  document.querySelector(".messages-wrapper").prepend(n), document.querySelector(".messages-wrapper").prepend(f({
    content: "Is this a good analysis? ->",
    user: !1,
    first: !0,
    buttons: !1
  })), Q();
}
function I() {
  console.log("handleSubmitHTTP called");
  const e = document.querySelector(".user-inpt").value;
  document.querySelector(".messages-wrapper").prepend(f({
    content: e,
    user: !0,
    first: !1,
    buttons: !1
  })), console.log(e);
}
function K(t) {
  const e = document.createElement("input");
  e.className = "user-inpt", e.id = "text", e.autocomplete = "off", e.spellcheck = !1, e.placeholder = "Send a message...";
  const n = () => {
    document.querySelector(".send-input-btn").classList.toggle("disabled", e.value.length === 0);
  };
  return e.addEventListener("input", n), e;
}
function Y(t) {
  const e = document.querySelector(".file-input-wrap-grid"), n = document.querySelector(".custom-file-input-div");
  for (n.className = "custom-file-input-div file-input-div-disabled", console.log(document.querySelector(".custom-file-input").files); e.firstChild; )
    e.firstChild.remove();
  const s = document.createElement("span");
  s.innerHTML = `File: ${t}`;
  const o = N(Z);
  o.style.marginLeft = "auto", o.addEventListener("click", X), document.querySelector(".send-input-btn").removeEventListener("click", I), e.append(s, n, o);
}
function Q() {
  document.querySelector(".messages-wrapper").prepend(C({ preferences: ["YES", "NO", "IMPROVE"], callback: D })), document.querySelector(".input-div").remove(), document.querySelector(".sidebar").append(p({
    useLabel: "disabled",
    classNames: {
      inputSection: "input-div input-disabled",
      sendBtn: "send-input-btn input-disabled-btn"
    },
    callback: void 0
  }));
}
function X() {
  document.querySelector(".input-div").remove(), document.querySelector(".sidebar").append(p({
    useLabel: "file",
    classNames: {
      inputSection: "input-div",
      sendBtn: "send-input-btn"
    }
  })), document.querySelector(".send-input-btn").removeEventListener("click", q);
}
function S(t) {
  const e = document.createElement("div");
  e.className = t.sendBtn;
  const n = document.createElement("div");
  n.className = "arrow-right";
  const s = document.createElement("div");
  return s.className = "smaller-arrow-right", n.append(s), e.append(n), e;
}
const U = ({}) => {
  const t = document.createElement("div");
  t.className = "header-grid";
  const e = document.createElement("span");
  e.className = "intro-chat-span", e.innerHTML = "Chat with One AI";
  const n = document.createElement("div");
  n.className = "close-wrapper-div";
  let s = document.createElement("span");
  s.innerHTML = "CLOSE", s.className = "close-btn";
  const o = N(_);
  return n.append(s, o), t.append(e, n), t;
}, ee = ({
  contentType: t = "application/json",
  apiKey: e = "2b2e4354-25cc-4972-994e-da93ea0192a9",
  project: n = "one-v1",
  cache: s = !0,
  metadeta: o = void 0,
  threshold: r = 0.7,
  maxItems: i = 10,
  temperature: a = 0.01
}) => {
  u.value = {
    contentType: t,
    apiKey: e,
    project: n,
    cache: s,
    metadeta: o,
    threshold: r,
    maxItems: i,
    temperature: a
  };
  const d = document.createElement("div");
  let c = B({});
  const l = U({});
  let m = document.createElement("div");
  m.className = "messages";
  const L = document.createElement("div");
  L.className = "messages-wrapper", m.append(L);
  let b = p({
    useLabel: "disabled",
    classNames: {
      inputSection: "input-div",
      sendBtn: "send-input-btn"
    }
  });
  return c.appendChild(l), c.append(m), c.append(b), d.append(c), localStorage.setItem("headers", { "Content-Type": t, "api-key": e }), localStorage.setItem(
    "params",
    {
      project: n,
      cache: s,
      metadeta: o,
      threshold: r,
      max_items: i,
      temperature: a
    }
  ), d;
};
class te {
  constructor(e) {
    this.page = ee({}), this.wrapper = e, this.history = [], e.innerHTML = this.page.outerHTML, P();
  }
  /** FUNCTION WILL SET BUTTONS UI
   * 
   * @param {str[]} buttonsPreference -- list of str indicating strings of buttons
   * @param {*} callback -- callback fn (By default it is handleButtonInputsClick) that handles when buttons are clicked
   */
  setButtonsInput(e, n = void 0) {
    this.wrapper.querySelector(".messages-wrapper").prepend(C(
      {
        preferences: e,
        ...n !== void 0 && { callback: n }
      }
    ));
  }
  setTextInput(e) {
    document.querySelector(".input-div").remove(), document.querySelector(".sidebar").append(p({
      useLabel: "text",
      classNames: {
        inputSection: "input-div",
        sendBtn: "send-input-btn"
      }
    })), document.querySelector(".user-inpt").focus(), w((n) => {
      this.history.push({
        speaker: "user",
        utterance: n
      }), e(n);
    });
  }
  setDisabledInput() {
    this.wrapper.querySelector(".input-div").remove(), this.wrapper.querySelector(".sidebar").append(p({
      useLabel: "disabled",
      classNames: {
        inputSection: "input-div input-disabled",
        sendBtn: "send-input-btn input-disabled-btn"
      }
    })), w(callback);
  }
  setFileInput(e) {
    this.wrapper.querySelector(".input-div").remove(), this.wrapper.querySelector(".sidebar").append(p({
      useLabel: "file",
      classNames: {
        inputSection: "input-div",
        sendBtn: "send-input-btn"
      }
    })), w(e);
  }
  setContactInput(e) {
    this.wrapper.querySelector(".input-div").remove(), this.wrapper.querySelector(".sidebar").append(p({
      useLabel: "contact",
      classNames: {
        inputSection: "input-div",
        sendBtn: "send-input-btn-no-display"
      }
    })), w(e);
  }
  showUIMessage(e, n, s) {
    const o = document.querySelector(".messages-wrapper"), r = f({ content: e, user: n, first: s, buttons: !1 });
    o.prepend(r);
  }
  addGptResponse(e) {
    this.showUIMessage("", !1, !1), e.addEventListener("content", (n) => {
      F(n.detail);
    }), e.addEventListener("metadata", (n) => {
    }), e.addEventListener("done", (n) => {
      O(), this.history.push({
        speaker: "assistant",
        utterance: n.detail
      });
    });
  }
}
let h = {};
function g(t, e) {
  if (e == "start") {
    const n = y("Hey there! 😊 I'm curious to learn more about your product and AI needs. Mind sharing some details with me?");
    t.addGptResponse(n), n.addEventListener("done", () => {
      g(t, "text");
    });
  } else
    e == "text" ? t.setTextInput((n) => {
      const s = H(t.history, h);
      t.addGptResponse(s), s.addEventListener("metadata", (o) => {
        console.log(o.detail);
        const r = ["industry", "use_case", "content_type"];
        h = {
          ...h,
          ...Object.fromEntries(
            Object.entries(o.detail).filter(
              ([i, a]) => r.includes(i) && a !== "none"
            )
          )
        }, console.log(h);
      }), s.addEventListener("done", () => {
        Object.keys(h).length < 3 ? g(t, "text") : g(t, "buttons");
      });
    }) : e == "buttons" && t.setButtonsInput(["CORRECT", "EDIT"], (n) => {
      if (n == "EDIT") {
        const s = y("Okay. What else would you like me to know?");
        t.addGptResponse(s), s.addEventListener("done", () => {
          g(t, "text");
        });
      } else {
        const s = y("Great! We'll be in touch soon.");
        t.addGptResponse(s), s.addEventListener("done", () => {
          console.log("done");
        });
      }
    });
}
document.addEventListener("DOMContentLoaded", () => {
  window.createChatUI = ({ wrapper: t }) => {
    const e = new te(t);
    return g(e, "start"), e;
  };
});
function w(t) {
  document.querySelector(".send-input-btn") && document.querySelector(".user-inpt").value, document.querySelector(".user-inpt") && A(t), document.querySelector(".input-book-demo") && document.querySelector(".input-book-demo").addEventListener("click", t);
}