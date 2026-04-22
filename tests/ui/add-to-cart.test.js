const { test, expect } = require('@playwright/test');

test('add product to cart on saucedemo', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  
  const firstProduct = page.locator('.inventory_item').first();
  await firstProduct.locator('button').click(); // klik na Add to cart

  
  await page.click('.shopping_cart_link');


  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toHaveCount(1);


  await page.screenshot({ path: 'screenshots/saucedemo-cart.png', fullPage: true });
});
