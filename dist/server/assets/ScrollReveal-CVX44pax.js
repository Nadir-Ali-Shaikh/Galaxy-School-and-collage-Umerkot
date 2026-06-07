import { jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  duration = 750,
  // ms
  delay = 0
  // ms
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
      // trigger slightly before fully on-screen
    );
    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);
  const getAnimationClasses = () => {
    switch (animation) {
      case "fade-up":
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
      case "fade-in":
        return isVisible ? "opacity-100" : "opacity-0";
      case "scale-in":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
      case "slide-left":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
      case "slide-right":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8";
      default:
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: elementRef,
      className: `transition-all ${getAnimationClasses()} ${className}`,
      style: {
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        // ultra-smooth easeOutExpo timing
        willChange: "transform, opacity"
      },
      children
    }
  );
}
export {
  ScrollReveal as S
};
