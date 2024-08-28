export function preloadImage(imgUrl: string) {
  if (imgUrl) {
    // Load image so that it is in browser cache
    let preloadImg = new Image();

    preloadImg.onerror = function () {
      preloadImg.src = imgUrl;
    };

    if (window.devicePixelRatio > 1) {
      preloadImg.src = imgUrl.replace(/(\.[\w\d_-]+)$/i, "_2x$1");
    } else {
      preloadImg.src = imgUrl;
    }
  }
}
