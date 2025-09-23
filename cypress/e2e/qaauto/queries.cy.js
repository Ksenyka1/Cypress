///<reference types="cypress"/>

describe('Header and Footer Elements', () => {
  beforeEach(() => {
    cy.visit('/')
  })

//1 Header buttons
  it('Finds the Sign In button in the header', () => {
    cy.contains('button', 'Sign In').should('be.visible');
  })
  it('Finds the Guest log in button in the header', () => {
    cy.contains('button', 'Guest log in').should('be.visible');
  })
  it('Finds the Contacts in button in the header', () => {
    cy.contains('button', 'Contacts').should('be.visible');
  })
  it('Finds the About in button in the header', () => {
    cy.contains('button', 'About').should('be.visible');
  })
  it('Finds the Home link in the header', () => {
  cy.contains('a', 'Home').should('be.visible');
  });

// 2 links in the Contacts section
it('Finds all links in the Contacts section', () => {
  const socialLinks = [
    'facebook.com/Hillel.IT.School',
    't.me/ithillel_kyiv',
    'youtube.com/user/HillelITSchool',
    'instagram.com/hillel_itschool',
    'linkedin.com/school/ithillel'
  ]

  socialLinks.forEach(link => {
    cy.get('#contactsSection .contacts_socials')
      .find(`a[href*="${link}"]`)
      .should('be.visible')
  })

  //3 інші лінки
  const otherLinks = [
    'ithillel.ua',
    'mailto:developer@ithillel.ua'
  ]

  otherLinks.forEach(link => {
    cy.get('#contactsSection')
      .find(`a[href*="${link}"]`)
      .should('be.visible')
  })
})


//4 Footer links
  it('Finds all links in the footer', () => {
    cy.get('footer a').each(($el) => {
      cy.wrap($el).should('be.visible')      
      cy.wrap($el).should('have.attr', 'href')
    })
  })
});
