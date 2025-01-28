import { useEffect, useState } from "react";

export default function CounterUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [inViewport, setInViewport] = useState(false);

  const handleScroll = () => {
    const element = document.querySelector(".count-text");
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInViewport && !inViewport) {
        setInViewport(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [inViewport]);

  useEffect(() => {
    if (inViewport && count < end) {
      const increment = end / (duration / 10);
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount + increment >= end) {
            clearInterval(interval);
            return end;
          }
          return prevCount + increment;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [inViewport, end, duration, count]);

  return <span className="count-text">{Math.floor(count)}</span>;
}
