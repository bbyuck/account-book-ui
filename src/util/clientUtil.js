export const isMobileDevice = () => {
  const uagent = navigator.userAgent.toLowerCase();
  const isTablet =
    /ipad|xoom|sch-i800|(android(?!.*mobile))|playbook|tablet|kindle/i.test(
      uagent
    );
  const isMobile =
    /mobile|iphone|ipod|blackberry|windows\sce|palm|smartphone|iemobile|NOKIA/i.test(
      uagent
    );
  const isSmallScreen = window.matchMedia("(max-width: 800px)").matches;
  const isTouchDevice =
    "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;

  return isTablet || isMobile || (isSmallScreen && isTouchDevice);
};
