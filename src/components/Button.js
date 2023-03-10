import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledInput = styled.input`
  border-radius: 2px !important;
  font-family: inherit !important;
  font-size: 15px !important;
  border: 1px solid black !important;
  padding: 10px 16px !important;
  &[type="submit"] {
    background-color: transparent;
    color: black;
  }
  ${({ loading }) =>
    loading &&
    `color: #989898!important; 
  border: 1px solid #989898!important;`}
  cursor: pointer;
  margin-top: 20px !important;
`;

const StyledButton = styled.button`
  border-radius: 2px;
  font-family: inherit;
  font-size: 15px;
  border: 1px solid black;
  padding: 10px 16px;
  background-color: transparent;
  ${({ loading }) =>
    loading &&
    `color: #989898; 
  border: 1px solid #989898;`}
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
`;

const SubmitButton = ({ loading, children }) => {
  return (
    <StyledInput
      type="submit"
      value={loading ? "Loading..." : children}
      loading={loading}
      disabled={loading}
    ></StyledInput>
  );
};
const Button = ({ loading, children, onClick, ...props }) => {
  return (
    <StyledButton
      onClick={() => onClick()}
      loading={loading}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </StyledButton>
  );
};

export { Button, SubmitButton };
