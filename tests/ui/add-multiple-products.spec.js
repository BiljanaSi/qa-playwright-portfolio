const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');

test('Add multiple products to cart using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addProductByIndex(0);
  await inventoryPage.addProductByIndex(1);

  await inventoryPage.openCart();

  await expect(page.locator('.cart_item')).toHaveCount(2);
});
