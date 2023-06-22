# Tips helpful

## Playwright Adblocker [more](https://www.npmjs.com/package/@cliqz/adblocker-playwright)


:small_orange_diamond: install: `npm install --save @cliqz/adblocker-playwright` [more](https://www.npmjs.com/package/@cliqz/adblocker-playwright)

- Use:
```javascript
  await page.route("**/*", route => {
    route.request().url().startsWith("https://googleads.") ?
      route.abort() : route.continue();
    return;
  })
```
