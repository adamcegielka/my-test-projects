# Run tests 

<br>

- Run tests sequentially:
```json
  "scripts": {
  "test:sequential": "playwright test --workers 1"
  }
```
package.json:  `npm run test:sequential`

<br>

- test.serial method to perform tests sequentially:
```javascript
  const { test } = require('@playwright/test');

test.describe('My tests', () => {
  test.serial('Test 1', async ({ page }) => {
    // Test code 1
  });

  test.serial('Test 2', async ({ page }) => {
    // Test code 2
  });

  test.serial('Test 3', async ({ page }) => {
    // Test code 3
  });
});