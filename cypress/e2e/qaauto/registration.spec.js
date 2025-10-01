///<reference types="cypress"/>

describe('User Registration', () => {
  it('Registers a new user successfully', () => {
    const email = `test${Date.now()}@example.com`
    const password = 'ValidPass1'

    cy.visit('/')
    cy.contains('button', 'Sign In').click()
    cy.contains('button', 'Registration').click()

    cy.get('#signupName').type('John')
    cy.get('#signupLastName').type('Doe')
    cy.get('#signupEmail').type(email)
    cy.get('#signupPassword').type(password)
    cy.get('#signupRepeatPassword').type(password)

    cy.contains('button', 'Register').click()
    cy.contains('button', 'Add car').should('be.visible')

    // Збережено в файл
    cy.writeFile('cypress/fixtures/user.json', { email, password })
  })
})

