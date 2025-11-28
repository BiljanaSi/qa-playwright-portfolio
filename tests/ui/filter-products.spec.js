const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');

test('verify product filter works', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');


 
  console.log('Current URL after login:', page.url());
  console.log('Page title:', await page.title());

  await page.screenshot({ path: 'after-login.png' });

  await inventoryPage.sortBy('hilo');

  
  const prices = await page.locator('.inventory_item_price').allInnerTexts();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

  for (let i = 0; i < numericPrices.length - 1; i++) {
    expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i + 1]);
  }
});
