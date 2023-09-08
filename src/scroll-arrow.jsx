"use strict"

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { styled } from 'styled-components';

const icons = {
  up: faCaretUp,
  down: faCaretDown,
};

const Btn = styled.div`
  text-align: center;
  cursor: pointer;
  transition: opacity 0s;
  &: active { opacity: 0.5; }
`

export default function ScrollArrow(props) {

  const { direction, onClick } = props;

  return (
    <Btn onClick = {onClick}>
      <FontAwesomeIcon icon={icons[direction]} />
    </Btn>
  );

};
