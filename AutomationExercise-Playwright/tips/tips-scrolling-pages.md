# Scrolling pages

- Scrolling page to footer:
```javascript
  await page.evaluate(() => {
      const footerElement = document.querySelector('footer');
      if (footerElement) footerElement.scrollIntoView();
    });
```
<br>

- Scroll to bottom of page:
```javascript
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
```

```javascript
  scrolling to class .recommended_items
    await page.evaluate(() => {
      const recommendedItemsElement = document.querySelector('.recommended_items');
      if (recommendedItemsElement)
        recommendedItemsElement.scrollIntoView();
    });
```