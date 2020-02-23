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
    cy.get('#add-employee').find('[id="firstname"]').type('Anna');
    cy.get('#add-employee').find('[id="lastname"]').type('Bloggs');
    cy.get('#add-employee').find('[id="jobtitle"]').type('Engineer');
    cy.get('#add-employee').find('[id="startdate"]').type('2020-05-20');
    cy.get('#add-employee').find('[id="employeenumber"]').type('900');
    cy.get('#add-employee').find('[id="email"]').type('annabloggs@gmail.com');
    cy.get('#add-employee').find('[id="manager"]').select('Joe Bloggs');
    cy.get('#add-employee').submit();
    cy.get('.addemployee').should('contain', 'Add Employee');

  });
});
