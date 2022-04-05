import{g as ne,s as le}from"./cookie.648245ab.js";import{d as oe,o as j,c as Z,w as T,u as B,N as Y,C as se,h as re,b as W,s as ce,e as H,l as fe,y as ue,x as pe,v as P,j as Q}from"./index.07b74596.js";import{W as de}from"./WebGL2Canvas.86799f45.js";import"./FullscreenCanvas.0398e367.js";import"./FullscreenDisplay.3bbbae79.js";let he={"+":2,"-":2,"*":3,"/":3,"**":4,"^":5};function J(a){return a=="("?0:he[a]||1}let ze={"+":"l","-":"l","*":"l","/":"l"};function me(a){return ze[a]||"r"}let ve=["+","-","*","/","^","("];function K(a){return!ve.includes(a)}function ee(a){let i=[],e=!1;for(;;){let t;if(a.length===0)break;(t=a.match(/^\d+(?:\.\d+)?/))?(e&&i.push("**"),e=!0,i.push(+t[0]),a=a.slice(t[0].length)):(t=a.match(/^(sin|cos|tan|exp|log|abs|min|max|rawsqr)/))?(e&&i.push("**"),e=!1,i.push(t[0]),a=a.slice(t[0].length)):(t=a.match(/^(pi|pz|ppz|sz|e|i|c|z)/))?(e&&i.push("**"),e=!0,i.push(t[0]),a=a.slice(t[0].length)):((t=a.match(/^[-+*\/^()]/))&&(e&&t[0]=="("&&i.push("**"),e=!1,t[0]==")"&&(e=!0),i.push(t[0])),a=a.slice(1))}let m=[],l=[],c;for(;c=i.shift();)if(typeof c=="number"||c.match(/^(pi|pz|ppz|sz|e|i|c|z)$/))m.push(c);else if(c==")"){for(;l[l.length-1]!="(";){let p=l[l.length-1];if(!p)return["z"];l.pop(),m.push(p)}if(l.pop()!="(")return["z"];let t=l[l.length-1];if(!t)continue;K(t)&&(l.pop(),m.push(t))}else if(c=="("||K(c))l.push(c);else{let t=c,p;for(;(p=l[l.length-1])&&p!="(";){let u=J(t),d=J(p);if(!(d>u||u==d&&me(t)=="l"))break;m.push((l.pop(),p))}l.push(t)}for(;c=l.pop();){if(c=="("||c==")")return["z"];m.push(c)}return m}function te(a){try{let i=[];for(let e of a)if(typeof e=="number")i.push(`vec2(${e}, 0)`);else if(e=="i")i.push("vec2(0, 1)");else if(e=="pi")i.push("vec2(3.141592653589793, 0)");else if(e=="e")i.push("vec2(2.718281828459045, 0)");else if(e.match(/^(pz|ppz|sz|c|z)$/))i.push(e);else if(e=="+"||e=="-"){let m=i.pop(),l=i.pop();i.push(`${l} ${e} ${m}`)}else if(e=="*"||e=="**"||e=="/"||e=="^"||e=="min"||e=="max"){e=="/"?e="div":e=="^"?e="power":(e=="*"||e=="**")&&(e="mult");let m=i.pop(),l=i.pop();i.push(`${e}(${l}, ${m})`)}else(e=="sin"||e=="cos"||e=="tan"||e=="exp"||e=="log"||e=="abs"||e=="rawsqr")&&i.push(`${e}(${i.pop()})`);return i.length!=1?"z":i[0]}catch{return"z"}}const xe=W("Reset"),ye=oe({props:{shader:null,showResetButton:{type:Boolean},breakpoint:null},emits:["ready"],setup(a,{emit:i}){const e=a;let{showResetButton:m,breakpoint:l}=e,c=`
    #version 300 es
    precision highp float;

    uniform vec2 scale;
    uniform vec2 offset;
    vec2 convert(vec2 pos) {
      return (pos * scale + offset) * vec2(1, -1);
    }
    `,t;function p({gl:d,canvas:s,program:k,render:U}){let[x,N,b,g]=[-2,2,-2,2],X=d.getUniformLocation(k,"scale"),q=d.getUniformLocation(k,"offset");if(!X||!q)return;function V(){let o=(x+N)/2,n=(b+g)/2,r=Math.min(s.width,s.height)/s.width,f=Math.min(s.width,s.height)/s.height;return{xStart:(x-o)/r+o,xEnd:(N-o)/r+o,yStart:(b-n)/f+n,yEnd:(g-n)/f+n}}function A(){let{xStart:o,xEnd:n,yStart:r,yEnd:f}=V(),z=(n-o)/2,v=(f-r)/2;return{scale:[z,v],offset:[o+z,r+v]}}function F(){let{scale:o,offset:n}=A();d.uniform2f(X,...o),d.uniform2f(q,...n),U()}function C(o,n){let{scale:r,offset:f}=A(),z=(o*2-1)*r[0]+f[0],v=((1-n)*2-1)*r[1]+f[1];return[z,v]}function h(o){({xStart:x,xEnd:N,yStart:b,yEnd:g}=o),F()}function I(){return`${x},${N},${b},${g}`.replace(/\./g,"d")}function G(o){let[n,r,f,z]=o.replace(/d/g,".").split(",").map(Number);!isNaN(n)&&!isNaN(r)&&!isNaN(f)&&!isNaN(z)&&h({xStart:n,xEnd:r,yStart:f,yEnd:z})}i("ready",{gl:d,canvas:s,program:k,updateCoords:h,mouseToCoords:C,getCode:I,loadCode:G,getCoords:V,render:F});let D=!1,y=NaN,M=NaN;s.addEventListener("pointerdown",o=>{s.setPointerCapture(o.pointerId),o.button==0&&(D=!0,y=NaN,M=NaN,_=[NaN,NaN],L=[NaN,NaN])}),window.addEventListener("pointerup",o=>{o.button==0&&(D=!1,y=NaN,M=NaN,_=[NaN,NaN],L=[NaN,NaN])});function O(o,n){if(!D)return;if(isNaN(y)||isNaN(M)){y=o,M=n;return}let r=o-y,f=n-M;y=o,M=n;let{xStart:z,xEnd:v,yStart:R,yEnd:w}=V(),E=-(v-z)*r/s.width*devicePixelRatio,S=(w-R)*f/s.height*devicePixelRatio;h({xStart:x+E,xEnd:N+E,yStart:b+S,yEnd:g+S})}function $(o,n,r){let f=N-x,z=g-b,v=s.width/devicePixelRatio,R=s.height/devicePixelRatio,w=Math.min(R,v),E=(o-(v-w)/2)/w,S=(R-n-(R-w)/2)/w;E*=r/100,S*=r/100,h({xStart:x+E*f,xEnd:N-(.01*r-E)*f,yStart:b+S*z,yEnd:g-(.01*r-S)*z})}s.addEventListener("mousemove",({clientX:o,clientY:n})=>O(o,n),{passive:!0});let _=[NaN,NaN],L=[NaN,NaN];s.addEventListener("touchmove",o=>{o.preventDefault();let{touches:n}=o;if(n.length==1){let[{clientX:r,clientY:f}]=n;_=[NaN,NaN],L=[NaN,NaN],O(r,f)}else if(n.length==2){let[{clientX:r,clientY:f},{clientX:z,clientY:v}]=n,[R,w]=_,[E,S]=L;if(isNaN(R)||isNaN(w)||isNaN(E)||isNaN(S)){_=[r,f],L=[z,v];return}let ie=Math.hypot(E-R,S-w),ae=(Math.hypot(z-r,v-f)-ie)/20;$((r+z)/2,(f+v)/2,ae)}},{passive:!1}),s.addEventListener("wheel",o=>{o.preventDefault();let n=-Math.sqrt(Math.abs(o.deltaY))*Math.sign(o.deltaY);$(o.offsetX,o.offsetY,n)},{passive:!1}),s.addEventListener("resize",F),t=()=>h({xStart:-2,xEnd:2,yStart:-2,yEnd:2})}function u(){t==null||t()}return(d,s)=>(j(),Z(de,{breakpoint:B(l),shader:B(c)+a.shader,onReady:p},{nav:T(()=>[B(m)?(j(),Z(Y,{key:0,onClick:s[0]||(s[0]=k=>u&&u())},{default:T(()=>[xe]),_:1})):se("",!0),re(d.$slots,"nav")]),_:3},8,["breakpoint","shader"]))}}),Ne=W("Less Detail"),be=W("More Detail"),ge=W("Equation"),Me=W("Theme"),_e=oe({setup(a){let{params:i}=ce(),{equation:e,coords:m}=i,l=H("sqr(z) + c");try{l.value=te(ee(""+e))}catch{e="z^2+c"}let c=+i.limit||2;(!isFinite(c)||c<0)&&(c=2);let t=+i.iterations||50;(!isFinite(t)||t<5)&&(t=50),t=Math.floor(t);let p=17,u=+i.theme;(!isFinite(u)||u<0||u>=p)&&(u=0),u=Math.floor(u)%p;let d,s,k,U,x;function N({program:C,gl:h,getCode:I,loadCode:G,render:D}){let y=h.getUniformLocation(C,"maxIterations"),M=h.getUniformLocation(C,"colorMode"),O=h.getUniformLocation(C,"limit");h.uniform1i(M,u),h.uniform1i(y,t),h.uniform1f(O,c);function $(){return`/fractal/${encodeURIComponent(""+e)}/${c}/${u}/${t}/${I()}`}let _=Date.now(),L=I();G(""+m),d=()=>{u=(u+1)%p,h.uniform1i(M,u),D(),P.replace($())},s=()=>{try{let o=prompt("Enter an equation to be drawn.",""+e);if(!o)return;l.value=te(ee(o)),e=o}catch{console.log("fail"),l.value="sqr(z) + c",e="z^2+c"}P.replace($()),setTimeout(()=>P.go(0))},k=()=>{t==25?t=50:t<50?t+=5:t+=50,h.uniform1i(y,t),D(),P.replace($())},U=()=>{t==50?t=25:t<10?t=5:t<50?t-=5:t-=50,h.uniform1i(y,t),D(),P.replace($())},x=setInterval(()=>{let o=Date.now();o-_>1e3&&I()!=L&&(_=o,L=I(),P.replace($()))},1e3)}function b(){d&&d()}function g(C){C.preventDefault(),d&&(u+=p-2,u=u%p,d())}function X(){s&&s()}function q(){k&&k()}function V(){U&&U()}function A(){return`
    #define ieq ${l.value}

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

      if(colorMode == 10 || colorMode == 11) {
        z = c;
        for(int i = 0; i < maxIterations; i++) {
          ppz = pz;
          pz = z;
          z = ieq;
        }

        if(colorMode == 11 && z.y <= 0.0)
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

        if (colorMode == 16) {
          if(pos.x >= 0.0 && pos.y < 0.0) {
            sz -= sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y >= 0.0) {
            sz += sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y < 0.0) {
            sz += z.yxx;
          }
        } else if(colorMode == 5 || colorMode == 8) {
          sz -= sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 6 || colorMode == 9) {
          sz += sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 7) {
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
        if(colorMode == 12)
          sz = sin(mult(z, sz)) + cos(sz) + cos(z);
        else if(colorMode == 13)
          sz = sin(sz + z) + cos(sz) + z;
        else if(colorMode == 14)
          sz = cos(mult(sz, z)) + cos(sz) + z;
        else if(colorMode == 15)
          sz = sin(mult(sz, z)) + cos(z);
      }

      return sz;
    }

    float sigmoid(float x) {
      return 1.0 / (1.0 + exp(-x));
    }

    void main() {
      vec2 c = convert(pos);

      if (colorMode >= 12 && colorMode <= 15) {
        vec2 sz = runNewton2(c);
        color = vec4(newtonPalette(atan(sz.y / sz.x)), 1);
        return;
      }

      vec4 res = iterate(c);

      vec3 sz = res.xyz;
      float iterations = res.w;

      float frac = float(iterations) / float(maxIterations);
      if(colorMode == 10 || colorMode == 11) {
        color = vec4(hsl2rgb(vec3(iterations, 1, 0.5)), 1);
      } else if(frac < 1.0 && colorMode == 0) {
        color = vec4(palette(iterations * 0.01), 1);
      } else if(frac < 1.0 && colorMode == 1) {
        float n1 = sin(iterations * 0.1) * 0.5 + 0.5;
        float n2 = cos(iterations * 0.1) * 0.5 + 0.5;
        color = vec4(n1, n2, 1, 1);
      } else if(frac < 1.0 && colorMode == 2) {
        float n1 = sin(iterations * 0.1) * 0.5 + 0.5;
        float n2 = cos(iterations * 0.1) * 0.5 + 0.5;
        color = vec4(n2, n1, n2, 1);
      } else if(frac < 1.0 && colorMode == 3) {
        float n1 = tan(iterations * 0.1) * 0.5 + 0.5;
        float n2 = tan(iterations * 0.1) * 0.5 + 0.5;
        color = vec4(n1, n2, 0.5, 1);
      } else if(colorMode <= 3) {
        color = vec4(0, 0, 0, 1);
      } else if(colorMode == 8 || colorMode == 9) {
        color = vec4(palette(atan(sz.x, sz.y) / 3.14159265359), 1);
      } else {
        sz = abs(sz) / float(iterations);
        vec3 n1 = sin(abs(sz * 5.0)) * 0.45 + 0.5;
        color = vec4(n1, 1);
      }
    }
    `}let F=H(A());return fe(()=>{ne("hasVisitedFractalView")!="1"&&ue("When using a touchscreen, drag your finger to move the image and use two finger pinching to zoom in and out. When using a desktop, click and drag to move the image and scroll on the image to zoom in and out. You may also pinch to zoom on a trackpad.").then(()=>le("hasVisitedFractalView","1"))}),pe(()=>clearInterval(x)),(C,h)=>(j(),Z(ye,{breakpoint:650,shader:B(F),"show-reset-button":"",onReady:N},{nav:T(()=>[Q(Y,{title:"Lowers the amount of detail in the fractal but improves performance.",onClick:V},{default:T(()=>[Ne]),_:1}),Q(Y,{title:"Increases the amount of detail in the fractal but degrades performance.",onClick:q},{default:T(()=>[be]),_:1}),Q(Y,{title:"Changes the equation used to draw the fractal.",onClick:X},{default:T(()=>[ge]),_:1}),Q(Y,{title:`Toggle between ${B(p)} different themes available for our amazing fractals.`,onClick:b,onContextmenu:g},{default:T(()=>[Me]),_:1},8,["title"])]),_:1},8,["shader"]))}});export{_e as default};
