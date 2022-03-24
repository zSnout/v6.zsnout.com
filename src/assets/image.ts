let canvas = document.createElement("canvas");
let context = canvas.getContext("2d")!;

export function blobToImage(blob: Blob) {
  return new Promise<ImageData>((resolve) => {
    let url = URL.createObjectURL(blob);
    let image = document.createElement("img");

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      resolve(context.getImageData(0, 0, image.width, image.height));
    };

    image.src = url;
  });
}

export function streamToVideo(stream: MediaStream) {
  return new Promise<HTMLVideoElement>((resolve) => {
    let video = document.createElement("video");
    video.onload = () => resolve(video);
    video.srcObject = stream;
  });
}

export function captureFrame(video: HTMLVideoElement) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  let context = canvas.getContext("2d")!;
  context.drawImage(video, 0, 0);

  return context.getImageData(0, 0, canvas.width, canvas.height);
}
