const { test } = require('./fixtures');

test('user can log in and see inventory', async ({ sauceDemo }) => {
  await sauceDemo.openLoginPage();
  await sauceDemo.login();
});

test('user can complete a checkout independently', async ({ sauceDemo }) => {
  await sauceDemo.openLoginPage();
  await sauceDemo.login();
  await sauceDemo.addItemsAndStartCheckout();
  await sauceDemo.completeCheckout();
});

test('user can log out independently', async ({ sauceDemo }) => {
  await sauceDemo.openLoginPage();
  await sauceDemo.login();
  await sauceDemo.logout();
});
