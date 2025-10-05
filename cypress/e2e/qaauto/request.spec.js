describe('API tests - create car interception and expenses', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.get('h1').contains('Garage').should('exist');
  });

  
  it('should intercept POST /api/cars and save BMW 3 id', () => {
    cy.intercept('POST', '**/api/cars').as('createCar');

    cy.contains('button', 'Add car').click();
    cy.get('#addCarBrand').should('have.value', '0: 1');
    cy.get('#addCarModel').should('have.value', '0: 1');
    cy.get('#addCarMileage').type('123');
    cy.get('.modal-footer').contains('Add').click();

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const createdCarId = interception.response.body.data.id;
      expect(createdCarId).to.exist;

      cy.writeFile('cypress/fixtures/createdCar.json', [{ id: createdCarId, mileage: 123 }]);
    });
  });

  it('should intercept POST /api/cars and save Audi TT id', () => {
    cy.intercept('POST', '**/api/cars').as('createCar');

    cy.contains('button', 'Add car').click();
    cy.get('#addCarBrand').should('have.value', '0: 1');
    cy.get('#addCarBrand').select('1: 2');
    cy.get('#addCarModel').should('have.value', '5: 6');
    cy.get('#addCarMileage').type('60');
    cy.get('.modal-footer').contains('Add').click();

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const createdCarId = interception.response.body.data.id;
      expect(createdCarId).to.exist;

      cy.readFile('cypress/fixtures/createdCar.json').then((cars = []) => {
        cars.push({ id: createdCarId, mileage: 60 });
        cy.writeFile('cypress/fixtures/createdCar.json', cars);
      });
    });
  });

  
  it('verify that created cars exist GET /api/cars', () => {
    cy.readFile('cypress/fixtures/createdCar.json').then((cars) => {
      cy.request('GET', 'https://qauto.forstudy.space/api/cars').then((res) => {
        expect(res.status).to.eq(200);

        cars.forEach((car) => {
          const foundCar = res.body.data.find((c) => c.id === car.id);
          expect(foundCar).to.exist;
          expect(foundCar.mileage).to.eq(car.mileage);
        });
      });
    });
  });

  
     it('should create expense for BMW 3 and validate response', () => {
    cy.readFile('cypress/fixtures/createdCar.json').then((cars) => {
      const bmw = cars[0];
      const todayMileage = 125; 

      cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/expenses',
        body: {
          carId: bmw.id,
          mileage: todayMileage + 1, 
          liters: 70,
          totalCost: 1000,
          reportedAt: new Date().toISOString().split('T')[0],
          forceMileage: false
        },
        failOnStatusCode: false
      }).then((res) => {
        cy.log(JSON.stringify(res.body));
        expect(res.status).to.eq(200);
      });
    });
  });

  it('should create expense for Audi TT and validate response', () => {
    cy.readFile('cypress/fixtures/createdCar.json').then((cars) => {
      const audi = cars[1];  

      cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/expenses',
        body: {
          carId: audi.id,
          mileage: 81, 
          liters: 50,
          totalCost: 900,
          reportedAt: new Date().toISOString().split('T')[0],
          forceMileage: false
        },
        failOnStatusCode: false
      }).then((res) => {
        cy.log(JSON.stringify(res.body));
        expect(res.status).to.eq(200);
      });
    });
  });
  
});




