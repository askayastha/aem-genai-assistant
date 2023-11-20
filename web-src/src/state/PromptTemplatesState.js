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
import { selector } from 'recoil';
import { configurationState } from './ConfigurationState.js';
import { wretchRetry } from '../../../actions/Network.js';

function parsePromptTemplates(data) {
  return data.map(({
    Label, Description, Template,
  }) => {
    return {
      label: Label,
      description: Description,
      template: Template || '',
    };
  });
}

export const promptTemplatesState = selector({
  key: 'promptTemplatesState',
  get: async ({ get }) => {
    try {
      const { websiteUrl, promptTemplatesPath } = get(configurationState);
      const url = `${websiteUrl}/${promptTemplatesPath.toLowerCase()}.json`;
      const { data } = await wretchRetry(url).get().json();
      return parsePromptTemplates(data);
    } catch (e) {
      console.error(e);
      throw new Error('Unable to load prompt templates');
    }
  },
});