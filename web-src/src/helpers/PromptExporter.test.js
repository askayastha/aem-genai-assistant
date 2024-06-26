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
import { toText, toHTML } from './PromptExporter.js';
import { formatIdentifier } from './FormatHelper.js';

describe('toText', () => {
  test('returns text: prompt result is an key/value pair', () => {
    const promptResponse = { key1: 'value1', key2: 'value2' };
    expect(toText(promptResponse)).toEqual('key1: value1\nkey2: value2');
  });
  test('returns text: prompt result is a string', () => {
    const promptResponse = 'hello';
    expect(toText(promptResponse)).toEqual('hello');
  });
});

describe('toHTML', () => {
  it('should return the input if it is a string', () => {
    const input = 'testString';
    expect(toHTML(input)).toEqual(input);
  });

  it('should format the input to HTML if it is an object', () => {
    const input = { testIdentifier: 'value1', anotherIdentifier: 'value2' };
    const expectedOutput = ''
      + `<b>${formatIdentifier('testIdentifier')}</b>: value1`
      + '<br/>'
      + `<b>${formatIdentifier('anotherIdentifier')}</b>: value2`;
    expect(toHTML(input)).toEqual(expectedOutput);
  });
});
