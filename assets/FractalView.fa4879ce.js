import{g as ne,s as se}from"./cookie.648245ab.js";import{d as oe,o as j,c as Z,w as I,u as Q,N as F,B as re,h as le,b as Y,s as ce,e as H,l as fe,y as ue,x as pe,v as T,j as O}from"./index.2e82a881.js";import{W as de}from"./WebGL2Canvas.3be0c79d.js";import"./FullscreenCanvas.5cef9451.js";import"./FullscreenDisplay.fb1c5fe6.js";let he={"+":2,"-":2,"*":3,"/":3,"**":4,"^":5};function J(a){return a=="("?0:he[a]||1}let ze={"+":"l","-":"l","*":"l","/":"l"};function me(a){return ze[a]||"r"}let ve=["+","-","*","/","^","("];function K(a){return!ve.includes(a)}function ee(a){let i=[],e=!1;for(;;){let t;if(a.length===0)break;(t=a.match(/^\d+(?:\.\d+)?/))?(e&&i.push("**"),e=!0,i.push(+t[0]),a=a.slice(t[0].length)):(t=a.match(/^(sin|cos|tan|exp|log|abs|min|max|rawsqr)/))?(e&&i.push("**"),e=!1,i.push(t[0]),a=a.slice(t[0].length)):(t=a.match(/^(pi|pz|ppz|sz|e|i|c|z)/))?(e&&i.push("**"),e=!0,i.push(t[0]),a=a.slice(t[0].length)):((t=a.match(/^[-+*\/^()]/))&&(e&&t[0]=="("&&i.push("**"),e=!1,t[0]==")"&&(e=!0),i.push(t[0])),a=a.slice(1))}let m=[],s=[],c;for(;c=i.shift();)if(typeof c=="number"||c.match(/^(pi|pz|ppz|sz|e|i|c|z)$/))m.push(c);else if(c==")"){for(;s[s.length-1]!="(";){let z=s[s.length-1];if(!z)return["z"];s.pop(),m.push(z)}if(s.pop()!="(")return["z"];let t=s[s.length-1];if(!t)continue;K(t)&&(s.pop(),m.push(t))}else if(c=="("||K(c))s.push(c);else{let t=c,z;for(;(z=s[s.length-1])&&z!="(";){let u=J(t),p=J(z);if(!(p>u||u==p&&me(t)=="l"))break;m.push((s.pop(),z))}s.push(t)}for(;c=s.pop();){if(c=="("||c==")")return["z"];m.push(c)}return m}function te(a){try{let i=[];for(let e of a)if(typeof e=="number")i.push(`vec2(${e}, 0)`);else if(e=="i")i.push("vec2(0, 1)");else if(e=="pi")i.push("vec2(3.141592653589793, 0)");else if(e=="e")i.push("vec2(2.718281828459045, 0)");else if(e.match(/^(pz|ppz|sz|c|z)$/))i.push(e);else if(e=="+"||e=="-"){let m=i.pop(),s=i.pop();i.push(`${s} ${e} ${m}`)}else if(e=="*"||e=="**"||e=="/"||e=="^"||e=="min"||e=="max"){e=="/"?e="div":e=="^"?e="power":(e=="*"||e=="**")&&(e="mult");let m=i.pop(),s=i.pop();i.push(`${e}(${s}, ${m})`)}else(e=="sin"||e=="cos"||e=="tan"||e=="exp"||e=="log"||e=="abs"||e=="rawsqr")&&i.push(`${e}(${i.pop()})`);return i.length!=1?"z":i[0]}catch{return"z"}}const xe=Y("Reset"),ye=oe({props:{shader:null,showResetButton:{type:Boolean},breakpoint:null},emits:["ready"],setup(a,{emit:i}){const e=a;let{showResetButton:m,breakpoint:s}=e,c=`
    #version 300 es
    precision highp float;

    uniform vec2 scale;
    uniform vec2 offset;
    vec2 convert(vec2 pos) {
      return (pos * scale + offset) * vec2(1, -1);
    }
    `,t;function z({gl:p,canvas:r,program:k,render:U}){let[x,N,b,g]=[-2,2,-2,2],W=p.getUniformLocation(k,"scale"),X=p.getUniformLocation(k,"offset");if(!W||!X)return;function V(){let o=(x+N)/2,n=(b+g)/2,l=Math.min(r.width,r.height)/r.width,f=Math.min(r.width,r.height)/r.height;return{xStart:(x-o)/l+o,xEnd:(N-o)/l+o,yStart:(b-n)/f+n,yEnd:(g-n)/f+n}}function q(){let{xStart:o,xEnd:n,yStart:l,yEnd:f}=V(),h=(n-o)/2,v=(f-l)/2;return{scale:[h,v],offset:[o+h,l+v]}}function B(){let{scale:o,offset:n}=q();p.uniform2f(W,...o),p.uniform2f(X,...n),U()}function C(o,n){let{scale:l,offset:f}=q(),h=(o*2-1)*l[0]+f[0],v=((1-n)*2-1)*l[1]+f[1];return[h,v]}function d(o){({xStart:x,xEnd:N,yStart:b,yEnd:g}=o),B()}function P(){return`${x},${N},${b},${g}`.replace(/\./g,"d")}function G(o){let[n,l,f,h]=o.replace(/d/g,".").split(",").map(Number);!isNaN(n)&&!isNaN(l)&&!isNaN(f)&&!isNaN(h)&&d({xStart:n,xEnd:l,yStart:f,yEnd:h})}i("ready",{gl:p,canvas:r,program:k,updateCoords:d,mouseToCoords:C,getCode:P,loadCode:G,getCoords:V,render:B});let D=!1,y=NaN,w=NaN;r.addEventListener("pointerdown",o=>{r.setPointerCapture(o.pointerId),o.button==0&&(D=!0,y=NaN,w=NaN,$=[NaN,NaN],L=[NaN,NaN])}),window.addEventListener("pointerup",o=>{o.button==0&&(D=!1,y=NaN,w=NaN,$=[NaN,NaN],L=[NaN,NaN])});function A(o,n){if(!D)return;if(isNaN(y)||isNaN(w)){y=o,w=n;return}let l=o-y,f=n-w;y=o,w=n;let{xStart:h,xEnd:v,yStart:R,yEnd:M}=V(),E=-(v-h)*l/r.width*devicePixelRatio,S=(M-R)*f/r.height*devicePixelRatio;d({xStart:x+E,xEnd:N+E,yStart:b+S,yEnd:g+S})}function _(o,n,l){let f=N-x,h=g-b,v=r.width/devicePixelRatio,R=r.height/devicePixelRatio,M=Math.min(R,v),E=(o-(v-M)/2)/M,S=(R-n-(R-M)/2)/M;E*=l/100,S*=l/100,d({xStart:x+E*f,xEnd:N-(.01*l-E)*f,yStart:b+S*h,yEnd:g-(.01*l-S)*h})}r.addEventListener("mousemove",({clientX:o,clientY:n})=>A(o,n),{passive:!0});let $=[NaN,NaN],L=[NaN,NaN];r.addEventListener("touchmove",o=>{o.preventDefault();let{touches:n}=o;if(n.length==1){let[{clientX:l,clientY:f}]=n;$=[NaN,NaN],L=[NaN,NaN],A(l,f)}else if(n.length==2){let[{clientX:l,clientY:f},{clientX:h,clientY:v}]=n,[R,M]=$,[E,S]=L;if(isNaN(R)||isNaN(M)||isNaN(E)||isNaN(S)){$=[l,f],L=[h,v];return}let ie=Math.hypot(E-R,S-M),ae=(Math.hypot(h-l,v-f)-ie)/20;_((l+h)/2,(f+v)/2,ae)}},{passive:!1}),r.addEventListener("wheel",o=>{o.preventDefault();let n=-Math.sqrt(Math.abs(o.deltaY))*Math.sign(o.deltaY);_(o.offsetX,o.offsetY,n)},{passive:!1}),r.addEventListener("resize",B),t=()=>d({xStart:-2,xEnd:2,yStart:-2,yEnd:2})}function u(){t==null||t()}return(p,r)=>(j(),Z(de,{breakpoint:Q(s),shader:Q(c)+a.shader,onReady:z},{nav:I(()=>[Q(m)?(j(),Z(F,{key:0,onClick:r[0]||(r[0]=k=>u&&u())},{default:I(()=>[xe]),_:1})):re("",!0),le(p.$slots,"nav")]),_:3},8,["breakpoint","shader"]))}}),Ne=Y("Less Detail"),be=Y("More Detail"),ge=Y("Equation"),we=Y("Theme"),$e=oe({setup(a){let{params:i}=ce(),{equation:e,coords:m}=i,s=H("sqr(z) + c");try{s.value=te(ee(""+e))}catch{e="z^2+c"}let c=+i.limit||2;(!isFinite(c)||c<0)&&(c=2);let t=+i.iterations||50;(!isFinite(t)||t<5)&&(t=50),t=Math.floor(t);let z=15,u=+i.theme;(!isFinite(u)||u<0||u>=z)&&(u=0),u=Math.floor(u)%z;let p,r,k,U,x;function N({program:C,gl:d,getCode:P,loadCode:G,render:D}){let y=d.getUniformLocation(C,"maxIterations"),w=d.getUniformLocation(C,"colorMode"),A=d.getUniformLocation(C,"limit");d.uniform1i(w,u),d.uniform1i(y,t),d.uniform1f(A,c);function _(){return`/fractal/${encodeURIComponent(""+e)}/${c}/${u}/${t}/${P()}`}let $=Date.now(),L=P();G(""+m),p=()=>{u=(u+1)%z,d.uniform1i(w,u),D(),T.replace(_())},r=()=>{try{let o=prompt("Enter an equation to be drawn.",""+e);if(!o)return;s.value=te(ee(o)),e=o}catch{console.log("fail"),s.value="sqr(z) + c",e="z^2+c"}T.replace(_()),setTimeout(()=>T.go(0))},k=()=>{t==25?t=50:t<50?t+=5:t+=50,d.uniform1i(y,t),D(),T.replace(_())},U=()=>{t==50?t=25:t<10?t=5:t<50?t-=5:t-=50,d.uniform1i(y,t),D(),T.replace(_())},x=setInterval(()=>{let o=Date.now();o-$>1e3&&P()!=L&&($=o,L=P(),T.replace(_()))},1e3)}function b(){p&&p()}function g(C){C.preventDefault(),p&&(u+=z-2,u=u%z,p())}function W(){r&&r()}function X(){k&&k()}function V(){U&&U()}function q(){return`
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

      if(colorMode == 8 || colorMode == 9) {
        z = c;
        for(int i = 0; i < maxIterations; i++) {
          ppz = pz;
          pz = z;
          z = ieq;
        }

        if(colorMode == 9 && z.y <= 0.0)
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

        if (colorMode == 14) {
          if(pos.x >= 0.0 && pos.y < 0.0) {
            sz -= sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y >= 0.0) {
            sz += sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y < 0.0) {
            sz += z.yxx;
          }
        } else if(colorMode == 3 || colorMode == 6) {
          sz -= sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 4 || colorMode == 7) {
          sz += sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 5) {
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
        if(colorMode == 10)
          sz = sin(mult(z, sz)) + cos(sz) + cos(z);
        else if(colorMode == 11)
          sz = sin(sz + z) + cos(sz) + z;
        else if(colorMode == 12)
          sz = cos(mult(sz, z)) + cos(sz) + z;
        else if(colorMode == 13)
          sz = sin(mult(sz, z)) + cos(z);
      }

      return sz;
    }

    void main() {
      vec2 c = convert(pos);

      if (colorMode >= 10 && colorMode <= 13) {
        vec2 sz = runNewton2(c);
        color = vec4(newtonPalette(atan(sz.y / sz.x)), 1);
        return;
      }

      vec4 res = iterate(c);

      vec3 sz = res.xyz;
      float iterations = res.w;

      float frac = float(iterations) / float(maxIterations);
      if(colorMode == 8 || colorMode == 9) {
        color = vec4(hsl2rgb(vec3(iterations, 1, 0.5)), 1);
      } else if(frac < 1.0 && colorMode == 0) {
        color = vec4(palette(iterations * 0.01), 1);
      } else if(frac < 1.0 && colorMode == 1) {
        float n1 = sin(iterations * 0.1) * 0.5 + 0.5;
        float n2 = cos(iterations * 0.1) * 0.5 + 0.5;
        color = vec4(n1, n2, 1, 1);
      } else if(colorMode == 0 || colorMode == 1) {
        color = vec4(0, 0, 0, 1);
      } else if(colorMode == 6 || colorMode == 7) {
        color = vec4(palette(atan(sz.x, sz.y) / 3.14159265359), 1);
      } else {
        sz = abs(sz) / float(iterations);
        vec3 n1 = sin(abs(sz * 5.0)) * 0.45 + 0.5;
        color = vec4(n1, 1);
      }
    }
    `}let B=H(q());return fe(()=>{ne("hasVisitedFractalView")!="1"&&ue("When using a touchscreen, drag your finger to move the image and use two finger pinching to zoom in and out. When using a desktop, click and drag to move the image and scroll on the image to zoom in and out. You may also pinch to zoom on a trackpad.").then(()=>se("hasVisitedFractalView","1"))}),pe(()=>clearInterval(x)),(C,d)=>(j(),Z(ye,{breakpoint:650,shader:Q(B),"show-reset-button":"",onReady:N},{nav:I(()=>[O(F,{title:"Lowers the amount of detail in the fractal but improves performance.",onClick:V},{default:I(()=>[Ne]),_:1}),O(F,{title:"Increases the amount of detail in the fractal but degrades performance.",onClick:X},{default:I(()=>[be]),_:1}),O(F,{title:"Changes the equation used to draw the fractal.",onClick:W},{default:I(()=>[ge]),_:1}),O(F,{title:"Changes the theme between standard mode, four rainbow mode, two exterior hue modes, and two interior hue modes.",onClick:b,onContextmenu:g},{default:I(()=>[we]),_:1})]),_:1},8,["shader"]))}});export{$e as default};
