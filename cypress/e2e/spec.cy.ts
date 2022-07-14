const INITIAL_URL = 'http://localhost:3000/';

describe('Index route redirects to Users', () => {
  beforeEach(() => {
    cy.visit(INITIAL_URL);
  });
  it('URL should be /users', () => {
    cy.location("pathname")
      .should("equal", "/users");
  });
  it('should render Users!', () => {
    cy.get('[data-testid="Users"]')
      .should('exist');
  });
});

describe('Acessing wrong path', () => {
  it('should render 404!', () => {
    cy.visit(INITIAL_URL + '/invalid')
      .get('[data-testid="Page404"]')
      .should('exist');
  });
});

describe('Interacting in Users with menu & table', () => {
  it('Click in menu toggle, shows menu.', () => {
    const dropdownMenuSelector = '.UsersMenu [data-testid="Dropdown.Menu"]';
    const dropdownToggleSelector = '.UsersMenu [data-testid="Dropdown.Toggle"';
    cy.visit(INITIAL_URL);
    cy.get(dropdownMenuSelector)
      .should('not.exist');
    cy.get(dropdownToggleSelector)
      .click();
    cy.get(dropdownMenuSelector)
      .should('exist');
  });
});
