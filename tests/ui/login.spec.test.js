const { test, expect } = require('@playwright/test');

test('successful login on saucedemo', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');


  await page.fill('#user-name', 'standard_user');

  await page.fill('#password', 'secret_sauce');


  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory/);

  
  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6);

  await page.screenshot({ path: 'screenshots/saucedemo-login-success.png', fullPage: true });
});
