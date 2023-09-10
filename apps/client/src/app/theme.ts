import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      minHeight: '100vh',
    },
    '#root': {
      minHeight: '100vh',
    },
  }),
  primaryColor: 'green',
  black: 'hsl(0, 0%, 20%)',
};

export default theme;
