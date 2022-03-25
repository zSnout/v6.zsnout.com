<script lang="ts" setup>
  import { alert } from "@/assets/modal";
  import FullscreenCanvas from "@/components/FullscreenCanvas.vue";
  import { createProgram } from "@/components/WebGL2Canvas.vue";
  import { onUnmounted } from "vue";

  let _stream: MediaStream | undefined;

  async function onReady(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext("webgl2")!;
    if (!gl) return;

    let program = createProgram(gl, vertex, shader)!;
    if (!program) return;

    gl.useProgram(program);

    function render(stream: HTMLVideoElement) {
      gl.viewport(0, 0, canvas.width, canvas.height);

      let posAttrLoc = gl.getAttribLocation(program, "a_position");
      let texCoordAttrLoc = gl.getAttribLocation(program, "a_texCoord");

      let resUniformLoc = gl.getUniformLocation(program, "u_resolution");
      let imgUniformLoc = gl.getUniformLocation(program, "u_image");

      let vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      let positionBuffer = gl.createBuffer();
      gl.enableVertexAttribArray(posAttrLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0);

      let texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        ]),
        gl.STATIC_DRAW
      );

      gl.enableVertexAttribArray(texCoordAttrLoc);
      gl.vertexAttribPointer(texCoordAttrLoc, 2, gl.FLOAT, false, 0, 0);
      let texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + 0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        stream
      );

      gl.bindVertexArray(vao);
      gl.uniform2f(resUniformLoc, canvas.width, canvas.height);
      gl.uniform1i(imgUniformLoc, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      let w = stream.videoWidth;
      let h = stream.videoHeight;
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, w, 0, 0, h, 0, h, w, 0, w, h]),
        gl.STATIC_DRAW
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(() => render(stream));
    }

    try {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true });
      let video = document.createElement("video");
      video.srcObject = stream;
      _stream = stream;

      console.log("before");
      await video.play();
      console.log("after");

      _onResize = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };
      _onResize();

      render(video);
    } catch {
      alert(
        "Oops, we weren't able to get camera permissions. Try again later."
      );
    }
  }

  onUnmounted(() => {
    _stream?.getTracks().map((track) => {
      if (track.readyState == "live") track.stop();
    });
  });

  let vertex = `
  #version 300 es

  precision highp float;

  in vec2 _pos;
  in vec2 a_position;
  in vec2 a_texCoord;
  out vec2 v_texCoord;

  uniform vec2 u_resolution;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 clipSpace = zeroToOne * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    v_texCoord = a_texCoord;
  }
  `;

  let shader = `
  #version 300 es

  precision highp float;
  uniform sampler2D u_image;

  in vec2 v_texCoord;
  out vec4 outColor;

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  vec3 rgb2hsl(vec3 c) {
    float h = 0.0;
    float s = 0.0;
    float l = 0.0;
    float r = c.r;
    float g = c.g;
    float b = c.b;
    float cMin = min(r, min(g, b));
    float cMax = max(r, max(g, b));

    l = (cMax + cMin) / 2.0;
    if(cMax > cMin) {
      float cDelta = cMax - cMin;
      s = l < 0.0 ? cDelta / (cMax + cMin) : cDelta / (2.0 - (cMax + cMin));

      if(r == cMax) {
        h = (g - b) / cDelta;
      } else if(g == cMax) {
        h = 2.0 + (b - r) / cDelta;
      } else {
        h = 4.0 + (r - g) / cDelta;
      }

      if(h < 0.0) {
        h += 6.0;
      }
      h = h / 6.0;
    }
    return vec3(h, s, l);
  }

  void main() {
    vec4 image = texture(u_image, v_texCoord);
    vec3 hsl = rgb2hsl(image.rgb);
    vec3 rgb = hsl2rgb(vec3(hsl.x, 1, 0.5));

    if(max(image.r, max(image.g, image.b)) - min(image.r, min(image.g, image.b)) <= 0.03125) {
      float avg = (image.r + image.g + image.b) / 3.0;
      rgb = vec3(avg, avg, avg);
    }

    outColor = vec4(rgb, image.a);
  }
  `;

  let _onResize: (() => void) | undefined;
  function onResize() {
    _onResize?.();
  }
</script>

<template>
  <FullscreenCanvas @ready="onReady" @resize="onResize" />
</template>
