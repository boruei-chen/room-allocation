import React from 'react';
import { Metadata } from 'next';
import { GlobalStyle } from '@/assets/styles/global.styles';
import Site from '@/shared/layouts/Site';
import { LayoutProps } from './types';

export const metadata: Metadata = {
  title: 'Room Allocation',
  description: 'Room allocation app (development with Next.js)'
};

const AppLayout: React.FC<LayoutProps> = (props) => (
  <html lang="zh-Hant-TW">
    <body>
      <div id="room-allocation-app">
        <GlobalStyle />
        <Site>
          {props.children}
        </Site>
      </div>
    </body>
  </html>
);

export default AppLayout;
