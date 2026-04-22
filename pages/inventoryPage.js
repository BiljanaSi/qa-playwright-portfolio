const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
  }

 
  async waitForInventoryPage() {
   
    await this.products.first().waitFor({ state: 'visible', timeout: 10000 });

 
    try {
      await expect(this.sortDropdown).toBeVisible({ timeout: 10000 });
    } catch (e) {
    
      await this.page.screenshot({ path: 'error-no-dropdown.png' });
      throw new Error(
        'Dropdown [data-test="product_sort_container"] nije pronađen. Screenshot: error-no-dropdown.png'
      );
    }
  }

  async addProductByIndex(index) {
    await this.products.nth(index).locator('button').click();
  }

  async addFirstProductToCart() {
    await this.products.first().locator('button').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option) {
    await this.waitForInventoryPage();
    await this.sortDropdown.selectOption(option);
  }
}

module.exports = { InventoryPage };
