// src/components/ui/TypewriterText.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
  text,
  speed = 50,
  startDelay = 0,
  showCursor = true,
  onComplete,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false); // only true while this line is actively animating

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);

    let index = 0;
    let intervalId;

    const startTimeout = setTimeout(() => {
      setIsTyping(true); // cursor appears right as typing starts

      intervalId = setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false); // cursor disappears immediately on completion
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[3px] md:w-[4px] h-[0.9em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
};

export default TypewriterText;