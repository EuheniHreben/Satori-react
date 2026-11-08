function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () => reject(new Error("Не удалось загрузить картинку"));

    image.src = src;
  });
}

export default preloadImage;
