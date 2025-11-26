import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let isRegistered = false;

function ensureScrollToRegistered() {
  if (!isRegistered) {
    gsap.registerPlugin(ScrollToPlugin);
    isRegistered = true;
  }
}

export function useSmoothScroll() {
  ensureScrollToRegistered();

  const scrollToElement = (element, options = {}) => {
    if (!element) return;

    const { duration = 2, offset = 0 } = options;

    const targetY =
      element.getBoundingClientRect().top + window.pageYOffset + offset;

    gsap.timeline().to(window, {
      duration: duration,
      scrollTo: { y: targetY, autoKill: true },
      ease: "back.out(.5)",
    });
  };

  return {
    scrollToElement,
  };
}
