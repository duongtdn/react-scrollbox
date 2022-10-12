"use strict"

import React, { useEffect, useRef, useState } from 'react';

export default function Slider(props) {

  const {
    thumbPosition,
    thumbHeight,
    thumbColor,
    thumbOpacity,
    onMouseMove,
    direction = 'y',
  } = props;

  const [hold, setHold] = useState(false);

  const lastMousePosition = useRef({x: 0, y: 0});

  const thumbRef = useRef();
  const sliderRef = useRef();

  // using state to control thumb position instead of thumbPosition props
  // for the smooth dragging
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  useEffect(
    () => {
      if (hold === true) {
        return;
      }
      if (direction === 'x') {
        setThumbLeft(thumbPosition)
      } else {
        setThumbTop(thumbPosition)
      }
    }
  , [thumbPosition, hold]);

  return (
    <div  style = {{ flex: 1, position: 'relative' }}
          onMouseUp = { endScroll }
          onMouseLeave = { endScroll }
          onMouseMove = { handleMouseMove }
          ref = {sliderRef}
    >
      <div  style = {{
              width: '100%',
              position: 'absolute',
              top: `${thumbTop}%`,
              left: `${thumbLeft}%`,
              height: `${thumbHeight}%`,
              background: thumbColor,
              opacity: thumbOpacity,
            }}
            ref = {thumbRef}
            onMouseDown = { handleMouseDown }
      />
    </div>
  );

  function handleMouseDown(e) {
    updateLastMousePosition(e);
    setHold(true);
  }

  function endScroll() {
    setHold(false);
  }

  function handleMouseMove(e) {
    if (hold === false) {
      return;
    }
    const newThumbPosition = calculateNewThumbPosition(e);
    setNewThumbPosition(newThumbPosition);
    onMouseMove({ [direction] : newThumbPosition });
    updateLastMousePosition(e);
  }

  function calculateNewThumbPosition(e) {
    const mouseOffset = e[`client${direction.toUpperCase()}`] - lastMousePosition.current[direction];
    const currentThumbPossion = direction === 'x'? thumbLeft : thumbTop;
    const sliderSize = sliderRef.current.getBoundingClientRect()[direction === 'x'? 'width' : 'height'];
    const calculatedThumbPosition = currentThumbPossion + mouseOffset * 100 / sliderSize;
    if (calculatedThumbPosition < 0) {
      return 0;
    }
    const thumbSize = thumbRef.current.getBoundingClientRect()[direction === 'x'? 'width' : 'height'];
    const endBoundarySizeInPercentage = thumbSize * 100 / sliderSize;
    if (calculatedThumbPosition + endBoundarySizeInPercentage > 100) {
      return 100 - endBoundarySizeInPercentage;
    }
    return calculatedThumbPosition;
  }

  function setNewThumbPosition(newThumbPosition) {
    if (direction === 'x') {
      setThumbLeft(newThumbPosition);
    } else {
      setThumbTop(newThumbPosition);
    }
  }

  function updateLastMousePosition(e) {
    lastMousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    }
  }

};
