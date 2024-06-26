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
  ActionButton, Image, Text,
} from '@adobe/react-spectrum';
import { useSetRecoilState } from 'recoil';
import React from 'react';
import { useIntl } from 'react-intl';

import { intlMessages } from './PromptSessionSideView.l10n.js';

import ResetIcon from '../assets/reset.svg';
import { parametersState } from '../state/ParametersState.js';

export function ResetButton(props) {
  const setParameters = useSetRecoilState(parametersState);
  const { formatMessage } = useIntl();

  const handleReset = () => {
    setParameters({});
  };

  return (
    <ActionButton
      {...props}
      UNSAFE_className="hover-cursor-pointer"
      isQuiet
      onPress={handleReset}
      variant={''}>
      <Image src={ResetIcon} alt={'Reset Inputs'} marginEnd={'8px'}/>
      <Text>{formatMessage(intlMessages.promptSessionSideView.resetInputsButtonLabel)}</Text>
    </ActionButton>
  );
}
