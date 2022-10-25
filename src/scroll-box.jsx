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
  font-family: ${props => props.fontFamily || 'consolas'};
`;

export default function ScrollBox({ children, fontFamily, onClick, onMounted, alwaysShowScrollBar = false }) {

  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const [scrollYHide, setScrollYHide] = useState(!alwaysShowScrollBar);

  useEffect(
    () => { alwaysShowScrollBar === true && setScrollYHide(false) }
  , [alwaysShowScrollBar]);

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current && containerRef.current.addEventListener('scroll', handleScroll);
    return () => containerRef.current && containerRef.current.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(
    () => {
      const resizeObserver = new ResizeObserver(() => !alwaysShowScrollBar && setScrollYHide(isNotOverflowY()));
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => resizeObserver.disconnect();
    }
  , []);

  useEffect(() => {
    onMounted && onMounted({ scrollToBottom, scrollToTop });
  }, []);

  useEffect(
    () => { !alwaysShowScrollBar && setScrollYHide(isNotOverflowY()) }
  ,[children]);

  const sliderY = {
    top: containerRef.current? (currentScrollTop/containerRef.current.scrollHeight)*100 : 0,
    height: containerRef.current? (containerRef.current.clientHeight/containerRef.current.scrollHeight)*100 : 0
  }

  return (
    <div style = {{display: 'flex', flexDirection: 'row', height: '100%'}}>
      <div style = {{padding: '8px 6px 8px 16px', height: '100%', flex: 1}}>
        <div style = {{ display: 'flex', flexDirection: 'column', height: '100%'}} >
          <Container className = "terminal"  ref = {containerRef} onClick = {onClick} fontFamily = {fontFamily}>
            {children}
          </Container>
          <div style = {{ height: '10px', width: '100%', background: 'inherit'}}>
              {/* buffer bottom space, Horizonral Scroll Bar will be implemented later */}
          </div>
        </div>
      </div>
      <ScrollBar  thumbPosition = { sliderY.top }
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

  function handleScroll(e) {
    setTimeout(
      () => {
        setCurrentScrollTop(e.target.scrollTop);
        !alwaysShowScrollBar && setScrollYHide(isNotOverflowY());
      }
    , 150);
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
