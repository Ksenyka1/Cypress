const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
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

    // Ось ця зміна
    specPattern: "cypress/e2e/qaauto/**/*.spec.js"
  },

  projectId: "axofaa",
});

