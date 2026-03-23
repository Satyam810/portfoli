import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfter?: number;
  pauseBefore?: number;
}

export function useTypewriter({
  phrases,
  typeSpeed = 75,
  deleteSpeed = 40,
  pauseAfter = 1600,
  pauseBefore = 350,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");

  // Use refs so the loop closure always has the latest values
  const indexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loop = () => {
      const phrase = phrases[indexRef.current];

      if (!isDeletingRef.current) {
        // Typing forward
        charIndexRef.current += 1;
        setDisplayText(phrase.slice(0, charIndexRef.current));

        if (charIndexRef.current >= phrase.length) {
          // Fully typed — pause, then switch to deleting
          isDeletingRef.current = true;
          timerRef.current = setTimeout(loop, pauseAfter);
        } else {
          // Still typing — natural slight variation in speed
          timerRef.current = setTimeout(loop, typeSpeed + Math.random() * 25);
        }
      } else {
        // Deleting
        charIndexRef.current -= 1;
        setDisplayText(phrase.slice(0, charIndexRef.current));

        if (charIndexRef.current <= 0) {
          // Fully deleted — move to next phrase
          isDeletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % phrases.length;
          timerRef.current = setTimeout(loop, pauseBefore);
        } else {
          timerRef.current = setTimeout(loop, deleteSpeed);
        }
      }
    };

    // Kick off the first loop
    timerRef.current = setTimeout(loop, typeSpeed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // Run once on mount — phrases array is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return displayText;
}
