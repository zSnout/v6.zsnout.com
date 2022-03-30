import{_ as N,r as D,D as B,N as I}from"./index.986efaa6.js";import{s as O,_ as H}from"./TextConsole.vue_vue_type_style_index_0_scoped_true_lang.3a20700a.js";import{d as C,O as F,f as h,i as R,q as L,o as m,a as y,F as w,z as E,n as P,t as S,L as U,u as g,g as A,v as z,x as K,y as T,P as W,c as j,K as q,s as J,w as V,j as k,e as G}from"./vendor.bc10800d.js";const Q={key:0,class:"message select"},X=["disabled","onClick"],Y=["placeholder"],Z=C({props:{messages:{default:()=>F([])},placeholder:null,root:{type:Boolean}},emits:["enter","field","select"],setup(v,{emit:d}){const{messages:c,root:i}=v;let a=h("");function p(e){e.preventDefault(),a.value.trim()?(c.push({content:a.value.trim(),type:"user"}),d("field",a.value.trim()),a.value=""):d("enter")}let l=h(null);function f(){let e=i?document.documentElement:l.value;return e?e.scrollHeight-e.scrollTop-e.clientHeight<4:!1}function _(){let e=i?document.documentElement:l.value;!e||(e.scrollTop=e.scrollHeight)}function o(e,u){e.selected=u,d("select",e.name,u)}return R(c,()=>{f()&&setTimeout(_)}),L(_),(e,u)=>(m(),y("div",{ref_key:"consoleEl",ref:l,class:P([{root:g(i)},"console"])},[(m(!0),y(w,null,E(g(c),(r,M)=>(m(),y(w,{key:M},[r.hidden?U("",!0):(m(),y(w,{key:0},[r.type=="select"?(m(),y("div",Q,[(m(!0),y(w,null,E(r.options,($,n)=>(m(),y("button",{key:n,class:P([{selected:r.selected==n},"option"]),disabled:!!r.selected,onClick:t=>o(r,""+n)},S($),11,X))),128))])):(m(),y("div",{key:1,class:P([r.type,"message"])},S(r.content),3))],64))],64))),128)),A("form",{class:"form",onSubmit:p},[z(A("input",{"onUpdate:modelValue":u[0]||(u[0]=r=>T(a)?a.value=r:a=r),class:"field",placeholder:v.placeholder},null,8,Y),[[K,g(a)]])],32)],2))}});var nn=N(Z,[["__scopeId","data-v-539ea032"]]),en=`let post = self.postMessage;
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
`;const tn=C({props:{code:null},setup(v){const d=v;let c=h("Send messages to program..."),i;function a(n){i&&i(n)}let p;function l(){p&&p()}let f;function _(n,t){f&&f(n,t)}let o=F([]),e=$(d.code,!1);R(W(d,"code"),n=>e=$(n,!0));function u(n){return typeof n=="string"||typeof n=="number"||typeof n=="boolean"||typeof n=="bigint"}function r(n){return n==null?"":u(n)?""+n:typeof n=="function"?`function ${n.name}()`:Array.isArray(n)?n.map(r).filter(t=>t).join(`
`):typeof n=="object"?Object.keys(n).map(t=>`${t}: ${n[t]}`).join(`
`):""}function M({data:n}){if(!(typeof n!="object"||n===null))if(n.type=="print"){let t=r(n.content);if(!t)return;for(let s of t.split(`
`))o.push({type:"info",content:s})}else if(n.type=="input"){let t=e;i=s=>{t==e&&(i=void 0,t==null||t.postMessage(s))}}else if(n.type=="menu"){let t=""+Math.random();o.push({name:t,type:"select",options:n.options||{}});let s=e;f=(x,b)=>{e==s&&(f=void 0,t==x&&(s==null||s.postMessage(b)))}}else if(n.type=="pause"){let t=e;c.value="Press enter to continue...";let s=()=>{e==t&&(p=void 0,i=void 0,t==null||t.postMessage(void 0),c.value="Send messages to program...")};p=s,i=s}else n.type=="kill"&&(e==null||e.terminate())}function $(n,t){t&&(e==null||e.terminate()),c.value="Send messages to program...",o.map(s=>s.hidden=!0);try{let s=en+O(n),x=new Worker(`data:text/javascript,${s}`,{name:Math.random().toString().slice(2),type:"module"});return x.onmessage=M,x.onerror=b=>{b.preventDefault(),o.push({type:"error",content:b.message})},i=void 0,x}catch(s){o.push({type:"error",content:""+((s==null?void 0:s.message)||s||"An unknown error occurred")})}}return(n,t)=>(m(),j(nn,{class:"console",messages:g(o),placeholder:g(c),onEnter:l,onField:a,onSelect:_},null,8,["messages","placeholder"]))}});const sn=G("Run Program"),on={class:"container"},rn=C({setup(v){function d(o){try{return btoa(o.replace(/[^\x00-\xff]+/g,"")).replace(/\+/g,"_").replace(/\//g,"-").replace(/=/g,"$")}catch{return""}}function c(o){try{return atob(o.replace(/_/g,"+").replace(/-/g,"/").replace(/\$/g,"="))}catch{return""}}let i;function a(o){i=o,o.commands.addCommand({name:"run",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:p})}function p(){f.value=i.getValue()}let l=h(c(""+(q().params.code||""))),f=h('"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'),_=setInterval(()=>{D.replace(`/storymatic/${d(l.value)}`)},5e3);return J(()=>clearInterval(_)),(o,e)=>(m(),j(B,{"explicit-height":""},{nav:V(()=>[k(I,{onClick:p},{default:V(()=>[sn]),_:1})]),default:V(()=>[A("div",on,[k(H,{modelValue:g(l),"onUpdate:modelValue":e[0]||(e[0]=u=>T(l)?l.value=u:l=u),class:"editor",onInit:a},null,8,["modelValue"]),k(tn,{class:"viewer",code:g(f)},null,8,["code"])])]),_:1}))}});var un=N(rn,[["__scopeId","data-v-205b96ca"]]);export{un as default};
