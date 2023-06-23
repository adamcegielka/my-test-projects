# Upload file

- Upload file:
```javascript
  await page
      .locator('input[name="upload_file"]')
      .setInputFiles('upload-file/myfile.txt');
```