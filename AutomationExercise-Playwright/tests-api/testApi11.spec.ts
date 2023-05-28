/*
API 11: POST To Create/Register User Account
API URL: https://automationexercise.com/api/createAccount
Request Method: POST
Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
Response Code: 201
Response Message: User created!
*/

import { test, expect } from '@playwright/test';

test.describe.fixme('API 11: POST To Create/Register User Account', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to Create/Register user account', async ({ request }) => {
    const newUser = {
      'name': 'John Doe',
      'email': 'johndoe@example.com',
      'password': 'secretpassword',
      'title': 'Mr',
      'birth_date': '06',
      'birth_month': '08',
      'birth_year': '1990',
      'firstname': 'John',
      'lastname': 'Doe',
      'company': 'Example Company',
      'address1': '123 Main Street',
      'address2': 'Apt 4B',
      'country': 'United States',
      'zipcode': '12345',
      'state': 'California',
      'city': 'Los Angeles',
      'mobile_number': '1234567890'
    };

    // const response = await request.post(`${baseUrl}/createAccount`, { json: newUser });

    // expect(response.status()).toBe(201);

    // const responseBody = await response.json();
    // console.log(responseBody);

    // expect(responseBody.name).toBe(newUser.name);
    // expect(responseBody.createAccount).toBeTruthy();
    // expect(responseBody.message).toBe('User created!');
  });
});