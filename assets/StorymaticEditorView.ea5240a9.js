import{d as A,A as F,r as x,J as I,m as D,o as m,c as y,F as $,f as P,u as h,b as C,G as W,H as z,i as R,n as S,t as T,E as K,B as O,C as H,_ as B,K as U,e as G,v as L,x as J,y as q,l as Y,h as k,L as N,M as j,w as V,D as Q,N as X,j as Z}from"./index.050728da.js";import{s as ee,_ as ne}from"./storymatic.1d675d8e.js";const te=f=>(O("data-v-6f87b757"),f=f(),H(),f),oe={key:0,class:"message select"},re=["disabled","onClick"],ie=te(()=>C("span",{class:"option-cap"},null,-1)),se=["placeholder"],ae=A({__name:"TextConsole",props:{messages:{default:()=>F([])},placeholder:null,root:{type:Boolean}},emits:["enter","field","select"],setup(f,{emit:p}){const{messages:c,root:d}=f;let r=x("");function v(n){n.preventDefault(),r.value.trim()?(c.push({content:r.value.trim(),type:"user"}),p("field",r.value.trim()),r.value=""):p("enter")}let s=x(null);function _(){let n=d?document.documentElement:s.value;return n?n.scrollHeight-n.scrollTop-n.clientHeight<4:!1}function g(){let n=d?document.documentElement:s.value;!n||(n.scrollTop=n.scrollHeight)}function u(n,l){n.selected=l,p("select",n.name,l)}let a=x(null);return I(c,()=>{let n=c[c.length-1];if(n&&n.type=="focus"&&!n.hidden)return setTimeout(()=>{var l;if(n.type=="focus"&&(n.where=="field"&&((l=a.value)==null||l.focus()),n.where=="select")){if(!s.value)return;let i=s.value.getElementsByClassName("select"),b=i[i.length-1].children[0];b==null||b.focus()}});_()&&setTimeout(g)}),D(g),(n,l)=>(m(),y("div",{ref_key:"consoleEl",ref:s,class:S([{root:h(d)},"console"])},[(m(!0),y($,null,P(h(c),(i,b)=>(m(),y($,{key:b},[i.type!="focus"&&!i.hidden?(m(),y($,{key:0},[i.type=="select"?(m(),y("div",oe,[(m(!0),y($,null,P(i.options,(E,e)=>(m(),y("button",{key:e,class:S([{selected:i.selected==e},"option"]),disabled:!!i.selected,onClick:t=>u(i,""+e)},T(E),11,re))),128)),ie])):(m(),y("div",{key:1,class:S([i.type,"message"])},T(i.content),3))],64)):K("",!0)],64))),128)),C("form",{class:"form",onSubmit:v},[W(C("input",{ref_key:"fieldEl",ref:a,"onUpdate:modelValue":l[0]||(l[0]=i=>R(r)?r.value=i:r=i),class:"field",placeholder:f.placeholder},null,8,se),[[z,h(r)]])],32)],2))}});var le=B(ae,[["__scopeId","data-v-6f87b757"]]),ce=`let post = self.postMessage;
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
`;const ue=A({__name:"StorymaticViewer",props:{code:null,autofocus:{type:Boolean}},setup(f){const p=f;let c=x("Send messages to program..."),{autofocus:d}=p,r;function v(e){r&&r(e)}let s;function _(){s&&s()}let g;function u(e,t){g&&g(e,t)}let a=F([]),n=E(p.code,!1);I(U(p,"code"),e=>n=E(e,!0));function l(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="bigint"}function i(e){return e==null?"":l(e)?""+e:typeof e=="function"?`function ${e.name}()`:Array.isArray(e)?e.map(i).filter(t=>t).join(`
`):typeof e=="object"?Object.keys(e).map(t=>`${t}: ${e[t]}`).join(`
`):""}function b({data:e}){if(!(typeof e!="object"||e===null))if(e.type=="print"){let t=i(e.content);if(!t)return;for(let o of t.split(`
`))a.push({type:"info",content:o})}else if(e.type=="input"){let t=n;d&&a.push({type:"focus",where:"field"}),r=o=>{t==n&&(r=void 0,t==null||t.postMessage(o),t=void 0)}}else if(e.type=="menu"){let t=""+Math.random();a.push({name:t,type:"select",options:e.options||{}}),d&&a.push({type:"focus",where:"select"});let o=n;g=(w,M)=>{n==o&&(g=void 0,t==w&&(o==null||o.postMessage(M)),o=void 0)}}else if(e.type=="pause"){let t=n;c.value="Press enter to continue...",d&&a.push({type:"focus",where:"field"});let o=()=>{n==t&&(s=void 0,r=void 0,t==null||t.postMessage(void 0),t=void 0,c.value="Send messages to program...")};s=o,r=o}else e.type=="kill"&&(n==null||n.terminate())}function E(e,t){t&&(n==null||n.terminate()),c.value="Send messages to program...",a.map(o=>o.hidden=!0);try{let o=ce+ee(e),w=new Worker(`data:text/javascript,${o}`,{name:Math.random().toString().slice(2),type:"module"});return w.onmessage=b,w.onerror=M=>{M.preventDefault(),a.push({type:"error",content:M.message})},r=void 0,w}catch(o){a.push({type:"error",content:""+((o==null?void 0:o.message)||o||"An unknown error occurred")})}}return(e,t)=>(m(),G(le,{class:"console",messages:h(a),placeholder:h(c),onEnter:_,onField:v,onSelect:u},null,8,["messages","placeholder"]))}});const de=Z("Run Program"),me={class:"container"},fe=A({__name:"StorymaticEditorView",setup(f){function p(u){try{return btoa(u.replace(/[^\x00-\xff]+/g,"")).replace(/\+/g,"_").replace(/\//g,"-").replace(/=/g,"$")}catch{return""}}function c(u){try{return atob(u.replace(/_/g,"+").replace(/-/g,"/").replace(/\$/g,"="))}catch{return""}}let d;function r(u){d=u,u.commands.addCommand({name:"run",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:v})}function v(){_.value=`#${Math.random()}
${d.getValue()}`}let s=x(c(""+(L().params.code||""))||`# After working on a project, bookmark your page to save your code.

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
`),_=x('"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'),g=setInterval(()=>{J.replace(`/storymatic/${p(s.value)}`)},5e3);return q(()=>clearInterval(g)),(u,a)=>{const n=Y("GlobalEvents");return m(),y($,null,[k(n,{onKeydown:[N(j(v,["ctrl"]),["enter"]),N(j(v,["meta"]),["enter"])]},null,8,["onKeydown"]),k(Q,{"explicit-height":""},{nav:V(()=>[k(X,{onClick:v},{default:V(()=>[de]),_:1})]),default:V(()=>[C("div",me,[k(ne,{modelValue:h(s),"onUpdate:modelValue":a[0]||(a[0]=l=>R(s)?s.value=l:s=l),class:"editor",onInit:r},null,8,["modelValue"]),k(ue,{class:"viewer",code:h(_),autofocus:""},null,8,["code"])])]),_:1})],64)}}});var ye=B(fe,[["__scopeId","data-v-d9bc0e9a"]]);export{ye as default};
