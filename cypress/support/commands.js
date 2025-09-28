// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//
Cypress.Commands.overwrite('type', (originalFn, subject, string, options) => {
  if (options && options.sensitive) {
  
    options.log = false

    return originalFn(subject, string, options)
  }

  return originalFn(subject, string, options)
})
//
Cypress.Commands.add('login', () => {
  cy.fixture('login').then((user) => {
    cy.visit('/')
    cy.contains('button', 'Sign In').click()

    cy.get('.modal-header').should('be.visible')

    cy.get('#signinEmail').type(user.email)
    cy.get('#signinPassword', { timeout: 10000 }).type(user.password, { sensitive: true })

    cy.contains('button', 'Login').click()

    cy.get('.btn.btn-link.text-danger.btn-sidebar.sidebar_btn')
      .should('be.visible')
  })
})
//
Cypress.Commands.add('openRegistrationForm', () => {
  cy.visit('/')
  cy.contains('button', 'Sign In').click()
  cy.contains('button', 'Registration').click()
})


