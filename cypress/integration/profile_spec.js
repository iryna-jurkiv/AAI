describe('Profile', function() {
  it('users can view their profile', function() {

    // cy.visit('/users/signup');
    //
    // cy.get('#sign-up-form').find('[id="fullname"]').type('Joke Bloggs');
    // cy.get('#sign-up-form').find('[id="email"]').type('joke@gmail.com');
    // cy.get('#sign-up-form').find('[id="password"]').type('password123');
    // cy.get('#sign-up-form').find('[id="password2"]').type('password123');
    // cy.get('#sign-up-form').submit();
    cy.visit('/users/signin');

   cy.get('#sign-in-form').find('[id="email"]').type('jon@gmail.com');
   cy.get('#sign-in-form').find('[id="password"]').type('password123');
   cy.get('#sign-in-form').submit();

    cy.visit('/users/profile');

    cy.get('.profile').should('contain', 'jon@gmail.com\'s profile');

  });
});
