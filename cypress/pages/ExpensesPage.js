class ExpensesPage {
  openAddExpenseModalForCar(carName) {
    cy.contains('.car_name', carName)
      .parent()
      .within(() => {
        cy.get('button.car_add-expense').click();
      });

    cy.get('.modal-content').should('be.visible');
  }

  addExpense(mileage, liters, cost) {
    cy.get('#addExpenseMileage').type(mileage);
    cy.get('#addExpenseLiters').type(liters);
    cy.get('#addExpenseTotalCost').type(cost);
    cy.contains('button', 'Add').click();
  }

  verifyExpenseExists(mileage, liters, cost) {
    cy.get('.expenses_table')
      .contains('td', mileage).should('exist')
      .parent('tr')
      .within(() => {
        cy.contains(liters).should('exist');
        cy.contains(cost).should('exist');
      });
  }

  verifyVehicleDropdown(carName) {
    cy.get('label[for="addExpenseCar"]').should('be.visible');
    cy.get('select#addExpenseCar option:selected').should('have.text', carName);
  }
}

module.exports = new ExpensesPage();

