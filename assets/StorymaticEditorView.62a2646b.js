import{_ as j,r as D,D as I,N as B}from"./index.99782872.js";import{s as W,_ as O}from"./storymatic.f4dda5c2.js";import{d as P,O as N,f as x,i as T,q as U,o as m,a as y,F as k,z as S,n as M,t as E,L as z,u as g,g as C,v as H,x as L,y as F,P as q,c as R,K,s as J,w as A,j as V,e as Y}from"./vendor.bc10800d.js";const G={key:0,class:"message select"},Q=["disabled","onClick"],X=["placeholder"],Z=P({props:{messages:{default:()=>N([])},placeholder:null,root:{type:Boolean}},emits:["enter","field","select"],setup(v,{emit:d}){const{messages:c,root:i}=v;let a=x("");function p(n){n.preventDefault(),a.value.trim()?(c.push({content:a.value.trim(),type:"user"}),d("field",a.value.trim()),a.value=""):d("enter")}let l=x(null);function f(){let n=i?document.documentElement:l.value;return n?n.scrollHeight-n.scrollTop-n.clientHeight<4:!1}function _(){let n=i?document.documentElement:l.value;!n||(n.scrollTop=n.scrollHeight)}function s(n,u){n.selected=u,d("select",n.name,u)}return T(c,()=>{f()&&setTimeout(_)}),U(_),(n,u)=>(m(),y("div",{ref_key:"consoleEl",ref:l,class:M([{root:g(i)},"console"])},[(m(!0),y(k,null,S(g(c),(r,w)=>(m(),y(k,{key:w},[r.hidden?z("",!0):(m(),y(k,{key:0},[r.type=="select"?(m(),y("div",G,[(m(!0),y(k,null,S(r.options,(b,e)=>(m(),y("button",{key:e,class:M([{selected:r.selected==e},"option"]),disabled:!!r.selected,onClick:t=>s(r,""+e)},E(b),11,Q))),128))])):(m(),y("div",{key:1,class:M([r.type,"message"])},E(r.content),3))],64))],64))),128)),C("form",{class:"form",onSubmit:p},[H(C("input",{"onUpdate:modelValue":u[0]||(u[0]=r=>F(a)?a.value=r:a=r),class:"field",placeholder:v.placeholder},null,8,X),[[L,g(a)]])],32)],2))}});var ee=j(Z,[["__scopeId","data-v-539ea032"]]),ne=`let post = self.postMessage;
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
`;const te=P({props:{code:null},setup(v){const d=v;let c=x("Send messages to program..."),i;function a(e){i&&i(e)}let p;function l(){p&&p()}let f;function _(e,t){f&&f(e,t)}let s=N([]),n=b(d.code,!1);T(q(d,"code"),e=>n=b(e,!0));function u(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="bigint"}function r(e){return e==null?"":u(e)?""+e:typeof e=="function"?`function ${e.name}()`:Array.isArray(e)?e.map(r).filter(t=>t).join(`
`):typeof e=="object"?Object.keys(e).map(t=>`${t}: ${e[t]}`).join(`
`):""}function w({data:e}){if(!(typeof e!="object"||e===null))if(e.type=="print"){let t=r(e.content);if(!t)return;for(let o of t.split(`
`))s.push({type:"info",content:o})}else if(e.type=="input"){let t=n;i=o=>{t==n&&(i=void 0,t==null||t.postMessage(o),t=void 0)}}else if(e.type=="menu"){let t=""+Math.random();s.push({name:t,type:"select",options:e.options||{}});let o=n;f=(h,$)=>{n==o&&(f=void 0,t==h&&(o==null||o.postMessage($)),o=void 0)}}else if(e.type=="pause"){let t=n;c.value="Press enter to continue...";let o=()=>{n==t&&(p=void 0,i=void 0,t==null||t.postMessage(void 0),t=void 0,c.value="Send messages to program...")};p=o,i=o}else e.type=="kill"&&(n==null||n.terminate())}function b(e,t){t&&(n==null||n.terminate()),c.value="Send messages to program...",s.map(o=>o.hidden=!0);try{let o=ne+W(e),h=new Worker(`data:text/javascript,${o}`,{name:Math.random().toString().slice(2),type:"module"});return h.onmessage=w,h.onerror=$=>{$.preventDefault(),s.push({type:"error",content:$.message})},i=void 0,h}catch(o){s.push({type:"error",content:""+((o==null?void 0:o.message)||o||"An unknown error occurred")})}}return(e,t)=>(m(),R(ee,{class:"console",messages:g(s),placeholder:g(c),onEnter:l,onField:a,onSelect:_},null,8,["messages","placeholder"]))}});const oe=Y("Run Program"),se={class:"container"},ie=P({setup(v){function d(s){try{return btoa(s.replace(/[^\x00-\xff]+/g,"")).replace(/\+/g,"_").replace(/\//g,"-").replace(/=/g,"$")}catch{return""}}function c(s){try{return atob(s.replace(/_/g,"+").replace(/-/g,"/").replace(/\$/g,"="))}catch{return""}}let i;function a(s){i=s,s.commands.addCommand({name:"run",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:p})}function p(){f.value=`#${Math.random()}
${i.getValue()}`}let l=x(c(""+(K().params.code||""))||`# After working on a project, bookmark your page to save your code.

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
`),f=x('"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'),_=setInterval(()=>{D.replace(`/storymatic/${d(l.value)}`)},5e3);return J(()=>clearInterval(_)),(s,n)=>(m(),R(I,{"explicit-height":""},{nav:A(()=>[V(B,{onClick:p},{default:A(()=>[oe]),_:1})]),default:A(()=>[C("div",se,[V(O,{modelValue:g(l),"onUpdate:modelValue":n[0]||(n[0]=u=>F(l)?l.value=u:l=u),class:"editor",onInit:a},null,8,["modelValue"]),V(te,{class:"viewer",code:g(f)},null,8,["code"])])]),_:1}))}});var ce=j(ie,[["__scopeId","data-v-3b9bb52b"]]);export{ce as default};
