"use strict"

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const icons = {
  up: faCaretUp,
  down: faCaretDown,
};

export default function ScrollArrow(props) {

  const { direction, onClick } = props;

  return (
    <div style = {{textAlign: 'center', cursor: 'pointer' }} onClick = {onClick}>
      <FontAwesomeIcon icon={icons[direction]} />
    </div>
  );

};
