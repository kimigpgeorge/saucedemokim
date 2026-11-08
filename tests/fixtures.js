const { test: base } = require('@playwright/test');
const { SauceDemoPage } = require('./pages/sauce-demo.page');

const test = base.extend({
  sauceDemo: async ({ page }, use) => {
    await use(new SauceDemoPage(page));
  },
});

module.exports = { test };
