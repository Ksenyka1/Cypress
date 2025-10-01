class GaragePage {
  openAddCarModal() {
    cy.contains('button', 'Add Car').click();
    cy.get('.modal-content').should('be.visible');
  }

  addCar(brand, model, mileage) {
    this.openAddCarModal();
    cy.get('#addCarBrand').select(brand);
    cy.get('#addCarModel').select(model);
    cy.get('#addCarMileage').type(mileage);
    cy.contains('button', 'Add').click();
  }

  verifyCarExists(name) {
    cy.get('.car_name h2').contains(name).should('exist');
  }

  getCarContainer(carName) {
    return cy.contains('.car_name', carName).parent();
  }
}

module.exports = new GaragePage();
