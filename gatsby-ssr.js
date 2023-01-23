import React from 'react';
// import { Helmet } from 'react-helmet';
import { GlobalStyles } from './src/styles/GlobalStyles';

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
