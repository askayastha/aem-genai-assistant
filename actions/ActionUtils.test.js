/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const { checkForAdobeInternalUser } = require('./ActionUtils.js'); // adjust the path as needed

describe('checkForAdobeInternalUser', () => {
  it('should return true for Adobe internal user emails', () => {
    const profile = { email: 'user@adobe.com' };
    expect(checkForAdobeInternalUser(profile)).toBe(true);
  });

  it('should return true for Adobe test user emails', () => {
    const profile = { email: 'user@adobetest.com' };
    expect(checkForAdobeInternalUser(profile)).toBe(true);
  });

  it('should return false for non-Adobe emails', () => {
    const profile = { email: 'user@example.com' };
    expect(checkForAdobeInternalUser(profile)).toBe(false);
  });

  it('should be case insensitive', () => {
    const profile = { email: 'USER@ADOBE.COM' };
    expect(checkForAdobeInternalUser(profile)).toBe(true);
  });
});
