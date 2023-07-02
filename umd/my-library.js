const g = ({
  backgroundColor: t
}) => {
  const e = document.createElement("div");
  return e.className = "sidebar", e.backgroundColor = t, e;
};
const r = ({
  content: t,
  user: e = !0
}) => {
  const n = document.createElement("div"), o = e ? "from-user" : "from-ai";
  n.className = `msg ${o}`;
  const c = document.createElement("p");
  return c.innerHTML = t, n.append(c), n;
};
let s = !0;
function f() {
  document.querySelector(".button-send").addEventListener("click", a), document.querySelector(".user-inpt").addEventListener("focus", u), document.querySelector(".user-inpt").addEventListener("focusout", l);
}
function a() {
  console.log("sending chat");
  const t = document.querySelector(".user-inpt"), e = t.value;
  if (console.log(e), !e || !s)
    return;
  s = !1;
  const n = document.querySelector(".messages"), o = r({ content: e, user: !0 });
  n.prepend(o), t.value = "", setTimeout(E, 1e3);
}
function E() {
  const t = document.querySelector(".messages"), e = r({ content: "Your AI response", user: !1 });
  t.prepend(e), s = !0;
}
function d(t) {
  t.key === "Enter" && a();
}
function u() {
  window.addEventListener("keydown", d);
}
function l() {
  window.removeEventListener("keydown", d);
}
const v = ({
  onFocus: t = u,
  onFocusOut: e = l
}) => {
  const n = document.createElement("div");
  n.className = "input-div";
  const o = document.createElement("input");
  return o.className = "user-inpt", n.appendChild(o), n;
};
const h = ({
  backgroundColor: t = "yellow",
  label: e = "SEND",
  onClick: n = a
} = {}) => {
  const o = document.createElement("input");
  return o.type = "button", o.value = e, o.className = "button-send", o.style.backgroundColor = t, console.log(o), o;
};
const S = ({
  label: t = "Or press Enter &#9166;",
  color: e
}) => {
  const n = document.createElement("span");
  return n.className = "direction-span", n.innerHTML = t, n.style.color = e, n;
}, y = ({}) => {
  const t = document.createElement("div"), e = S({}), n = h({});
  return t.className = "direction-interface", t.append(e), t.append(n), t;
}, B = ({
  backgroundColor: t
}) => {
  const e = document.createElement("div");
  return e.className = "fixed-bottom-interface", e.appendChild(v({})), e.appendChild(y({})), console.log(e.children), e;
}, C = ({}) => {
  const t = document.createElement("div");
  let e = g({});
  const n = document.createElement("div");
  n.className = "wrapper";
  let o = document.createElement("span");
  o.innerHTML = "CLOSE", o.className = "close-btn", n.append(o);
  let c = document.createElement("div");
  c.className = "messages";
  let m = r({ content: "Your AI assistant...", user: !1 });
  c.append(m);
  let p = B({});
  return e.appendChild(n), e.append(c), e.append(p), t.append(e), t;
}, i = C({});
console.log(i);
document.querySelector("body").innerHTML = i.outerHTML;
document.addEventListener("DOMContentLoaded", () => {
  console.log("document loaded"), f();
});
