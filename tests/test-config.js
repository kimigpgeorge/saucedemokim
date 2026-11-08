const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';

module.exports = {
  baseURL,
  user: {
    username: process.env.SAUCE_USERNAME || 'standard_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce',
    firstName: process.env.CHECKOUT_FIRST_NAME || 'Kimig',
    lastName: process.env.CHECKOUT_LAST_NAME || 'George',
    postalCode: process.env.CHECKOUT_POSTAL_CODE || '682012',
  },
};
