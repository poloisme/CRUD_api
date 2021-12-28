const { setWorldConstructor } = require("@cucumber/cucumber");

if (!process.env.SERVICE_URL) {
  require("dotenv-flow").config();
}

class CustomWorld {
  constructor({ parameters }) {
    this.context = {};
  }
}

setWorldConstructor(CustomWorld);
