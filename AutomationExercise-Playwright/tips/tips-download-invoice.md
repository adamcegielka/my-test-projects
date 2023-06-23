# Click 'Download Invoice' button and verify invoice is downloaded successfully

<br>

```javascript
  const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    const download = await downloadPromise;
    if (download) {
      console.log('File downloaded successfully.');
    } else {
      console.log('File download failed.');
    }
```