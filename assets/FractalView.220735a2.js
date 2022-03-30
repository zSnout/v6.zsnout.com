import{g as re,s as se}from"./cookie.648245ab.js";import{a as le}from"./modal.550d1a27.js";import{N as q,r as P}from"./index.7f1d6ba5.js";import{W as ne}from"./WebGL2Canvas.60cb8ac6.js";import{d as oe,o as j,c as Z,w as R,u as G,M as ce,r as fe,e as W,L as ue,f as H,q as pe,s as de,j as Q}from"./vendor.f1f2a3c5.js";import"./FullscreenCanvas.a8d688eb.js";import"./FullscreenDisplay.27a29663.js";let he={"+":2,"-":2,"*":3,"/":3,"**":4,"^":5};function J(a){return a=="("?0:he[a]||1}let ze={"+":"l","-":"l","*":"l","/":"l"};function me(a){return ze[a]||"r"}let ve=["+","-","*","/","^","("];function K(a){return!ve.includes(a)}function ee(a){let i=[],e=!1;for(;;){let t;if(a.length===0)break;(t=a.match(/^\d+(?:\.\d+)?/))?(e&&i.push("**"),e=!0,i.push(+t[0]),a=a.slice(t[0].length)):(t=a.match(/^(sin|cos|tan|exp|log|abs|min|max|rawsqr)/))?(e&&i.push("**"),e=!1,i.push(t[0]),a=a.slice(t[0].length)):(t=a.match(/^(pi|pz|ppz|sz|e|i|c|z)/))?(e&&i.push("**"),e=!0,i.push(t[0]),a=a.slice(t[0].length)):((t=a.match(/^[-+*\/^()]/))&&(e&&t[0]=="("&&i.push("**"),e=!1,t[0]==")"&&(e=!0),i.push(t[0])),a=a.slice(1))}let d=[],s=[],c;for(;c=i.shift();)if(typeof c=="number"||c.match(/^(pi|pz|ppz|sz|e|i|c|z)$/))d.push(c);else if(c==")"){for(;s[s.length-1]!="(";){let f=s[s.length-1];if(!f)return["z"];s.pop(),d.push(f)}if(s.pop()!="(")return["z"];let t=s[s.length-1];if(!t)continue;K(t)&&(s.pop(),d.push(t))}else if(c=="("||K(c))s.push(c);else{let t=c,f;for(;(f=s[s.length-1])&&f!="(";){let y=J(t),h=J(f);if(!(h>y||y==h&&me(t)=="l"))break;d.push((s.pop(),f))}s.push(t)}for(;c=s.pop();){if(c=="("||c==")")return["z"];d.push(c)}return d}function te(a){try{let i=[];for(let e of a)if(typeof e=="number")i.push(`vec2(${e}, 0)`);else if(e=="i")i.push("vec2(0, 1)");else if(e=="pi")i.push("vec2(3.141592653589793, 0)");else if(e=="e")i.push("vec2(2.718281828459045, 0)");else if(e.match(/^(pz|ppz|sz|c|z)$/))i.push(e);else if(e=="+"||e=="-"){let d=i.pop(),s=i.pop();i.push(`${s} ${e} ${d}`)}else if(e=="*"||e=="**"||e=="/"||e=="^"||e=="min"||e=="max"){e=="/"?e="div":e=="^"?e="power":(e=="*"||e=="**")&&(e="mult");let d=i.pop(),s=i.pop();i.push(`${e}(${s}, ${d})`)}else(e=="sin"||e=="cos"||e=="tan"||e=="exp"||e=="log"||e=="abs"||e=="rawsqr")&&i.push(`${e}(${i.pop()})`);return i.length!=1?"z":i[0]}catch{return"z"}}const xe=W("Reset"),ye=oe({props:{shader:null,showResetButton:{type:Boolean},breakpoint:null},emits:["ready"],setup(a,{emit:i}){const e=a;let{showResetButton:d,breakpoint:s}=e,c=`
    #version 300 es
    precision highp float;

    uniform vec2 scale;
    uniform vec2 offset;
    vec2 convert(vec2 pos) {
      return (pos * scale + offset) * vec2(1, -1);
    }
    `,t;function f({gl:h,canvas:l,program:k,render:X}){let[N,b,g,w]=[-2,2,-2,2],A=h.getUniformLocation(k,"scale"),O=h.getUniformLocation(k,"offset");if(!A||!O)return;function T(){let o=(N+b)/2,r=(g+w)/2,n=Math.min(l.width,l.height)/l.width,u=Math.min(l.width,l.height)/l.height;return{xStart:(N-o)/n+o,xEnd:(b-o)/n+o,yStart:(g-r)/u+r,yEnd:(w-r)/u+r}}function _(){let{xStart:o,xEnd:r,yStart:n,yEnd:u}=T(),p=(r-o)/2,m=(u-n)/2;return{scale:[p,m],offset:[o+p,n+m]}}function z(){let{scale:o,offset:r}=_();h.uniform2f(A,...o),h.uniform2f(O,...r),X()}function D(o,r){let{scale:n,offset:u}=_(),p=(o*2-1)*n[0]+u[0],m=((1-r)*2-1)*n[1]+u[1];return[p,m]}function $(o){({xStart:N,xEnd:b,yStart:g,yEnd:w}=o),z()}function U(){return`${N},${b},${g},${w}`.replace(/\./g,"d")}function V(o){let[r,n,u,p]=o.replace(/d/g,".").split(",").map(Number);!isNaN(r)&&!isNaN(n)&&!isNaN(u)&&!isNaN(p)&&$({xStart:r,xEnd:n,yStart:u,yEnd:p})}i("ready",{gl:h,canvas:l,program:k,updateCoords:$,mouseToCoords:D,getCode:U,loadCode:V,getCoords:T,render:z});let I=!1,C=NaN,v=NaN;l.addEventListener("pointerdown",o=>{l.setPointerCapture(o.pointerId),o.button==0&&(I=!0,C=NaN,v=NaN,x=[NaN,NaN],B=[NaN,NaN])}),window.addEventListener("pointerup",o=>{o.button==0&&(I=!1,C=NaN,v=NaN,x=[NaN,NaN],B=[NaN,NaN])});function F(o,r){if(!I)return;if(isNaN(C)||isNaN(v)){C=o,v=r;return}let n=o-C,u=r-v;C=o,v=r;let{xStart:p,xEnd:m,yStart:L,yEnd:M}=T(),E=-(m-p)*n/l.width*devicePixelRatio,S=(M-L)*u/l.height*devicePixelRatio;$({xStart:N+E,xEnd:b+E,yStart:g+S,yEnd:w+S})}function Y(o,r,n){let u=b-N,p=w-g,m=l.width/devicePixelRatio,L=l.height/devicePixelRatio,M=Math.min(L,m),E=(o-(m-M)/2)/M,S=(L-r-(L-M)/2)/M;E*=n/100,S*=n/100,$({xStart:N+E*u,xEnd:b-(.01*n-E)*u,yStart:g+S*p,yEnd:w-(.01*n-S)*p})}l.addEventListener("mousemove",({clientX:o,clientY:r})=>F(o,r),{passive:!0});let x=[NaN,NaN],B=[NaN,NaN];l.addEventListener("touchmove",o=>{o.preventDefault();let{touches:r}=o;if(r.length==1){let[{clientX:n,clientY:u}]=r;x=[NaN,NaN],B=[NaN,NaN],F(n,u)}else if(r.length==2){let[{clientX:n,clientY:u},{clientX:p,clientY:m}]=r,[L,M]=x,[E,S]=B;if(isNaN(L)||isNaN(M)||isNaN(E)||isNaN(S)){x=[n,u],B=[p,m];return}let ie=Math.hypot(E-L,S-M),ae=(Math.hypot(p-n,m-u)-ie)/20;Y((n+p)/2,(u+m)/2,ae)}},{passive:!1}),l.addEventListener("wheel",o=>{o.preventDefault();let r=-Math.sqrt(Math.abs(o.deltaY))*Math.sign(o.deltaY);Y(o.offsetX,o.offsetY,r)},{passive:!1}),l.addEventListener("resize",z),t=()=>$({xStart:-2,xEnd:2,yStart:-2,yEnd:2})}function y(){t==null||t()}return(h,l)=>(j(),Z(ne,{breakpoint:G(s),shader:G(c)+a.shader,onReady:f},{nav:R(()=>[G(d)?(j(),Z(q,{key:0,onClick:l[0]||(l[0]=k=>y&&y())},{default:R(()=>[xe]),_:1})):ce("",!0),fe(h.$slots,"nav")]),_:3},8,["breakpoint","shader"]))}}),Ne=W("Less Detail"),be=W("More Detail"),ge=W("Equation"),we=W("Theme"),Re=oe({setup(a){let{params:i}=ue(),{equation:e,coords:d}=i,s=H("sqr(z) + c");try{s.value=te(ee(""+e))}catch{e="z^2+c"}let c=+i.limit||2;(!isFinite(c)||c<0)&&(c=2);let t=+i.iterations||50;(!isFinite(t)||t<5)&&(t=50),t=Math.floor(t);let f=+i.theme;(!isFinite(f)||f<0||f>=14)&&(f=0),f=Math.floor(f)%14;let y,h,l,k,X;function N({program:_,gl:z,getCode:D,loadCode:$,render:U}){let V=z.getUniformLocation(_,"maxIterations"),I=z.getUniformLocation(_,"colorMode"),C=z.getUniformLocation(_,"limit");z.uniform1i(I,f),z.uniform1i(V,t),z.uniform1f(C,c);function v(){return`/fractal/${encodeURIComponent(""+e)}/${c}/${f}/${t}/${D()}`}let F=Date.now(),Y=D();$(""+d),y=()=>{f=(f+1)%14,z.uniform1i(I,f),U(),P.replace(v())},h=()=>{try{let x=prompt("Enter an equation to be drawn.",""+e);if(!x)return;s.value=te(ee(x)),e=x}catch{console.log("fail"),s.value="sqr(z) + c",e="z^2+c"}P.replace(v()),setTimeout(()=>P.go(0))},l=()=>{t==25?t=50:t<50?t+=5:t+=50,z.uniform1i(V,t),U(),P.replace(v())},k=()=>{t==50?t=25:t<10?t=5:t<50?t-=5:t-=50,z.uniform1i(V,t),U(),P.replace(v())},X=setInterval(()=>{let x=Date.now();x-F>1e3&&D()!=Y&&(F=x,Y=D(),P.replace(v()))},1e3)}function b(){y&&y()}function g(){h&&h()}function w(){l&&l()}function A(){k&&k()}function O(){return`
    #define ieq ${s.value}

    precision highp float;
    in vec2 pos;
    out vec4 color;
    uniform int maxIterations;
    uniform int colorMode;
    uniform float limit;
    float pi = 3.1415926535;

    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }

    vec3 palette(float t) {
      float hue = mod(2.0 * t, 1.0);
      return hsl2rgb(vec3(1.0 - hue, 1.0, 0.5));
    }

    vec3 newtonPalette(float t) {
      float hue = t / pi;
      return hsl2rgb(vec3(1.0 - hue, 1.0, 0.5));
    }

    vec2 cube(vec2 a) {
      float x2 = a.x * a.x;
      float y2 = a.y * a.y;
      float d = x2 - y2;
      return vec2(a.x * (d - y2 - y2), a.y * (x2 + x2 + d));
    }

    vec2 sqr(vec2 a) {
      return vec2(a.x * a.x - a.y * a.y, 2.0 * a.x * a.y);
    }

    vec2 rawsqr(vec2 a) {
      return a * a;
    }

    vec2 mult(vec2 a, vec2 b) {
      float x = a.x * b.x - a.y * b.y;
      float y = a.x * b.y + a.y * b.x;
      return vec2(x, y);
    }

    vec2 div(vec2 a, vec2 b) {
      float denom = 1.0 / (b.x * b.x + b.y * b.y);
      return vec2(a.x * b.x + a.y * b.y, a.y * b.x - a.x * b.y) * denom;
    }

    vec2 power(vec2 a, vec2 b) {
      int count = int(b.x);
      if(count <= 1)
        return a;

      vec2 result = a;
      for(int i = 1; i < count; i++) {
        result = mult(result, a);
      }

      return result;
    }

    vec4 iterate(vec2 c) {
      vec2 z, pz, ppz, nz;
      vec3 sz;

      if(colorMode == 7 || colorMode == 8) {
        z = c;
        for(int i = 0; i < maxIterations; i++) {
          ppz = pz;
          pz = z;
          z = ieq;
        }

        if(colorMode == 8 && z.y <= 0.0)
          return vec4(sz, (atan(z.y, z.x) / 3.14159265) + 0.25);
        else
          return vec4(sz, atan(z.y, z.x) / 3.14159265);
      }

      int iterations = 0;
      for(int i = 0; i < maxIterations; i++) {
        ppz = pz;
        pz = z;
        z = ieq;
        iterations++;
        if(length(z) > limit)
          break;

        sz.x += dot(z - pz, pz - ppz);
        sz.y += dot(z - pz, z - pz);
        sz.z += dot(z - ppz, z - ppz);

        if (colorMode == 13) {
          if(pos.x >= 0.0 && pos.y < 0.0) {
            sz -= sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y >= 0.0) {
            sz += sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y < 0.0) {
            sz += z.yxx;
          }
        } else if(colorMode == 2 || colorMode == 5) {
          sz -= sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 3 || colorMode == 6) {
          sz += sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 4) {
          sz += z.yxx;
        }
      }

      return vec4(sz, iterations);
    }

    vec2 runNewton2(vec2 c) {
      vec2 z = vec2(0, 0);
      vec2 sz = vec2(0, 0);
      for(int i = 0; i < maxIterations; i++) {
        z = ieq;
        if(colorMode == 9)
          sz = sin(mult(z, sz)) + cos(sz) + cos(z);
        else if(colorMode == 10)
          sz = sin(sz + z) + cos(sz) + z;
        else if(colorMode == 11)
          sz = cos(mult(sz, z)) + cos(sz) + z;
        else if(colorMode == 12)
          sz = sin(mult(sz, z)) + cos(z);
      }

      return sz;
    }

    void main() {
      vec2 c = convert(pos);

      if (colorMode >= 9 && colorMode <= 12) {
        vec2 sz = runNewton2(c);
        color = vec4(newtonPalette(atan(sz.y / sz.x)), 1);
        return;
      }

      vec4 res = iterate(c);

      vec3 sz = res.xyz;
      float iterations = res.w;

      float frac = float(iterations) / float(maxIterations);
      if(colorMode == 7 || colorMode == 8) {
        color = vec4(hsl2rgb(vec3(iterations, 1, 0.5)), 1);
      } else if(frac < 1.0 && (colorMode == 0)) {
        color = vec4(palette(frac), 1);
      } else if(colorMode == 0) {
        color = vec4(0, 0, 0, 1);
      } else if(colorMode == 5 || colorMode == 6) {
        color = vec4(palette(atan(sz.x, sz.y) / 3.14159265359), 1);
      } else {
        sz = abs(sz) / float(iterations);
        vec3 n1 = sin(abs(sz * 5.0)) * 0.45 + 0.5;
        color = vec4(n1, 1);
      }
    }
    `}let T=H(O());return pe(()=>{re("hasVisitedFractalView")!="1"&&le("When using a touchscreen, drag your finger to move the image and use two finger pinching to zoom in and out. When using a desktop, click and drag to move the image and scroll on the image to zoom in and out. You may also pinch to zoom on a trackpad.").then(()=>se("hasVisitedFractalView","1"))}),de(()=>clearInterval(X)),(_,z)=>(j(),Z(ye,{breakpoint:650,shader:G(T),"show-reset-button":"",onReady:N},{nav:R(()=>[Q(q,{title:"Lowers the amount of detail in the fractal but improves performance.",onClick:A},{default:R(()=>[Ne]),_:1}),Q(q,{title:"Increases the amount of detail in the fractal but degrades performance.",onClick:w},{default:R(()=>[be]),_:1}),Q(q,{title:"Changes the equation used to draw the fractal.",onClick:g},{default:R(()=>[ge]),_:1}),Q(q,{title:"Changes the theme between standard mode, four rainbow mode, two exterior hue modes, and two interior hue modes.",onClick:b},{default:R(()=>[we]),_:1})]),_:1},8,["shader"]))}});export{Re as default};
