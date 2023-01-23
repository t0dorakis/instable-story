export const screenSizes = {
  small: 480,
  medium: 850,
  desktop: 1024,
  wideScreen: 1600,
  maxWideScreen: 1920,
};

export const mediaQueries = {
  small: `@media only screen and (max-width: ${screenSizes.small}px)`,
  medium: `@media only screen and (max-width: ${screenSizes.medium}px)`,
  desktop: `@media only screen and (max-width: ${screenSizes.desktop}px)`,
  wideScreen: `@media only screen and (min-width: ${screenSizes.wideScreen}px)`,
};
