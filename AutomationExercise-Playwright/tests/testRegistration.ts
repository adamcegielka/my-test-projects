import { RegistrationPage } from '../pages/registration.page';
import { testRegistrationData } from '../test-data/testRegistration.data';

export async function registerUser(page) {
  const userId = testRegistrationData.userId;
  const userEmail = testRegistrationData.userEmail;
  const userPassword = testRegistrationData.userPassword;
  const firstName = testRegistrationData.firstName;
  const lastName = testRegistrationData.lastName;
  const birthDay = testRegistrationData.birthDay;
  const birthMonth = testRegistrationData.birthMonth;
  const birthYear = testRegistrationData.birthYear;
  const companyName = testRegistrationData.companyName;
  const address1 = testRegistrationData.address1;
  const zipCode = testRegistrationData.zipCode;
  const city = testRegistrationData.city;
  const state = testRegistrationData.state;
  const country = testRegistrationData.country;
  const mobileNumber = testRegistrationData.mobileNumber;

  // Blocking of network resources that generate Ads
  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else {
      route.continue();
    }
  });
  // --- End code

  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // POM - Page Object Model
  const registrationPage = new RegistrationPage(page)

  await registrationPage.userId.fill(userId);
  await registrationPage.userEmail.fill(userEmail);
  await registrationPage.signupButton.click();
  await registrationPage.courtesyPhrase.check();
  await registrationPage.userPassword.fill(userPassword);
  await registrationPage.birthDay.selectOption(birthDay);
  await registrationPage.birthMonth.selectOption(birthMonth);
  await registrationPage.birthYear.selectOption(birthYear);
  await registrationPage.checkboxNewsletter.check();
  await registrationPage.checkboxOffers.check();
  await registrationPage.firstName.fill(firstName);
  await registrationPage.lastName.fill(lastName);
  await registrationPage.companyName.fill(companyName);
  await registrationPage.address1.fill(address1);
  await registrationPage.country.selectOption(country);
  await registrationPage.state.fill(state);
  await registrationPage.city.fill(city);
  await registrationPage.zipCode.fill(zipCode);
  await registrationPage.mobileNumber.fill(mobileNumber);
  await registrationPage.createAccountButton.click();  
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
}