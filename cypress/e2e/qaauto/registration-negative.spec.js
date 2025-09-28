describe('Negative checks for Name field in Registration form', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('button', 'Sign In').click()
    cy.contains('button', 'Registration').click()
    })

  it('shows "Name is required" when name is empty', () => {
    cy.get('#signupName').focus().blur()      // фокус і blur
    //cy.get('#signupLastName').focus()          // перемикаємось на last name

    cy.get('.invalid-feedback')          // селектор для повідомлення про помилку
      .should('be.visible')
      .and('contain.text', 'Name required')

    cy.get('.invalid-feedback')
      .should('have.css', 'border-color', 'rgb(220, 53, 69)') // червоний
  })

  it('shows error when name has wrong characters or length', () => {
    cy.get('#signupName').type('1').blur()
    //cy.get('#signupLastName').focus()  // blur name, щоб з’явилось повідомлення

    cy.get('.invalid-feedback')
      .should('be.visible')
      .and('contain.text', 'Name is invalid')
      .and('contain.text', 'Name has to be from 2 to 20 characters long')
    cy.get('.invalid-feedback')
      .should('have.css', 'border-color', 'rgb(220, 53, 69)')
  })
})
