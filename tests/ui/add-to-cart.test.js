const { test, expect } = require('@playwright/test');

test('add product to cart on saucedemo', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Step 2: Add first product to cart
  const firstProduct = page.locator('.inventory_item').first();
  await firstProduct.locator('button').click(); // klik na Add to cart

  // Step 3: Open cart
  await page.click('.shopping_cart_link');

  // Step 4: Verify product is in cart
  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toHaveCount(1);

  // Step 5: Screenshot for portfolio
  await page.screenshot({ path: 'screenshots/saucedemo-cart.png', fullPage: true });
});
