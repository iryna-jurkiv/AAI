describe('Search', function() {
  it('allows HR to search for employees', function() {
     // cy.visit('/users/signup');

     // cy.get('#sign-up-form').find('[id="fullname"]').type('jon logg');
     // cy.get('#sign-up-form').find('[id="email"]').type('jon@gmail.com');
     // cy.get('#sign-up-form').find('[id="password"]').type('password123');
     // cy.get('#sign-up-form').find('[id="password2"]').type('password123');
     // cy.get('#sign-up-form').submit();
     cy.visit('/users/signin');
    cy.get('#sign-in-form').find('[id="email"]').type('jon@gmail.com');
    cy.get('#sign-in-form').find('[id="password"]').type('password123');
    cy.get('#sign-in-form').submit();
    cy.get('#search-form').type('Anna')
    cy.get('#search-form').submit();
    cy.get('.results').should('contain', 'Anna Bloggs');        // expected to go to the Acebook homepage
  });
});
