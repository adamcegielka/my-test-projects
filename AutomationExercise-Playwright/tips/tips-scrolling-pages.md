# Scrolling pages

<br>

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

<br>

- Scroll up page to top:
```javascript
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
```

```javascript
  // Scrolls to the top of the page
    await page.mouse.wheel(0, -100000000)
    const isScrolledUp = await page.evaluate(() => {
        return window.scrollY === 0;
    });
    expect(isScrolledUp).toBe(true);

  // toBeInViewport checks only the current view
    await expect(page.getByRole('heading', {name: 'Some name'})).toBeInViewport()
```

<br>

- Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen:
```javascript
  const isScrolledUp = await page.evaluate(() => {
    return window.scrollY === 0;
  });
  expect(isScrolledUp).toBe(true);  
```