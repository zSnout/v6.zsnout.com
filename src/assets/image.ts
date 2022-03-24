let canvas = document.createElement("canvas");
let context = canvas.getContext("2d")!;

export function blobToImage(blob: Blob, width?: number, height?: number) {
  return new Promise<ImageData>((resolve) => {
    let url = URL.createObjectURL(blob);
    let image = document.createElement("img");

    image.onload = () => {
      canvas.width = width || image.width;
      canvas.height = height || image.height;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    };

    image.src = url;
  });
}

export function streamToVideo(stream: MediaStream) {
  return new Promise<HTMLVideoElement>((resolve) => {
    let video = document.createElement("video");

    video.onloadedmetadata = () => resolve(video);
    video.srcObject = stream;
    video.play();
  });
}

export function captureFrame(
  video: HTMLVideoElement,
  width?: number,
  height?: number
) {
  canvas.width = width || video.videoWidth;
  canvas.height = height || video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  return context.getImageData(0, 0, canvas.width, canvas.height);
}
