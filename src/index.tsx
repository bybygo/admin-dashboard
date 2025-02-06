import React from 'react';

import { registerLicense } from '@syncfusion/ej2-base';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { ContextProvider } from '@/contexts/ContextProvide';

import './index.css';

registerLicense(process.env.SYNCFUSION_LICENSE!);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
