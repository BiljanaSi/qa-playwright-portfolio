const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');

test('successful login with POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Provjera da smo na inventory stranici
  await expect(page).toHaveURL(/inventory/);

  // Screenshot
  await page.screenshot({ path: 'screenshots/saucedemo-login-success.png', fullPage: true });
});
