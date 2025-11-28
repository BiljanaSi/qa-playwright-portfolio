const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');

test('add product to cart using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addFirstProductToCart();
  await inventoryPage.openCart();

  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(1);

  await page.screenshot({ path: 'screenshots/single-product.png' });
});
