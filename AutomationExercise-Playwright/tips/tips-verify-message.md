# Verify success message 'Your order has been placed successfully!'

<br>

```javascript
  const [_, successMessage] = await Promise.all([
    page.getByRole('button', { name: 'Pay and Confirm Order' }).click(),
    page.getByText('Your order has been placed successfully!')])
  expect(successMessage).toBeVisible();
```

<br>

```javascript
  await expect(page.getByText('Your order has been placed successfully!')).toBeVisible();
```

<br>

```javascript
  const successMessage = await page.waitForSelector('#success_message');
  await expect(successMessage).toContain('Your order has been placed successfully!');
```

<br>

```javascript
  const successMessageText = await page.evaluate(() => {
    const successMessage = document.querySelector('#success_message');
    return successMessage?.textContent?.trim() ?? '';
  });
  expect(successMessageText).toBe('Your order has been placed successfully!');
```

<br>

```javascript
  await page.waitForTimeout(2000);
  const successMessage = await page.getByText('Your order has been placed successfully!');
  await expect(successMessage).toBeVisible();
```

<br>

```javascript
  await page.waitForLoadState();
  await page.waitForSelector('#success_message.alert-success');
  const successMessageText = await page.textContent('#success_message.alert-success');
  expect(successMessageText).toBe('Your order has been placed successfully!');
```

<br>

```javascript
  const successMessage = await page.locator('#success_message');
  const messageText1 = await successMessage.innerText();
  expect(messageText1).toBe('Your order has been placed successfully!');
```

<br>

```javascript
  const successMessageLocator = page.locator('#success_message.alert-success');
  await successMessageLocator.waitFor();
  const successMessage = await successMessageLocator.textContent();
  expect(successMessage).toContain('Your order has been placed successfully!');
```