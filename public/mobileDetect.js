const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

if (isMobile()) {
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML(
      "beforeend",
      '<link rel="stylesheet" href="./mobile.css" />'
    );
} else {
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML(
      "beforeend",
      '<link rel="stylesheet" href="./browser.css" />'
    );
}
