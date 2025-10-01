describe('Garage - Manage Cars', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.get('h1').contains('Garage').should('exist');
  });

//1 car form
  it('check Add Car form', () => {
    cy.get('button').contains('Add car').click();

    cy.get('.modal-content').should('exist');

    cy.get('#addCarBrand').should('have.value', '0: 1');
    cy.get('#addCarModel').should('have.value', '0: 1');
    cy.get('#addCarMileage').should('exist');

    cy.get('.modal-footer').contains('Add').should('be.disabled');  

    cy.get('button').contains('Cancel').click();
    cy.get('.modal-content').should('not.exist');
  });
  //2 first car
  it('should add first car Audi TT with mileage 50', () => {
    cy.get('button').contains('Add car').click();
    cy.get('#addCarBrand').should('have.value', '0: 1');
    cy.get('#addCarModel').should('have.value', '0: 1');
    cy.get('#addCarMileage').type('50');

    cy.get('.modal-footer').contains('Add').click();

    cy.get('.car-list').contains('Audi TT').should('exist');
  });
  
//3 second car
  it('should add second car BMW 3 with mileage 60', () => {
    cy.get('button').contains('Add car').click();
    cy.get('#addCarBrand').should('have.value', '0: 1');
    cy.get('#addCarBrand').select('1: 2');
    cy.get('#addCarModel').should('have.value', '5: 6');    
    cy.get('#addCarMileage').type('60');

    cy.get('.modal-footer').contains('Add').click();

    cy.get('.car-list').contains('BMW 3').should('exist');
});
});

