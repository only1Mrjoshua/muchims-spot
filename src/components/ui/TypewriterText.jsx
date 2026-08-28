// src/components/ui/TypewriterText.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
  text,
  speed = 50,
  startDelay = 0,
  showCursor = true,
  cursorHideDelay = 0, // ms after completion to hide cursor
  onComplete,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(showCursor);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    setCursorVisible(showCursor);

    let index = 0;
    let intervalId;
    let hideTimeout;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(intervalId);
          setIsDone(true);
          onComplete?.();
          if (cursorHideDelay > 0) {
            hideTimeout = setTimeout(() => {
              setCursorVisible(false);
            }, cursorHideDelay);
          }
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
      clearTimeout(hideTimeout);
    };
  }, [text, speed, startDelay, showCursor, cursorHideDelay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {cursorVisible && showCursor && (
        <motion.span
          animate={{ opacity: isDone ? [1, 0] : 1 }}
          transition={
            isDone
              ? { duration: 0.8, repeat: Infinity, repeatType: 'reverse' }
              : { duration: 0 }
          }
          className="inline-block w-[3px] md:w-[4px] h-[0.9em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
};

export default TypewriterText;