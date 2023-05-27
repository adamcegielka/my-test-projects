/*
API 4: PUT To All Brands List
API URL: https://automationexercise.com/api/brandsList
Request Method: PUT
Response Code: 405
Response Message: This request method is not supported.
*/

import { test, expect } from '@playwright/test';

test.describe('API 4: PUT To All Brands List', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('PUT to all Brands list', async ({ request }) => {
    
    const response = await request.put(`${baseUrl}/brandsList`);
    
    const responseBody = await response.json();
    expect(responseBody.message).toBe('This request method is not supported.');
    console.log(responseBody);
  });
});