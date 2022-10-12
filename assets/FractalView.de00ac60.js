import{g as re,s as ne}from"./cookie.648245ab.js";import{d as oe,o as j,c as Z,w as T,u as W,N as U,b as Y,C as le,h as se,e as H,l as ce,y as fe,x as ue,j as Q,s as pe,v as P}from"./index.6ca718b5.js";import{W as de}from"./WebGL2Canvas.aa5f6f22.js";import"./FullscreenCanvas.80f6c1f8.js";import"./FullscreenDisplay.4d86b959.js";let he={"+":2,"-":2,"*":3,"/":3,"**":4,"^":5};function J(r){return r=="("?0:he[r]||1}let ze={"+":"l","-":"l","*":"l","/":"l"};function me(r){return ze[r]||"r"}let ve=["+","-","*","/","^","("];function K(r){return!ve.includes(r)}function ee(r){let i=[],e=!1;for(;;){let t;if(r.length===0)break;(t=r.match(/^\d+(?:\.\d+)?/))?(e&&i.push("**"),e=!0,i.push(+t[0]),r=r.slice(t[0].length)):(t=r.match(/^(sin|cos|tan|exp|log|abs|min|max|rawsqr)/))?(e&&i.push("**"),e=!1,i.push(t[0]),r=r.slice(t[0].length)):(t=r.match(/^(pi|pz|ppz|sz|e|i|c|z)/))?(e&&i.push("**"),e=!0,i.push(t[0]),r=r.slice(t[0].length)):((t=r.match(/^[-+*\/^()]/))&&(e&&t[0]=="("&&i.push("**"),e=!1,t[0]==")"&&(e=!0),i.push(t[0])),r=r.slice(1))}let m=[],n=[],f;for(;f=i.shift();)if(typeof f=="number"||f.match(/^(pi|pz|ppz|sz|e|i|c|z)$/))m.push(f);else if(f==")"){for(;n[n.length-1]!="(";){let d=n[n.length-1];if(!d)return["z"];n.pop(),m.push(d)}if(n.pop()!="(")return["z"];let t=n[n.length-1];if(!t)continue;K(t)&&(n.pop(),m.push(t))}else if(f=="("||K(f))n.push(f);else{let t=f,d;for(;(d=n[n.length-1])&&d!="(";){let u=J(t),h=J(d);if(!(h>u||u==h&&me(t)=="l"))break;m.push((n.pop(),d))}n.push(t)}for(;f=n.pop();){if(f=="("||f==")")return["z"];m.push(f)}return m}function te(r){try{let i=[];for(let e of r)if(typeof e=="number")i.push(`vec2(${e}, 0)`);else if(e=="i")i.push("vec2(0, 1)");else if(e=="pi")i.push("vec2(3.141592653589793, 0)");else if(e=="e")i.push("vec2(2.718281828459045, 0)");else if(e.match(/^(pz|ppz|sz|c|z)$/))i.push(e);else if(e=="+"||e=="-"){let m=i.pop(),n=i.pop();i.push(`${n} ${e} ${m}`)}else if(e=="*"||e=="**"||e=="/"||e=="^"||e=="min"||e=="max"){e=="/"?e="div":e=="^"?e="power":(e=="*"||e=="**")&&(e="mult");let m=i.pop(),n=i.pop();i.push(`${e}(${n}, ${m})`)}else(e=="sin"||e=="cos"||e=="tan"||e=="exp"||e=="log"||e=="abs"||e=="rawsqr")&&i.push(`${e}(${i.pop()})`);return i.length!=1?"z":i[0]}catch{return"z"}}const xe=oe({__name:"CoordinateCanvas",props:{shader:null,showResetButton:{type:Boolean},breakpoint:null,preserveDrawingBuffer:{type:Boolean}},emits:["ready"],setup(r,{emit:i}){const e=r;let{showResetButton:m,breakpoint:n}=e,f=`
    #version 300 es
    precision highp float;

    uniform vec2 scale;
    uniform vec2 offset;
    vec2 convert(vec2 pos) {
      return (pos * scale + offset) * vec2(1, -1);
    }
    `,t;function d({gl:h,canvas:s,program:C,render:B}){let[x,N,y,g]=[-2,2,-2,2],X=h.getUniformLocation(C,"scale"),q=h.getUniformLocation(C,"offset");if(!X||!q)return;function V(){let o=(x+N)/2,a=(y+g)/2,l=Math.min(s.width,s.height)/s.width,c=Math.min(s.width,s.height)/s.height;return{xStart:(x-o)/l+o,xEnd:(N-o)/l+o,yStart:(y-a)/c+a,yEnd:(g-a)/c+a}}function A(){let{xStart:o,xEnd:a,yStart:l,yEnd:c}=V(),p=(a-o)/2,v=(c-l)/2;return{scale:[p,v],offset:[o+p,l+v]}}function F(){let{scale:o,offset:a}=A();h.uniform2f(X,...o),h.uniform2f(q,...a),B()}function $(o,a){let{scale:l,offset:c}=A(),p=(o*2-1)*l[0]+c[0],v=((1-a)*2-1)*l[1]+c[1];return[p,v]}function z(o){({xStart:x,xEnd:N,yStart:y,yEnd:g}=o),F()}function I(){return`${x},${N},${y},${g}`.replace(/\./g,"d")}function G(o){let[a,l,c,p]=o.replace(/d/g,".").split(",").map(Number);!isNaN(a)&&!isNaN(l)&&!isNaN(c)&&!isNaN(p)&&z({xStart:a,xEnd:l,yStart:c,yEnd:p})}i("ready",{gl:h,canvas:s,program:C,updateCoords:z,mouseToCoords:$,getCode:I,loadCode:G,getCoords:V,render:F,zoom:(o,a,l)=>{let c=(o-x)/(N-x),p=(a-y)/(g-y);M(c,p,l)}});let D=!1,b=NaN,w=NaN;s.addEventListener("pointerdown",o=>{s.setPointerCapture(o.pointerId),o.button==0&&(D=!0,b=NaN,w=NaN,L=[NaN,NaN],_=[NaN,NaN])}),window.addEventListener("pointerup",o=>{o.button==0&&(D=!1,b=NaN,w=NaN,L=[NaN,NaN],_=[NaN,NaN])});function O(o,a){if(!D)return;if(isNaN(b)||isNaN(w)){b=o,w=a;return}let l=o-b,c=a-w;b=o,w=a;let{xStart:p,xEnd:v,yStart:R,yEnd:E}=V(),S=-(v-p)*l/s.width*devicePixelRatio,k=(E-R)*c/s.height*devicePixelRatio;z({xStart:x+S,xEnd:N+S,yStart:y+k,yEnd:g+k})}function M(o,a,l){let c=N-x,p=g-y,v=s.width/devicePixelRatio,R=s.height/devicePixelRatio,E=Math.min(R,v),S=(o-(v-E)/2)/E,k=(R-a-(R-E)/2)/E;S*=l/100,k*=l/100,z({xStart:x+S*c,xEnd:N-(.01*l-S)*c,yStart:y+k*p,yEnd:g-(.01*l-k)*p})}s.addEventListener("mousemove",({clientX:o,clientY:a})=>O(o,a),{passive:!0});let L=[NaN,NaN],_=[NaN,NaN];s.addEventListener("touchmove",o=>{o.preventDefault();let{touches:a}=o;if(a.length==1){let[{clientX:l,clientY:c}]=a;L=[NaN,NaN],_=[NaN,NaN],O(l,c)}else if(a.length==2){let[{clientX:l,clientY:c},{clientX:p,clientY:v}]=a,[R,E]=L,[S,k]=_;if(isNaN(R)||isNaN(E)||isNaN(S)||isNaN(k)){L=[l,c],_=[p,v];return}let ie=Math.hypot(S-R,k-E),ae=(Math.hypot(p-l,v-c)-ie)/20;M((l+p)/2,(c+v)/2,ae)}},{passive:!1}),s.addEventListener("wheel",o=>{o.preventDefault();let a=-Math.sqrt(Math.abs(o.deltaY))*Math.sign(o.deltaY);M(o.offsetX,o.offsetY,a)},{passive:!1}),s.addEventListener("resize",F),t=()=>z({xStart:-2,xEnd:2,yStart:-2,yEnd:2})}function u(){t==null||t()}return(h,s)=>(j(),Z(de,{breakpoint:W(n),"preserve-drawing-buffer":r.preserveDrawingBuffer,shader:W(f)+r.shader,onReady:d},{nav:T(()=>[W(m)?(j(),Z(U,{key:0,onClick:s[0]||(s[0]=C=>u&&u())},{default:T(()=>[Y("Reset")]),_:1})):le("",!0),se(h.$slots,"nav")]),_:3},8,["breakpoint","preserve-drawing-buffer","shader"]))}}),Ee=oe({__name:"FractalView",setup(r){let{params:i}=pe(),{equation:e,coords:m}=i,n=H("sqr(z) + c");try{n.value=te(ee(""+e))}catch{e="z^2+c"}let f=+i.limit||2;(!isFinite(f)||f<0)&&(f=2);let t=+i.iterations||50;(!isFinite(t)||t<5)&&(t=50),t=Math.floor(t);let d=17,u=+i.theme;(!isFinite(u)||u<0||u>=d)&&(u=0),u=Math.floor(u)%d;let h,s,C,B,x;function N({program:$,gl:z,getCode:I,loadCode:G,render:D}){let b=z.getUniformLocation($,"maxIterations"),w=z.getUniformLocation($,"colorMode"),O=z.getUniformLocation($,"limit");z.uniform1i(w,u),z.uniform1i(b,t),z.uniform1f(O,f);function M(){return`/fractal/${encodeURIComponent(""+e)}/${f}/${u}/${t}/${I()}`}let L=Date.now(),_=I();G(""+m),h=()=>{u=(u+1)%d,z.uniform1i(w,u),D(),P.replace(M())},s=()=>{try{let o=prompt("Enter an equation to be drawn.",""+e);if(!o)return;n.value=te(ee(o)),e=o}catch{console.log("fail"),n.value="sqr(z) + c",e="z^2+c"}P.replace(M()),setTimeout(()=>P.go(0))},C=()=>{t==25?t=50:t<50?t+=5:t+=50,z.uniform1i(b,t),D(),P.replace(M())},B=()=>{t==50?t=25:t<10?t=5:t<50?t-=5:t-=50,z.uniform1i(b,t),D(),P.replace(M())},x=setInterval(()=>{let o=Date.now();o-L>1e3&&I()!=_&&(L=o,_=I(),P.replace(M()))},1e3)}function y(){h&&h()}function g($){$.preventDefault(),h&&(u+=d-2,u=u%d,h())}function X(){s&&s()}function q(){C&&C()}function V(){B&&B()}function A(){return`
    #define ieq ${n.value}

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
    `}let F=H(A());return ce(()=>{re("hasVisitedFractalView")!="1"&&fe("When using a touchscreen, drag your finger to move the image and use two finger pinching to zoom in and out. When using a desktop, click and drag to move the image and scroll on the image to zoom in and out. You may also pinch to zoom on a trackpad.").then(()=>ne("hasVisitedFractalView","1"))}),ue(()=>clearInterval(x)),($,z)=>(j(),Z(xe,{breakpoint:650,shader:W(F),"preserve-drawing-buffer":"","show-reset-button":"",onReady:N},{nav:T(()=>[Q(U,{title:"Lowers the amount of detail in the fractal but improves performance.",onClick:V},{default:T(()=>[Y("Less Detail")]),_:1}),Q(U,{title:"Increases the amount of detail in the fractal but degrades performance.",onClick:q},{default:T(()=>[Y("More Detail")]),_:1}),Q(U,{title:"Changes the equation used to draw the fractal.",onClick:X},{default:T(()=>[Y("Equation")]),_:1}),Q(U,{title:`Toggle between ${W(d)} different themes available for our amazing fractals.`,onClick:y,onContextmenu:g},{default:T(()=>[Y("Theme")]),_:1},8,["title"])]),_:1},8,["shader"]))}});export{Ee as default};
