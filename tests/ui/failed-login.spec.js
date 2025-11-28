const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');

test('fail login with invalid credentials using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wrong', 'wrong');

  await loginPage.expectError('Epic sadface: Username and password do not match any user in this service');
});
