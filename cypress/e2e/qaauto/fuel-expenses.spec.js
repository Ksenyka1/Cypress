describe('Garage - fuel expense', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.get('h1').contains('Garage').should('exist');
  });

//BMW 3
  it('add fuel expense for BMW 3 and verify table', () => {
  const liters = 70;
  const totalCost = 1000;

  cy.contains('.car_name', 'BMW 3')
    .closest('.car.jumbotron')
    .within(() => {
      cy.get('button.car_add-expense').click();
    });

  cy.get('.modal-content').should('exist');
  cy.get('#addExpenseCar').find(':selected').should('have.text', 'BMW 3');

  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('uk-UA').replace(/\//g, '.');
  cy.get('#addExpenseDate').should('have.value', formattedDate);

  cy.get('#addExpenseMileage')
    .invoke('val')
    .then((val) => {
      const nextMileage = parseInt(val || '0') + 1;
      cy.get('#addExpenseMileage').clear().type(nextMileage);

      cy.get('#addExpenseLiters').type(liters);
      cy.get('#addExpenseTotalCost').type(totalCost);

      cy.get('.modal-footer').contains('Add').click();

      cy.get('#carSelectDropdown').contains('BMW 3').should('exist');
      cy.get('table tbody tr').first().within(() => {
        cy.get('td').eq(0).should('have.text', formattedDate); 
        cy.get('td').eq(1).should('have.text', nextMileage.toString()); 
        cy.get('td').eq(2).should('contain', liters + 'L'); 
        cy.get('td').eq(3).should('contain', totalCost + '.00 USD'); 
      });
    });
});


//2 Audi TT
  it('add fuel expense for Audi and verify table', () => {
  const liters = 70;
  const totalCost = 1000;

  cy.contains('.car_name', 'Audi TT') 
  .closest('.car.jumbotron')        
  .within(() => {                   
    cy.get('button.car_add-expense').click(); 
  });
  cy.get('.modal-content').should('exist');
  cy.get('#addExpenseCar').find(':selected').should('have.text', 'Audi TT');

  const today = new Date();
  const formattedDate = today
    .toLocaleDateString('uk-UA')
    .replace(/\//g, '.');
  cy.get('#addExpenseDate').should('have.value', formattedDate);


  cy.get('#addExpenseMileage')
    .invoke('val')
    .then((val) => {
      const nextMileage = parseInt(val || '0') + 1;
      cy.get('#addExpenseMileage').clear().type(nextMileage);
    });

  cy.get('#addExpenseLiters').type('70');
  cy.get('#addExpenseTotalCost').type('1000');

  cy.get('.modal-footer').contains('Add').click();

  cy.get('#carSelectDropdown').contains('Audi TT').should('exist');
      cy.get('table tbody tr').first().within(() => {
        cy.get('td').eq(0).should('have.text', formattedDate); 
        cy.get('td').eq(2).should('contain', liters + 'L'); 
        cy.get('td').eq(3).should('contain', totalCost + '.00 USD'); 
      });
    });
});
