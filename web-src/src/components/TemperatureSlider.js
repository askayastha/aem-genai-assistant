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
import { Slider } from '@adobe/react-spectrum';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useIntl } from 'react-intl';

import { intlMessages } from './PromptSessionSideView.l10n.js';
import {
  TEMPERATURE_MAX, TEMPERATURE_MIN, temperatureState,
} from '../state/TemperatureState.js';
import { DescriptionLabel } from './DescriptionLabel.js';

export function TemperatureSlider() {
  const [temperature, setTemperature] = useRecoilState(temperatureState);
  const { formatMessage } = useIntl();

  return (
    <Slider
      label={formatMessage(intlMessages.promptSessionSideView.temperatureLabel)}
      contextualHelp={<DescriptionLabel
        label={formatMessage(intlMessages.promptSessionSideView.temperatureLabel)}
        description={formatMessage(intlMessages.promptSessionSideView.temperatureDescription)} />}
      minValue={TEMPERATURE_MIN}
      maxValue={TEMPERATURE_MAX}
      isFilled={true}
      step={0.1}
      width={'90%'}
      onChange={setTemperature}
      defaultValue={temperature} />
  );
}
