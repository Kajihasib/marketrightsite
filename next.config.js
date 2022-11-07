require("dotenv").config();

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    DOMAIN_URL: process.env.DOMAIN_URL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
};
