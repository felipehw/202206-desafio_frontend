const INITIAL_URL = 'http://localhost:3000/';

describe('Index route render Users', () => {
  beforeEach(() => {
    cy.visit(INITIAL_URL);
  });
  it('Visit site!', () => {
    cy.get('body').find('[data-testid="Users"]').should('exist');
  });
});

describe('Acessing wrong path', () => {
  it('Visit site, then go wrong path, redirected to 404!', () => {
    cy.visit(INITIAL_URL);
    cy.get('body').find('[data-testid="Users"]').should('exist');
    cy.visit(INITIAL_URL + '/invalid');
    cy.get('body').find('[data-testid="Page404"]').should('exist');
  });
});

describe('Interacting in Users with menu & table', () => {
  it('Click in menu toggle, shows menu.', () => {
    cy.visit(INITIAL_URL);
    cy.get('.UsersMenu').find('[data-testid="Dropdown.Menu"]').should('not.exist');
    cy.get('[data-testid="Dropdown.Toggle"').click();
    cy.get('.UsersMenu').find('[data-testid="Dropdown.Menu"]').should('exist');
  });
});
