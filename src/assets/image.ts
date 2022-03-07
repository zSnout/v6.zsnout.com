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
