describe('Profile', function() {
  it('users can view their profile', function() {

    // cy.visit('/users/signup');

    // cy.get('#sign-up-form').find('[id="fullname"]').type('Joe Bloggs');
    // cy.get('#sign-up-form').find('[id="email"]').type('joe@gmail.com');
    // cy.get('#sign-up-form').find('[id="username"]').type('joebloggs');
    // cy.get('#sign-up-form').find('[id="password"]').type('password123');
    // cy.get('#sign-up-form').find('[id="repeat_password"]').type('password123');
    // cy.get('#sign-up-form').submit();

    cy.visit('/users/signin');
   cy.get('#sign-in-form').find('[id="username"]').type('bellabloggs');
   cy.get('#sign-in-form').find('[id="password"]').type('password123');
   cy.get('#sign-in-form').submit();

    cy.visit('/users/profile');

    cy.get('.profile').should('contain', 'bellabloggs\'s profile');

  });
});
