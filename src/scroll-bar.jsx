"use strict"

import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Slider from './slider';
import ScrollArrow from './scroll-arrow';

const Container = styled.div`
  background: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 6px;
  opacity: ${props => props.$hide? '0' : '.6'};
`;

const ScrollBar = forwardRef(function ScrollBar(props, ref) {

  const {
    showArrow = true,
    thumbPosition,
    thumbHeight,
    thumbColor,
    thumbOpacity,
    hide,
    onClickArrowUp,
    onClickArrowDown,
    requestScroll,
    direction,
  } = props;

  return (
    <Container ref={ref} $hide={hide}>
      {
        showArrow? <ScrollArrow direction = 'up' onClick = {onClickArrowUp} /> : null
      }
      <Slider thumbPosition = {thumbPosition}
              thumbHeight = {thumbHeight}
              thumbColor = {thumbColor}
              thumbOpacity = {thumbOpacity}
              onMouseMove = {requestScroll}
              direction = {direction}
      />
      {
        showArrow? <ScrollArrow direction = 'down' onClick = {onClickArrowDown} /> : null
      }
    </Container>
  );
});

export default ScrollBar;
