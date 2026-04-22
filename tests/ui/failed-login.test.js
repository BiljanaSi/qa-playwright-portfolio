const { test, expect } = require('@playwright/test');

test('fail login with invalid credentials', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_pass');
  await page.click('#login-button');


  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

 
  await page.screenshot({ path: 'screenshots/saucedemo-failed-login.png', fullPage: true });
});
