describe('Add Employee', function() {
  it('HR can add employees', function() {

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

    cy.visit('/users/addemployee');
    cy.get('#contact-form').find('[id="firstname"]').type('Anna');
    cy.get('#contact-form').find('[id="lastname"]').type('Bloggs');
    cy.get('#contact-form').find('[id="jobtitle"]').type('Engineer');
    cy.get('#contact-form').find('[id="startdate"]').type('2020-05-20');
    cy.get('#contact-form').find('[id="employeenumber"]').type('900');
    cy.get('#contact-form').find('[id="email"]').type('annabloggs@gmail.com');
    cy.get('#contact-form').find('[id="manager"]').select('Joe Bloggs');
    cy.get('#contact-form').submit();
    cy.get('#contact-form').should('contain', 'Add Employee');

  });
});
