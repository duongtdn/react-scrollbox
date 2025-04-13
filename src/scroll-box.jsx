"use strict"

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ScrollBar from './scroll-bar';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function ScrollBox({ children, onClick, onMounted, onScroll, alwaysShowScrollBar = false }) {

  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const [scrollYHide, setScrollYHide] = useState(!alwaysShowScrollBar);
  const [sliderY, setSliderY] = useState({ top: 0, height: 0 });
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  useEffect(
    () => { alwaysShowScrollBar === true && setScrollYHide(false) }
  , [alwaysShowScrollBar]);

  const containerRef = useRef();
  const scrollBarRef = useRef();

  useEffect(() => {
    containerRef.current && containerRef.current.addEventListener('scroll', handleScroll);
    return () => containerRef.current && containerRef.current.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(
    () => {
      const handleContainerResizer = () => {
        !alwaysShowScrollBar && setScrollYHide(isNotOverflowY());
        setSliderY(calculateSliderY());
      };
      const resizeObserver = new ResizeObserver(handleContainerResizer);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => resizeObserver.disconnect();
    }
  , []);

  useEffect(() => {
    onMounted && onMounted({ scrollToBottom, scrollToTop, rerenderScrollBar });
  }, []);

  useEffect(
    () => { !alwaysShowScrollBar && setScrollYHide(isNotOverflowY()) }
  ,[children]);

  useEffect(
    () => { containerRef.current && setSliderY(calculateSliderY()); }
  , [containerRef.current, currentScrollTop])

  useEffect(() => {
    if (scrollBarRef.current) {
      // Get the actual width of the scrollbar including padding
      const width = scrollBarRef.current.getBoundingClientRect().width;
      setScrollBarWidth(width);
    }
  }, [scrollBarRef.current]);

  // Calculate the main content width based on scrollbar width
  const mainContentStyle = {
    width: scrollBarWidth ? `calc(100% - ${scrollBarWidth}px)` : '100%',
    height: '100%',
    padding: '8px 6px 8px 16px'
  };

  return (
    <div style = {{display: 'flex', flexDirection: 'row', height: '100%'}}>
      <div style = {mainContentStyle}>
        <div style = {{ display: 'flex', flexDirection: 'column', height: '100%'}} >
          <Container className = "terminal"  ref = {containerRef} onClick = {onClick} >
            {children}
          </Container>
          <div style = {{ height: '10px', width: '100%', background: 'inherit'}}>
              {/* buffer bottom space, Horizonral Scroll Bar will be implemented later */}
          </div>
        </div>
      </div>
      <ScrollBar  ref = {scrollBarRef}
                  thumbPosition = { sliderY.top }
                  thumbHeight = { sliderY.height }
                  thumbColor = '#2196F3'  // TODO: prop to be customizable
                  thumbOpacity = '.3'     // TODO: prop to be customizable
                  hide = {scrollYHide}
                  onClickArrowUp = {() => stepScrollY(-10)}
                  onClickArrowDown = {() => stepScrollY(10)}
                  requestScroll = { requestScrollY }
                  direction = 'y'
      />
    </div>
  );

  function calculateSliderY() {
    return {
      top: containerRef.current? (currentScrollTop/containerRef.current.scrollHeight)*100 : 0,
      height: containerRef.current? (containerRef.current.clientHeight/containerRef.current.scrollHeight)*100 : 0
    };
  }

  function stepScrollY(value) {
    const calculatedTopAfterScroll = currentScrollTop + value;
    containerRef.current && containerRef.current.scroll({
      top: calculatedTopAfterScroll > 0? calculatedTopAfterScroll : 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function scrollToBottom() {
    containerRef.current && containerRef.current.scroll({
      top: containerRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  function scrollToTop() {
    containerRef.current && containerRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function rerenderScrollBar() {
    setSliderY(calculateSliderY());
  }

  function handleScroll(e) {
    const SCROLL_DELAY = 150;
    setTimeout(
      () => {
        setCurrentScrollTop(e.target.scrollTop);
        !alwaysShowScrollBar && setScrollYHide(isNotOverflowY());
        onScroll && onScroll()
      }
    , SCROLL_DELAY);
  }

  function requestScrollY(position) {
    containerRef.current && containerRef.current.scroll({
      top: (position.y * containerRef.current.scrollHeight)/100,
      left: 0,
    });
  }

  function isOverflowY() {
    const el = containerRef.current;
    return el && (el.clientHeight < el.scrollHeight) || false;
  }

  function isNotOverflowY() {
    return !isOverflowY();
  }

}
