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
import {
  Flex, Grid, Heading, Image,
} from '@adobe/react-spectrum';

import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import NewSessionBanner from '../assets/new-session-banner.png';
import { PromptTemplateCard } from './PromptTemplateCard.js';
import { NewButton } from './NewButton.js';
import { sessionState } from '../state/SessionState.js';
import { ViewType, viewTypeState } from '../state/ViewType.js';
import { formatTimestamp } from '../helpers/FormatHelper.js';
import { SignOutButton } from './SignOutButton.js';
import { promptTemplateCollectionState } from '../state/PromptTemplateCollectionState.js';

export function NewSessionPanel({ props }) {
  const promptTemplateCollection = useRecoilValue(promptTemplateCollectionState);
  const setCurrentSession = useSetRecoilState(sessionState);
  const setViewType = useSetRecoilState(viewTypeState);

  const promptSelectionHandler = useCallback((selected) => {
    const selectedTemplate = promptTemplateCollection[selected];

    const timestamp = Date.now();

    const session = {
      id: uuid(),
      name: `${selectedTemplate.label} ${formatTimestamp(timestamp)}`,
      description: selectedTemplate.description,
      timestamp,
      prompt: selectedTemplate.template,
      results: [],
    };

    setCurrentSession(session);
    setViewType(ViewType.CurrentSession);
  }, [promptTemplateCollection, setCurrentSession]);

  return (
    <Grid
      {...props}
      columns={['1fr']}
      rows={['min-content', 'min-content', '1fr']}
      height={'100%'}
      UNSAFE_style={{
        padding: '50px', overflow: 'auto',
      }}>

      <Flex
        direction={'column'}
        position={'relative'}
        width={'70%'}
        gap={0}
        height={'300px'}
        justifySelf={'center'}
        marginTop={20}
        marginBottom={20}>
        <Image
          src={NewSessionBanner}
          objectFit={'cover'}
          marginBottom={20}
          UNSAFE_style={{ borderRadius: '20px' }}
        />
        <h3 style={{ padding: 0, margin: 0 }}>Welcome to the AEM GenAI Assistant!</h3>
        <p>Create high quality content quickly then measure it with experimentation or publish it to your site.</p>
        <NewButton right={-150} />
        <SignOutButton right={-150} top={50}/>
      </Flex>

      <Heading level={4} alignSelf={'start'}>Prompts</Heading>

      <Grid
        width={'100%'}
        alignItems={'center'}
        columns={'repeat(auto-fill, minmax(250px, 1fr))'} gap={'size-200'}>
        {
          promptTemplateCollection
            && promptTemplateCollection
              .map((template, index) => (
                <PromptTemplateCard
                  key={index}
                  template={template}
                  onClick={() => promptSelectionHandler(index)} />
              ))
        }
      </Grid>
    </Grid>
  );
}