// useBreakpoint.js
import { useState, useEffect } from "react";

export const useBreakpoint = (breakpoints = { mobile: 768, tablet: 1024 }) => {
  const getBreakpoint = (width) => {
    if (width < breakpoints.mobile) return "mobile";
    if (width < breakpoints.tablet) return "tablet";
    return "desktop";
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  return breakpoint;
};