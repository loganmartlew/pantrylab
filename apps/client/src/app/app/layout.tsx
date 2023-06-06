import { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import AuthRequired from '~/features/auth/AuthRequired';
import AppLayoutWrapper from '~/features/layout/AppLayout';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <AuthRequired>
      <AppLayoutWrapper>{children}</AppLayoutWrapper>
    </AuthRequired>
  );
};

export default AppLayout;

export const metadata: Metadata = {
  title: 'PantryLab',
  description: 'A place to store your shopping list with your meal plan.',
  applicationName: 'PantryLab',
  appleWebApp: {
    capable: true,
    title: 'PantryLab',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#40c057',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/icons/apple-touch-icon.png',
      sizes: '180x180',
    },
    { rel: 'shortcut icon', url: '/icons/favicon.ico' },
    {
      rel: 'icon',
      url: '/icons/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/icons/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
  ],
};
