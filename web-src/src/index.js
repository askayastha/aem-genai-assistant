/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import ReactDOM from 'react-dom';

import {
  RecoilRoot,
} from 'recoil';

import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { init } from '@adobe/exc-app';
import React from 'react';
import { App } from './components/App.js';
import { ApplicationProvider } from './components/ApplicationProvider.js';
import { ShellProvider } from './components/ShellProvider.js';
import './index.css';
import { AccessBoundary } from './components/AccessBoundary.js';

init(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
      <ShellProvider>
        <AccessBoundary>
          <ApplicationProvider>
            <Provider colorScheme="light" theme={defaultTheme} width="100%" height="100%">
              <App />
            </Provider>
          </ApplicationProvider>
        </AccessBoundary>
      </ShellProvider>
    </RecoilRoot>,
    document.getElementById('root'),
  );
});
