[![Playwright.dev](https://img.shields.io/badge/Documentation-Playwright-45ba4b.svg?logo=playwright)](https://playwright.dev/docs/intro)
[![Support badge](https://img.shields.io/badge/stackoverflow-Playwright-45ba4b.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/playwright) 
<br>
[![Prettier](https://img.shields.io/badge/Documentation-Prettier-f7ba3e.svg?logo=prettier)](https://prettier.io/docs/en/index.html)
[![Prettier](https://img.shields.io/badge/GitHub-Prettier-f7ba3e.svg?logo=prettier)](https://github.com/prettier/prettier)
<br>
[![ESLint](https://img.shields.io/badge/Documentation-ESLint-4b32c3.svg?logo=eslint)](https://eslint.org/docs/latest/)
[![ESLint](https://img.shields.io/badge/GitHub-ESLint-4b32c3.svg?logo=eslint)](https://github.com/eslint/eslint)
<br><br>

# Automation Exercise with Playwright 

## The objective of the test project

The objective of my testing project is to create automated tests for the [Automation Exercise](https://automationexercise.com/) application in order to gain valuable experience in automated testing. 

## Scope of the test project

The test project includes the running of automated tests using ready-made [Test Cases](https://automationexercise.com/test_cases) and [API testing](https://automationexercise.com/api_list) in Automation.
### TEST CASES:
- Test Case 1: Register User
- Test Case 2: Login User with correct email and password
- Test Case 3: Login User with incorrect email and password
- Test Case 4: Logout User
- Test Case 5: Register User with existing email
- Test Case 6: Contact Us Form
- Test Case 7: Verify Test Cases Page
- Test Case 8: Verify All Products and product detail page
- Test Case 9: Search Product
- Test Case 10: Verify Subscription in home page
- Test Case 11: Verify Subscription in Cart page
- Test Case 12: Add Products in Cart
- Test Case 13: Verify Product quantity in Cart
- Test Case 14: Place Order: Register while Checkout
- Test Case 15: Place Order: Register before Checkout
- Test Case 16: Place Order: Login before Checkout
- Test Case 17: Remove Products From Cart
- Test Case 18: View Category Products
- Test Case 19: View & Cart Brand Products
- Test Case 20: Search Products and Verify Cart After Login
- Test Case 21: Add review on product
- Test Case 22: Add to cart from Recommended items
- Test Case 23: Verify address details in checkout page
- Test Case 24: Download Invoice after purchase order
- Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
- Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality

### APIS LIST FOR PRACTICE:
- API 1: Get All Products List
- API 2: POST To All Products List
- API 3: Get All Brands List
- API 4: PUT To All Brands List
- API 5: POST To Search Product
- API 6: POST To Search Product without search_product parameter
- API 7: POST To Verify Login with valid details
- API 8: POST To Verify Login without email parameter
- API 9: DELETE To Verify Login
- API 10: POST To Verify Login with invalid details
- API 11: POST To Create/Register User Account
- API 12: DELETE METHOD To Delete User Account
- API 13: PUT METHOD To Update User Account
- API 14: GET user account detail by email

## Tools used for testing

I use [VSCode](https://code.visualstudio.com/) to create the automated tests and [Playwright](https://playwright.dev/) to run them with language [TypeScript](https://www.typescriptlang.org/).

## Lessons learned
- in the first stage of the project I used the [tests](https://github.com/adamcegielka/my-test-projects/tree/main/AutomationExercise-Playwright/tests) folder for tests
- in the next stage I refactored the tests using POM and created the [pages](https://github.com/adamcegielka/my-test-projects/tree/main/AutomationExercise-Playwright/pages) folder
- the next idea was to refactor bigger the code using POM more, so I created the folder [test pages-objects](https://github.com/adamcegielka/my-test-projects/tree/main/AutomationExercise-Playwright/tests%20page-objects), in which there are duplicate tests and for these tests I created the folder [page-objects](https://github.com/adamcegielka/my-test-projects/tree/main/AutomationExercise-Playwright/page-objects), I made it so that the orginals of the first tests are preserved 
- the advantage of this project structure was to keep the tests in one project, so that I could return to them in case of emergency
- the disadvantage is the unnecessary chaos in the project structure
- in future projects, I will focus more on the structure of the project so as not to introduce unnecessary chaos and to keep the project more readable.
- as well as pay more attention to creating more readable commits in git

<br>

## Test results
- Test results based on the available Test Cases are available in the folder [test-reports](https://github.com/adamcegielka/my-test-projects/tree/main/AutomationExercise-Playwright/test-reports)
- API test results are not available due to numerous errors during API testing based on the available scenario.

## Conclusions
Having completed the tests on the basis of the available [Test Cases](https://automationexercise.com/test_cases) and analyzed the results, here are some conclusions about the project as a whole:
- All tests were successful, as confirmed by [test-reports](https://github.com/adamcegielka/my-test-projects/tree/main/AutomationExercise-Playwright/test-reports).
- There is one assertion that was not resolved in the tests: [Test Case 14]() / [Test Case 15]() / [Test Case 16]() / [Test Case 24]() Attempts to resolve this assertion are available in [tips-upload-file.md](https://github.com/adamcegielka/my-test-projects/blob/main/AutomationExercise-Playwright/tips/tips-upload-file.md)
- Test performance was satisfactory and system responses were received in an acceptable time.
- When testing the app, I had the most problems with a google ad appearing, which caused an error during testing. When I solved this problem using the `page.goBack()` and `page.goForward()` :smiley: method, which worked when running a single test, however, I found that when running all tests the adverts appeared in some tests in other places. 
After digging deeper, I found a method that I eventually used in my tests to solve the google ads problem:  
```JavaScript
await page.route("**/*", route => {
    route.request().url().startsWith("https://googleads.") ?
    route.abort() : route.continue();
    return;
});
```

- In the project I also used [ESLint](https://eslint.org/docs/latest/) for static code analysis and [Prettier](https://prettier.io/docs/en/index.html) for code formatting.

<br>

However, [API testing](https://automationexercise.com/api_list) based on the available API Testing documentation failed. During testing, I encountered numerous errors that I could not resolve. The reason for this may be the insufficient knowledge I currently have in API testing and application errors.  
For example, already when testing [API 2: POST To All Products List](https://github.com/adamcegielka/my-test-projects/blob/main/AutomationExercise-Playwright/tests-api/testApi02.spec.ts) I had a problem with `Response Code: 405` because using the  
```JavaScript
expect(response.status()).toBe(405);
```  
method I was getting an error response:
```JavaScript
Error: expect(received).toBe(expected)
Expected: 405
Received: 200
```
After numerous attempts to find and solve the problem by also testing in [Postman](https://www.postman.com/), I decided to give up further testing of this API. Perhaps I will return to this topic after gaining more knowledge in API testing.

<br>

In conclusion, this project on automated testing at Playwright was my first, and it brought me a lot of valuable experience and knowledge. I successfully ran tests, solved various problems encountered during application testing, and gained skills in using the POM pattern. Although API testing proved more difficult, it is an area where I intend to continue learning. I am proud of the results I have achieved and am ready to continue to grow in the field of automated testing.

<br>

### Thanks a lot to **Krzysiek** from [jaktestowac.pl](https://jaktestowac.pl/) for providing valuable advice.

<br>

## AutomationExercise on YouTube:
- [Software Testing](https://www.youtube.com/watch?v=ccuGJzwWj2c&list=PL1vY1vQtSNmnc6UuNj68-JndnBwIxeUTf)
- [Performance Testing](https://www.youtube.com/watch?v=LfVTtM5zpYg&list=PL1vY1vQtSNmnaXc-cJbw0J8uqIj-mie1j)
- [JMeter Tutorials](https://www.youtube.com/watch?v=YLYczpLUblo&list=PL1vY1vQtSNmkIkb0Lef12Fel9jvIH_daT)