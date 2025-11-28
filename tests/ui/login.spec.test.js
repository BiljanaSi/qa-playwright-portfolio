const { test, expect } = require('@playwright/test');

test('successful login on saucedemo', async ({ page }) => {
  // Step 1: Go to login page
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Enter username
  await page.fill('#user-name', 'standard_user');

  // Step 3: Enter password
  await page.fill('#password', 'secret_sauce');

  // Step 4: Click login
  await page.click('#login-button');

  // Step 5: Verify successful login by checking page URL
  await expect(page).toHaveURL(/inventory/);

  // Step 6: Verify there are products on the page
  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6);

  // Step 7: Screenshot for portfolio
  await page.screenshot({ path: 'screenshots/saucedemo-login-success.png', fullPage: true });
});
