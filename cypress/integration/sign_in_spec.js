describe('Signin', function() {
  it('allows user to sign up and signin', function() {
    //  cy.visit('/users/signup');
    //
    // cy.get('#sign-up-form').find('[id="username"]').type('bellabloggs');
    // cy.get('#sign-up-form').find('[id="password"]').type('password123');
    // cy.get('#sign-up-form').find('[id="email"]').type('bella@gmail.com');
    // cy.get('#sign-up-form').submit();
     cy.visit('/users/signin');
    cy.get('#sign-in-form').find('[id="username"]').type('bellabloggs');
    cy.get('#sign-in-form').find('[id="password"]').type('password123');
    cy.get('#sign-in-form').submit();
    cy.get('.welcome').should('contain', 'Welcome bellabloggs');        // expected to go to the Acebook homepage
  });
});
