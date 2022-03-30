import{_ as j,r as R,D,N as B}from"./index.c092be5a.js";import{s as W,_ as O}from"./storymatic.8f9c8a69.js";import{d as C,P as N,f as x,i as T,q as U,o as m,a as g,F as k,z as P,n as S,t as E,M as z,u as _,g as w,v as H,x as L,y as F,p as q,k as J,Q as K,c as I,L as Q,s as Y,w as A,j as V,e as G}from"./vendor.5fff172f.js";const X=p=>(q("data-v-4938fa96"),p=p(),J(),p),Z={key:0,class:"message select"},ee=["disabled","onClick"],ne=X(()=>w("span",{class:"option-cap"},null,-1)),te=["placeholder"],oe=C({props:{messages:{default:()=>N([])},placeholder:null,root:{type:Boolean}},emits:["enter","field","select"],setup(p,{emit:y}){const{messages:c,root:i}=p;let a=x("");function f(n){n.preventDefault(),a.value.trim()?(c.push({content:a.value.trim(),type:"user"}),y("field",a.value.trim()),a.value=""):y("enter")}let l=x(null);function d(){let n=i?document.documentElement:l.value;return n?n.scrollHeight-n.scrollTop-n.clientHeight<4:!1}function v(){let n=i?document.documentElement:l.value;!n||(n.scrollTop=n.scrollHeight)}function s(n,u){n.selected=u,y("select",n.name,u)}return T(c,()=>{d()&&setTimeout(v)}),U(v),(n,u)=>(m(),g("div",{ref_key:"consoleEl",ref:l,class:S([{root:_(i)},"console"])},[(m(!0),g(k,null,P(_(c),(r,M)=>(m(),g(k,{key:M},[r.hidden?z("",!0):(m(),g(k,{key:0},[r.type=="select"?(m(),g("div",Z,[(m(!0),g(k,null,P(r.options,(b,e)=>(m(),g("button",{key:e,class:S([{selected:r.selected==e},"option"]),disabled:!!r.selected,onClick:t=>s(r,""+e)},E(b),11,ee))),128)),ne])):(m(),g("div",{key:1,class:S([r.type,"message"])},E(r.content),3))],64))],64))),128)),w("form",{class:"form",onSubmit:f},[H(w("input",{"onUpdate:modelValue":u[0]||(u[0]=r=>F(a)?a.value=r:a=r),class:"field",placeholder:p.placeholder},null,8,te),[[L,_(a)]])],32)],2))}});var se=j(oe,[["__scopeId","data-v-4938fa96"]]),ie=`let post = self.postMessage;
let isAsyncRunning = false;

// @ts-ignore
delete self.postMessage;
// @ts-ignore
delete self.caches;

/** @returns {Promise<any>} */
function onNextMessage() {
  return new Promise((resolve) => {
    self.onmessage = ({ data }) => {
      resolve(data);
    };
  });
}

/** @template T */
async function runAsync(
  /** @type {() => Promise<T>} */ fn,
  /** @type {T} */ defaultValue
) {
  if (isAsyncRunning) return defaultValue;

  isAsyncRunning = true;
  let value = await fn();
  isAsyncRunning = false;

  return value;
}

function _print(/** @type {any[]} */ ...content) {
  post({ type: "print", content });
}

async function _simplePost(
  type = "",
  /** @type {any} */ defaultValue,
  messages = [""]
) {
  return runAsync(async () => {
    _print(...messages);
    post({ type });

    return await onNextMessage();
  }, defaultValue);
}

async function $pause() {
  return runAsync(async () => {
    post({ type: "pause" });
    await onNextMessage();
  });
}

async function $input(messages = [""]) {
  return _simplePost("input", "", messages);
}

async function $inputint(messages = [""]) {
  return _simplePost("inputint", 0, messages);
}

async function $inputfloat(messages = [""]) {
  return _simplePost("inputfloat", 0, messages);
}

async function $confirm(messages = [""]) {
  return _simplePost("confirm", false, messages);
}

function $kill(messages = [""]) {
  _print(messages);
  post({ type: "kill" });
}

async function $wait([time] = [1]) {
  return runAsync(async () => {
    time = +time;
    if (!isFinite(time) || time < 0) time = 0;
    await new Promise((resolve) => setTimeout(resolve, 1000 * time));
  });
}

function $random([min, max] = [0, 1]) {
  min = +min;
  max = +max;

  if (!isFinite(min) || !isFinite(max)) return 0;
  return Math.random() * (max - min) + min;
}

function $randint([min, max] = [0, 9]) {
  min = +min;
  max = +max;

  if (!isFinite(min) || !isFinite(max)) return 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function* $range([min, max] = [1, NaN]) {
  min = +min;
  max = +max;

  if (!isFinite(min)) return;
  if (!isFinite(max)) [max, min] = [min, 0];

  for (let i = min; i <= max; i++) {
    yield i;
  }
}

/** @type {{ [x: string]: string }} */
let options = {};

/** @type {{ [x: string]: () => Promise<void> | void }} */
let menu = {};

async function $menu(
  messages = [""],
  /** @type {() => Promise<void> | void } */ cb = () => {}
) {
  if (isAsyncRunning) return;
  isAsyncRunning = true;

  _print(...messages);

  menu = Object.create(null);
  options = Object.create(null);
  await cb();

  post({ type: "menu", options });
  isAsyncRunning = false;
  await menu[await onNextMessage()]?.();
}

function $option(/** @type {any[]} */ [key, value = key] = [], cb = () => {}) {
  options[key] = "" + value;
  menu[key] = cb;
}

export {};
`;const re=C({props:{code:null},setup(p){const y=p;let c=x("Send messages to program..."),i;function a(e){i&&i(e)}let f;function l(){f&&f()}let d;function v(e,t){d&&d(e,t)}let s=N([]),n=b(y.code,!1);T(K(y,"code"),e=>n=b(e,!0));function u(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="bigint"}function r(e){return e==null?"":u(e)?""+e:typeof e=="function"?`function ${e.name}()`:Array.isArray(e)?e.map(r).filter(t=>t).join(`
`):typeof e=="object"?Object.keys(e).map(t=>`${t}: ${e[t]}`).join(`
`):""}function M({data:e}){if(!(typeof e!="object"||e===null))if(e.type=="print"){let t=r(e.content);if(!t)return;for(let o of t.split(`
`))s.push({type:"info",content:o})}else if(e.type=="input"){let t=n;i=o=>{t==n&&(i=void 0,t==null||t.postMessage(o),t=void 0)}}else if(e.type=="menu"){let t=""+Math.random();s.push({name:t,type:"select",options:e.options||{}});let o=n;d=(h,$)=>{n==o&&(d=void 0,t==h&&(o==null||o.postMessage($)),o=void 0)}}else if(e.type=="pause"){let t=n;c.value="Press enter to continue...";let o=()=>{n==t&&(f=void 0,i=void 0,t==null||t.postMessage(void 0),t=void 0,c.value="Send messages to program...")};f=o,i=o}else e.type=="kill"&&(n==null||n.terminate())}function b(e,t){t&&(n==null||n.terminate()),c.value="Send messages to program...",s.map(o=>o.hidden=!0);try{let o=ie+W(e),h=new Worker(`data:text/javascript,${o}`,{name:Math.random().toString().slice(2),type:"module"});return h.onmessage=M,h.onerror=$=>{$.preventDefault(),s.push({type:"error",content:$.message})},i=void 0,h}catch(o){s.push({type:"error",content:""+((o==null?void 0:o.message)||o||"An unknown error occurred")})}}return(e,t)=>(m(),I(se,{class:"console",messages:_(s),placeholder:_(c),onEnter:l,onField:a,onSelect:v},null,8,["messages","placeholder"]))}});const ae=G("Run Program"),le={class:"container"},ce=C({setup(p){function y(s){try{return btoa(s.replace(/[^\x00-\xff]+/g,"")).replace(/\+/g,"_").replace(/\//g,"-").replace(/=/g,"$")}catch{return""}}function c(s){try{return atob(s.replace(/_/g,"+").replace(/-/g,"/").replace(/\$/g,"="))}catch{return""}}let i;function a(s){i=s,s.commands.addCommand({name:"run",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:f})}function f(){d.value=`#${Math.random()}
${i.getValue()}`}let l=x(c(""+(Q().params.code||""))||`# After working on a project, bookmark your page to save your code.

# Surround text with quotation marks to print it.
"Welcome to my program!"



# Use @menu to create a menu the user can select from.
# Add @option blocks to create menu items.

@menu "What is your favorite ice cream flavor?"

  @option "Chocolate"
    "Well, I think that's an amazing flavor!"

  @option "Vanilla"
    "I like vanilla too!"

  @option "Brussel sprout"
    "You've got to be joking..."

  @option "Other"
    $flavor = @input "What flavor do you like?"
    "Well, I guess |$flavor| is good too.
`),d=x('"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'),v=setInterval(()=>{R.replace(`/storymatic/${y(l.value)}`)},5e3);return Y(()=>clearInterval(v)),(s,n)=>(m(),I(D,{"explicit-height":""},{nav:A(()=>[V(B,{onClick:f},{default:A(()=>[ae]),_:1})]),default:A(()=>[w("div",le,[V(O,{modelValue:_(l),"onUpdate:modelValue":n[0]||(n[0]=u=>F(l)?l.value=u:l=u),class:"editor",onInit:a},null,8,["modelValue"]),V(re,{class:"viewer",code:_(d)},null,8,["code"])])]),_:1}))}});var fe=j(ce,[["__scopeId","data-v-3b9bb52b"]]);export{fe as default};
