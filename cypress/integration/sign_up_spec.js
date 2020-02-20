describe('Signup', function() {
  it('allows user to register', function() {
    cy.visit('users/signup');
    cy.get('#sign-up-form').find('[id="username"]').type('joblogg');
    cy.get('#sign-up-form').find('[id="password"]').type('password123');
    cy.get('#sign-up-form').find('[id="email"]').type('jo@gmail.com');
    cy.get('#sign-up-form').submit();

    cy.get('.signin').should('contain', 'This is the sign in page');
  });
});
