describe('Signup', function() {
  it('allows user to register', function() {
    cy.visit('/hr/signup');
    cy.get('#sign-up-form').find('[id="fullname"]').type('Gemma L');
    cy.get('#sign-up-form').find('[id="email"]').type('gemma@gmail.com');
    cy.get('#sign-up-form').find('[id="password"]').type('password123');
    cy.get('#sign-up-form').find('[id="password2"]').type('password123');
    cy.get('#sign-up-form').find('[id="access"]').select('HR');
    // cy.get('#sign-up-form').submit();

    cy.get('#submit').click();

    // cy.get('.signin').should('contain', 'This is the sign in page');
  });
});
