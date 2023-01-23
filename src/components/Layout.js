import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../styles/queries";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  font-family: "Menlo", "Courier New", Menlo, Courier, monospace;
  /* font-size: 14px; */
  line-height: 150%;
  padding: 40px;
  ${mediaQueries.small} {
    padding: 10px;
  }
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
