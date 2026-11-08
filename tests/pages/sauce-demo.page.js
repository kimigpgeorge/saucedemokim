const { expect } = require('@playwright/test');
const testConfig = require('../test-config');

class SauceDemoPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.pageTitle = page.locator('.title');
  }

  async openLoginPage() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Swag Labs/);
    await expect(this.usernameInput).toBeVisible();
  }

  async login() {
    await this.usernameInput.fill(testConfig.user.username);
    await this.passwordInput.fill(testConfig.user.password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addItemsAndStartCheckout() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.page.locator('.cart_item')).toHaveCount(2);

    await this.page.locator('[data-test="remove-sauce-labs-onesie"]').click();
    await expect(this.page.locator('.cart_item')).toHaveCount(1);
    await this.page.locator('[data-test="checkout"]').click();
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
  }

  async completeCheckout() {
    await this.page.locator('[data-test="firstName"]').fill(testConfig.user.firstName);
    await this.page.locator('[data-test="lastName"]').fill(testConfig.user.lastName);
    await this.page.locator('[data-test="postalCode"]').fill(testConfig.user.postalCode);
    await this.page.locator('[data-test="continue"]').click();

    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.page.locator('.summary_total_label')).toBeVisible();
    await this.page.locator('[data-test="finish"]').click();

    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(this.page).toHaveURL(new URL('/', testConfig.baseURL).toString());
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = { SauceDemoPage };
