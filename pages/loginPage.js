const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
  async logout() {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#logout_sidebar_link').click();
}

  async expectError(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async isLoginErrorVisible() {
  return await this.errorMessage.isVisible();
}
}

module.exports = { LoginPage };
