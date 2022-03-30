import{_ as N,r as R,D as B,N as I}from"./index.46aeed2e.js";import{s as O,_ as H}from"./TextConsole.vue_vue_type_style_index_0_scoped_true_lang.fe8b1be2.js";import{d as E,O as F,f as h,i as T,q as L,o as m,a as y,F as w,z as S,n as P,t as A,L as U,u as g,g as C,v as z,x as K,y as j,P as W,c as D,K as q,s as J,w as V,j as k,e as G}from"./vendor.bc10800d.js";const Q={key:0,class:"message select"},X=["disabled","onClick"],Y=["placeholder"],Z=E({props:{messages:{default:()=>F([])},placeholder:null,root:{type:Boolean}},emits:["enter","field","select"],setup(v,{emit:d}){const{messages:c,root:i}=v;let a=h("");function p(n){n.preventDefault(),a.value.trim()?(c.push({content:a.value.trim(),type:"user"}),d("field",a.value.trim()),a.value=""):d("enter")}let l=h(null);function f(){let n=i?document.documentElement:l.value;return n?n.scrollHeight-n.scrollTop-n.clientHeight<4:!1}function _(){let n=i?document.documentElement:l.value;!n||(n.scrollTop=n.scrollHeight)}function o(n,u){n.selected=u,d("select",n.name,u)}return T(c,()=>{f()&&setTimeout(_)}),L(_),(n,u)=>(m(),y("div",{ref_key:"consoleEl",ref:l,class:P([{root:g(i)},"console"])},[(m(!0),y(w,null,S(g(c),(r,M)=>(m(),y(w,{key:M},[r.hidden?U("",!0):(m(),y(w,{key:0},[r.type=="select"?(m(),y("div",Q,[(m(!0),y(w,null,S(r.options,($,e)=>(m(),y("button",{key:e,class:P([{selected:r.selected==e},"option"]),disabled:!!r.selected,onClick:t=>o(r,""+e)},A($),11,X))),128))])):(m(),y("div",{key:1,class:P([r.type,"message"])},A(r.content),3))],64))],64))),128)),C("form",{class:"form",onSubmit:p},[z(C("input",{"onUpdate:modelValue":u[0]||(u[0]=r=>j(a)?a.value=r:a=r),class:"field",placeholder:v.placeholder},null,8,Y),[[K,g(a)]])],32)],2))}});var ee=N(Z,[["__scopeId","data-v-539ea032"]]),ne=`let post = self.postMessage;
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
  runAsync(async () => {
    _print(...messages);

    menu = Object.create(null);
    options = Object.create(null);
    await cb();

    post({ type: "menu", options });
    await menu[await onNextMessage()]?.();
  });
}

function $option(/** @type {any[]} */ [key, value = key] = [], cb = () => {}) {
  options[key] = "" + value;
  menu[key] = cb;
}

export {};
`;const te=E({props:{code:null},setup(v){const d=v;let c=h("Send messages to program..."),i;function a(e){i&&i(e)}let p;function l(){p&&p()}let f;function _(e,t){f&&f(e,t)}let o=F([]),n=$(d.code,!1);T(W(d,"code"),e=>n=$(e,!0));function u(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="bigint"}function r(e){return e==null?"":u(e)?""+e:typeof e=="function"?`function ${e.name}()`:Array.isArray(e)?e.map(r).filter(t=>t).join(`
`):typeof e=="object"?Object.keys(e).map(t=>`${t}: ${e[t]}`).join(`
`):""}function M({data:e}){if(!(typeof e!="object"||e===null))if(e.type=="print"){let t=r(e.content);if(!t)return;for(let s of t.split(`
`))o.push({type:"info",content:s})}else if(e.type=="input"){let t=n;i=s=>{t==n&&(i=void 0,t==null||t.postMessage(s))}}else if(e.type=="menu"){let t=""+Math.random();o.push({name:t,type:"select",options:e.options||{}});let s=n;f=(x,b)=>{n==s&&(f=void 0,t==x&&(s==null||s.postMessage(b)))}}else if(e.type=="pause"){let t=n;c.value="Press enter to continue...";let s=()=>{n==t&&(p=void 0,i=void 0,t==null||t.postMessage(void 0),c.value="Send messages to program...")};p=s,i=s}else e.type=="kill"&&(n==null||n.terminate())}function $(e,t){t&&(n==null||n.terminate()),c.value="Send messages to program...",o.map(s=>s.hidden=!0);try{let s=ne+O(e),x=new Worker(`data:text/javascript,${s}`,{name:Math.random().toString().slice(2),type:"module"});return x.onmessage=M,x.onerror=b=>{b.preventDefault(),o.push({type:"error",content:b.message})},i=void 0,x}catch(s){o.push({type:"error",content:""+((s==null?void 0:s.message)||s||"An unknown error occurred")})}}return(e,t)=>(m(),D(ee,{class:"console",messages:g(o),placeholder:g(c),onEnter:l,onField:a,onSelect:_},null,8,["messages","placeholder"]))}});const se=G("Run Program"),oe={class:"container"},ie=E({setup(v){function d(o){try{return btoa(o.replace(/[^\x00-\xff]+/g,"")).replace(/\+/g,"_").replace(/\//g,"-").replace(/=/g,"$")}catch{return""}}function c(o){try{return atob(o.replace(/_/g,"+").replace(/-/g,"/").replace(/\$/g,"="))}catch{return""}}let i;function a(o){i=o,o.commands.addCommand({name:"run",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:p})}function p(){f.value=i.getValue()}let l=h(c(""+(q().params.code||""))),f=h('"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'),_=setInterval(()=>{R.replace(`/storymatic/${d(l.value)}`)},5e3);return J(()=>clearInterval(_)),(o,n)=>(m(),D(B,{"explicit-height":""},{nav:V(()=>[k(I,{onClick:p},{default:V(()=>[se]),_:1})]),default:V(()=>[C("div",oe,[k(H,{modelValue:g(l),"onUpdate:modelValue":n[0]||(n[0]=u=>j(l)?l.value=u:l=u),class:"editor",onInit:a},null,8,["modelValue"]),k(te,{class:"viewer",code:g(f)},null,8,["code"])])]),_:1}))}});var ce=N(ie,[["__scopeId","data-v-205b96ca"]]);export{ce as default};
