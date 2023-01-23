/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

//Copygatsby-browser.js: copy code to clipboard

import React from 'react';
// import { Helmet } from 'react-helmet';
import { GlobalStyles } from './src/styles/globalStyles';

export const wrapRootElement = ({ element }) => <>{element}</>;

export const wrapPageElement = ({ element, ...props }) => (
  <>
    {/* <Helmet>
      <link rel="stylesheet" type="text/css" href="/fonts/fonts.css" />
    </Helmet> */}
    <GlobalStyles />
    {element}
  </>
);
