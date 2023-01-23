import { createGlobalStyle } from "styled-components";
import { mediaQueries } from "./queries";
// introduces dvh units
import "large-small-dynamic-viewport-units-polyfill";

export const GlobalStyles = createGlobalStyle`
  :root {
    --100dvh: calc(var(--1dvh, 1vh) * 100);
        font-size: 15px;

        ${mediaQueries.wideScreen} {
          font-size: 15px;
        }
        ${mediaQueries.desktop} {
          font-size: 15px;
        }
        ${mediaQueries.medium} {
          font-size: 15px;
        }

        ${mediaQueries.small} {
          font-size: 15px;
        }
  }

  body,html {
    -webkit-font-smoothing: antialiased; /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */  
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  html::-webkit-scrollbar, .scroll-container::-webkit-scrollbar {
    display: none;
    
  }

  body {
    padding: 0;
    margin: 0;
  }

  ::selection {
    background: black;
    color: white;
  }
  p::selection {
    background: black;
    color: white;
  }

  #___gatsby{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #gatsby-focus-wrapper{
    padding: 0;
    margin: 0;
    box-sizing: inherit;
    width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: black
  }
`;
