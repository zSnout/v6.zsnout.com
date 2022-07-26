import{d as A,A as F,r as w,J as I,m as D,o as p,c as g,F as k,f as P,u as v,b as C,G as W,H as K,i as R,n as S,t as T,E as O,B as H,C as U,_ as B,K as G,e as L,v as z,x as J,y as q,l as Y,h as $,L as N,M as j,w as V,D as Q,N as X,j as Z}from"./index.9f30c162.js";import{s as ee,_ as ne}from"./storymatic.b5186ce6.js";const te=f=>(H("data-v-6f87b757"),f=f(),U(),f),oe={key:0,class:"message select"},se=["disabled","onClick"],ie=te(()=>C("span",{class:"option-cap"},null,-1)),re=["placeholder"],ae=A({__name:"TextConsole",props:{messages:{default:()=>F([])},placeholder:null,root:{type:Boolean}},emits:["enter","field","select"],setup(f,{emit:d}){const{messages:c,root:m}=f;let s=w("");function _(n){n.preventDefault(),s.value.trim()?(c.push({content:s.value.trim(),type:"user"}),d("field",s.value.trim()),s.value=""):d("enter")}let r=w(null);function x(){let n=m?document.documentElement:r.value;return n?n.scrollHeight-n.scrollTop-n.clientHeight<4:!1}function y(){let n=m?document.documentElement:r.value;!n||(n.scrollTop=n.scrollHeight)}function u(n,l){n.selected=l,d("select",n.name,l)}let a=w(null);return I(c,()=>{let n=c[c.length-1];if(n&&n.type=="focus"&&!n.hidden)return setTimeout(()=>{var l;if(n.type=="focus"&&(n.where=="field"&&((l=a.value)==null||l.focus()),n.where=="select")){if(!r.value)return;let i=r.value.getElementsByClassName("select"),h=i[i.length-1].children[0];h==null||h.focus()}});x()&&setTimeout(y)}),D(y),(n,l)=>(p(),g("div",{ref_key:"consoleEl",ref:r,class:S([{root:v(m)},"console"])},[(p(!0),g(k,null,P(v(c),(i,h)=>(p(),g(k,{key:h},[i.type!="focus"&&!i.hidden?(p(),g(k,{key:0},[i.type=="select"?(p(),g("div",oe,[(p(!0),g(k,null,P(i.options,(E,e)=>(p(),g("button",{key:e,class:S([{selected:i.selected==e},"option"]),disabled:!!i.selected,onClick:t=>u(i,""+e)},T(E),11,se))),128)),ie])):(p(),g("div",{key:1,class:S([i.type,"message"])},T(i.content),3))],64)):O("",!0)],64))),128)),C("form",{class:"form",onSubmit:_},[W(C("input",{ref_key:"fieldEl",ref:a,"onUpdate:modelValue":l[0]||(l[0]=i=>R(s)?s.value=i:s=i),class:"field",placeholder:f.placeholder},null,8,re),[[K,v(s)]])],32)],2))}});var le=B(ae,[["__scopeId","data-v-6f87b757"]]),ce=`let post = self.postMessage;
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
`;const ue=A({__name:"StorymaticViewer",props:{code:null,autofocus:{type:Boolean}},setup(f){const d=f;let c=w("Send messages to program..."),{autofocus:m}=d,s;function _(e){s&&s(e)}let r;function x(){r&&r()}let y;function u(e,t){y&&y(e,t)}let a=F([]),n=E(d.code,!1);I(G(d,"code"),e=>n=E(e,!0));function l(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="bigint"}function i(e){return e==null?"":l(e)?""+e:typeof e=="function"?`function ${e.name}()`:Array.isArray(e)?e.map(i).filter(t=>t).join(`
`):typeof e=="object"?Object.keys(e).map(t=>`${t}: ${e[t]}`).join(`
`):""}function h({data:e}){if(!(typeof e!="object"||e===null))if(e.type=="print"){let t=i(e.content);if(!t)return;for(let o of t.split(`
`))a.push({type:"info",content:o})}else if(e.type=="input"){let t=n;m&&a.push({type:"focus",where:"field"}),s=o=>{t==n&&(s=void 0,t==null||t.postMessage(o),t=void 0)}}else if(e.type=="menu"){let t=""+Math.random();a.push({name:t,type:"select",options:e.options||{}}),m&&a.push({type:"focus",where:"select"});let o=n;y=(b,M)=>{n==o&&(y=void 0,t==b&&(o==null||o.postMessage(M)),o=void 0)}}else if(e.type=="pause"){let t=n;c.value="Press enter to continue...",m&&a.push({type:"focus",where:"field"});let o=()=>{n==t&&(r=void 0,s=void 0,t==null||t.postMessage(void 0),t=void 0,c.value="Send messages to program...")};r=o,s=o}else e.type=="kill"&&(n==null||n.terminate())}function E(e,t){t&&(n==null||n.terminate()),c.value="Send messages to program...",a.map(o=>o.hidden=!0);try{let o=ce+ee(e),b=new Worker(`data:text/javascript,${o}`,{name:Math.random().toString().slice(2),type:"module"});return b.onmessage=h,b.onerror=M=>{M.preventDefault(),a.push({type:"error",content:M.message})},s=void 0,b}catch(o){a.push({type:"error",content:""+((o==null?void 0:o.message)||o||"An unknown error occurred")})}}return(e,t)=>(p(),L(le,{class:"console",messages:v(a),placeholder:v(c),onEnter:x,onField:_,onSelect:u},null,8,["messages","placeholder"]))}});const me=Z("Run Program"),pe={class:"container"},fe=A({__name:"StorymaticEditorView",setup(f){function d(u){try{return btoa(u.replace(/[^\x00-\xff]+/g,"")).replace(/\+/g,"_").replace(/\//g,"-").replace(/=/g,"$")}catch{return""}}function c(u){try{return atob(u.replace(/_/g,"+").replace(/-/g,"/").replace(/\$/g,"="))}catch{return""}}let m;function s(u){m=u,u.commands.addCommand({name:"run",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:_})}function _(){x.value=`#${Math.random()}
${m.getValue()}`}let r=w(c(""+(z().params.code||""))||`# After working on a project, bookmark your page to save your code.

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
`),x=w('"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'),y=setInterval(()=>{J.replace(`/storymatic/${d(r.value)}`)},5e3);return q(()=>clearInterval(y)),(u,a)=>{const n=Y("GlobalEvents");return p(),g(k,null,[$(n,{onKeydown:[N(j(_,["ctrl"]),["enter"]),N(j(_,["meta"]),["enter"])]},null,8,["onKeydown"]),$(Q,{"explicit-height":""},{nav:V(()=>[$(X,{onClick:_},{default:V(()=>[me]),_:1})]),default:V(()=>[C("div",pe,[$(ne,{modelValue:v(r),"onUpdate:modelValue":a[0]||(a[0]=l=>R(r)?r.value=l:r=l),class:"editor",onInit:s},null,8,["modelValue"]),$(ue,{class:"viewer",code:v(x),autofocus:""},null,8,["code"])])]),_:1})],64)}}});var ge=B(fe,[["__scopeId","data-v-d9bc0e9a"]]);export{ge as default};
