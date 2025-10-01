const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "axofaa",

  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    retries: {
      runMode: 1,
      openMode: 1,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,

    specPattern: "cypress/e2e/qaauto/**/*.spec.js",
    supportFile: "cypress/support/e2e.js",   

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});



