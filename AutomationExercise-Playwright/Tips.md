# Tips

## Commands Playwright

:small_orange_diamond: check **NodeJS** version: `node -v`  
:small_orange_diamond: new project with **Playwright**: `npm init playwright@latest`  
:small_orange_diamond: record tests for given site: `npx playwright codegen https://automationexercise.com/`  
:small_orange_diamond: run tests without browser GUI: `npx playwright test`  
:small_orange_diamond: run tests with browser GUI: `npx playwright test --headed`  
:small_orange_diamond: view report: `npx playwright show-report`    
:small_orange_diamond: start-up on Trace Viewe: `npx playwright show-trace trace.zip`  
:small_orange_diamond: open up Trace Viewe: `npx playwright test --trace on`  
:small_orange_diamond: open up UI mode: `npx playwright test --ui`  

## Updating Playwright

:small_orange_diamond: check if Playwright should be updated: `npm outdated @playwright/test`  
:small_orange_diamond: update Playwright: `npm i @playwright/test`  
:small_orange_diamond: update browsers: `npx playwright install`  
:small_orange_diamond: verify Playwright version: `npx @playwright/test --version`

## ESLint

:small_orange_diamond: check installation: `npm install eslint`  
:small_orange_diamond: configuration: `npm init @eslint/config`  
:small_orange_diamond: plug-in installation: `ESLint`   
:small_orange_diamond: analysis of the whole project: `./node_modules/.bin/eslint .`  
:small_orange_diamond: correction of errors: `./node_modules/.bin/eslint . --fix`   

## Prettier

:small_orange_diamond: installation: `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`    
:small_orange_diamond: plug-in installation: `Prettier`   
:small_orange_diamond: ESLint plugin for Prettier formatting: [GitHub](https://github.com/prettier/eslint-plugin-prettier)  

## Updating TypeScript

:small_orange_diamond: check version: `npm show typescript version`  
:small_orange_diamond: update: `npm install typescript@latest`  
:small_orange_diamond: show list of version: `npm show typescript versions`  
:small_orange_diamond: update to 5.0.4 version: `npm install typescript@5.0.4`  

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

:small_orange_diamond: open DevTools <kbd>F12</kbd> or right click: `Inspect`  
<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>J</kbd>  
<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>K</kbd> **Firefox**  
:small_orange_diamond: testing CSS selectors in Console: `$$('selector')`
