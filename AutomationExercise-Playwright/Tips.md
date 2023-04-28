# Tips

## Commands Playwright

:small_orange_diamond:  check **NodeJS** version: `node -v`  
:small_orange_diamond:  new project with **Playwright**: `npm init playwright@latest`  
:small_orange_diamond:  record tests for given site: `npx playwright codegen https://demo-bank.vercel.app/`  
:small_orange_diamond:  run tests without browser GUI: `npx playwright test`  
:small_orange_diamond:  run tests with browser GUI: `npx playwright test --headed`  
:small_orange_diamond:  view report: `npx playwright show-report`  

## Updating Playwright

:small_orange_diamond:  check if Playwright should be updated: `npm outdated @playwright/test`  
:small_orange_diamond:  update Playwright: `npm i @playwright/test`  
:small_orange_diamond:  update browsers: `npx playwright install`  
:small_orange_diamond:  verify Playwright version: `npx @playwright/test --version`   

## Tips for VSCode:
:small_orange_diamond: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>↓/↑</kbd> -> copy line up/down  
:small_orange_diamond: <kbd>ALT</kbd> + <kbd>↓/↑</kbd> -> moving the whole line  
:small_orange_diamond: <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>K</kbd> -> delete line  
:small_orange_diamond: <kbd>CTRL</kbd> + <kbd>F</kbd> -> find  
:small_orange_diamond: <kbd>CTRL</kbd> + <kbd>B</kbd> -> left sidebar  
:small_orange_diamond: <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>R</kbd> -> Refactor ...  
:small_orange_diamond: <kbd>SHIFT</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> -> code formatting  
:small_orange_diamond: <kbd>CTRL</kbd> + <kbd>SPACE</kbd> -> suggestions  

## Chrome DevTools

:small_orange_diamond:  open DevTools <kbd>F12</kbd> or right click: `Inspect`  
    - <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>J</kbd>  
    - <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>K</kbd> **Firefox**    
:small_orange_diamond:  testing CSS selectors in Console: `$$('selector')`  