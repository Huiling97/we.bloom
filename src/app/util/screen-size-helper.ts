const getWindowWidth = () => {
  if (window.innerWidth) return window.innerWidth;
  return document && document.documentElement
    ? document.documentElement.clientWidth
    : 0;
};

const isMobile = () => getWindowWidth() <= 767;

export { isMobile };
