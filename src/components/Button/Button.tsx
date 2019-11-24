import React from 'react';
import {IconType} from 'react-icons/lib/cjs';
import './Button.css';

export interface ButtonProps {
  handleClick: Function;
  text?: string;
  theme?: string;
  icon?: React.ReactNode;
}

export enum ButtonThemes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

const Button = (props: ButtonProps) => {
  const theme = props.theme || ButtonThemes.PRIMARY;
  return (
    <div className={`button-wrap button-wrap-${theme}`} onClick={e => props.handleClick(e)}>
      <span className="button-icon">{props.icon}</span>
      <span className="button-text">{props.text}</span>
    </div>
  );
}

export default Button;
