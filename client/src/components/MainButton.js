import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  background: ${(props) => props.background};
  border: 2px solid ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.bd}px;
  text-align: center;
  /* border-radius: 3px; */
  transition: 0.3s;
  margin: auto;
  font-family: Roboto;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize}px;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: ${(props) => props.pd}px;
  padding-right: ${(props) => props.pd}px;
  &:hover {
    background-color: ${(props) => props.hoverBack};
    color: ${(props) => props.hoverColor};
  }
`;

export default function MainButton(props) {
  const history = useHistory();

  const onClick = () => {
    history.push(props.to);
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <Button
      background={props.background}
      height={props.height}
      width={props.width}
      pd={props.pd}
      fontSize={props.fontSize}
      onClick={onClick}
      border={props.border}
      bd={props.bd}
      color={props.color}
      hoverColor={props.hoverColor}
      hoverBack={props.hoverBack}
    >
      {props.label}
    </Button>
  );
}
