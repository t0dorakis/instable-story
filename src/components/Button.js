import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledInput = styled.input`
  border-radius: 2px;
  font-family: inherit;
  font-size: 15px;
  border: 1px solid black;
  padding: 10px 16px;
  ${({ loading }) => loading && "opacity: 0.8; border: 1px solid grey;"}
  cursor: pointer;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  border-radius: 2px;
  font-family: inherit;
  font-size: 15px;
  border: 1px solid black;
  padding: 10px 16px;
  ${({ loading }) => loading && "opacity: 0.8; border: 1px solid grey;"}
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  border-radius: 2px;
  font-family: inherit;
  font-size: 15px;
  border: 1px solid black;
  padding: 10px 16px;
  ${({ loading }) => loading && "opacity: 0.8; border: 1px solid grey;"}
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
`;
// const StyledButton = styled.button`
//   border-radius: 2px;
//   font-family: inherit;
//   font-size: 15px;
//   border: 1px solid black;
//   padding: 10px 16px;
//   ${({ loading }) => loading && "opacity: 0.8;"}
//   cursor: pointer;
// `;

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
