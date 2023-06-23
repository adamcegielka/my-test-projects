# Scrolling pages

- Scrolling pages:
```javascript
  await page.evaluate(() => {
      const footerElement = document.querySelector('footer');
      if (footerElement) footerElement.scrollIntoView();
    });
```