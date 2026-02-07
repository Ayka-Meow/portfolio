import { useEffect, useRef, useState } from "react";

const ScrambleText = ({ texts, interval = 5000, scrambleDuration = 0.8 }) => {
      // useRef: Creates a reference to the HTML element so we can change its text directly
  // This is faster than using state because it doesn't cause re-renders
  const ref = useRef(null);
  // useState: Keeps track of which text we're currently showing (0 = first text, 1 = second text, etc.)
  const [currentIndex, setCurrentIndex] = useState(0);
  // These are the random characters that will appear during the scramble effect
  const chars = "!@#$%^&*!@#$%^&*ABCDEFGHIJKL!@#$%^&*NOPQRSTUVWXY!@#$%^&*Zabcdefghijklmnopq!@#$%^&*rstuvwxyz0123456789!@#$%^&*";
  // FIRST useEffect: Handles the scramble animation
  useEffect(() => {
    const element = ref.current; // Get the actual HTML element
    if (!element) return; // Safety check: if element doesn't exist, stop
     // Get the text we want to reveal (based on currentIndex)
    const targetText = texts[currentIndex];
    const textLength = targetText.length;  // How many letters in the text

    let animationFrame; // Will store the animation ID (so we can cancel it later)
    let startTime = null; // Will record when the animation started
    
    // This function runs many times per second to create the animation
    const scramble = (timestamp) => {
        // First time running? Record the start time
      if (!startTime) startTime = timestamp;
      // Calculate how much time has passed (in milliseconds)
      const elapsed = timestamp - startTime;
      // Calculate progress: 0 = just started, 1 = finished
      // Example: if scrambleDuration is 0.8 seconds (800ms) and 400ms passed, progress = 0.5 (halfway)
      const progress = Math.min(elapsed / (scrambleDuration * 1000), 1);
      // Calculate how many letters should be revealed by now
      // Example: if text is 10 letters and progress is 0.5, reveal 5 letters
      const revealedChars = Math.floor(progress * textLength);
      let result = "";  // This will build the text to display
      
      // Loop through each letter position
      for (let i = 0; i < textLength; i++) {
        if (i < revealedChars) {
            // If this letter should be revealed, use the actual letter
          result += targetText[i];
        } else {
            // If not revealed yet, use a random scrambled character
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      // Update the text on screen
      element.textContent = result;
      // If animation not finished, schedule next frame
      if (progress < 1) {
        animationFrame = requestAnimationFrame(scramble);
      } else {
        // Animation finished! Make sure final text is perfect
        element.textContent = targetText;
      }
    };
    // Start the animation!
    animationFrame = requestAnimationFrame(scramble);
    // Cleanup: Cancel animation if component unmounts or currentIndex changes
    return () => cancelAnimationFrame(animationFrame);
  }, [currentIndex, texts, scrambleDuration]);
 // ^ This runs again whenever currentIndex, texts, or scrambleDuration changes
 // SECOND useEffect: Handles cycling through the texts every 5 seconds
  useEffect(() => {
    // setInterval runs a function repeatedly at a fixed time delay
    const timer = setInterval(() => {
        // Update currentIndex to the next text
      // (prev + 1) % texts.length means: 0→1→2→0→1→2... (loops back to start)
      // Example: if texts.length is 3: 0→1→2→0→1→2...
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval); // Run every 5000ms (5 seconds)
    // Cleanup: Clear the timer when component unmounts
    return () => clearInterval(timer);
  }, [texts.length, interval]);
// ^ This runs again if the number of texts or interval changes

// Render a <span> element with the ref attached
  // The ref lets us access and modify this element directly
  return <span ref={ref}>{texts[currentIndex]}</span>;
};

export default ScrambleText;