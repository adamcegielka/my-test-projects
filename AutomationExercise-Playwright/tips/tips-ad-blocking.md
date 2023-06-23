# Ad blocking

## Playwright Adblocker [more](https://www.npmjs.com/package/@cliqz/adblocker-playwright)

- I used:
```javascript
  await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
```

- The first way to remove an advertisement that appears:
```javascript
  await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
```

- Upload file:
```javascript
  await page
    .locator('input[name="upload_file"]')
    .setInputFiles('upload-file/myfile.txt');
```
