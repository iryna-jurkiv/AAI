describe('Signin', function() {
  it('allows staff to signin', function() {
     cy.visit('/');
    cy.get('#sign-in-form').find('[id="email"]').type('employee@gmail.com');
    cy.get('#sign-in-form').find('[id="password"]').type('password');
    cy.get('#sign-in-form').submit();
    cy.get('.welcome').should('contain', 'Welcome Employee');        // expected to go to the Acebook homepage
  });
});
