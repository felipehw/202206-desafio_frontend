import users from '../../src/api/__mocks__/users';
const INITIAL_URL = 'http://localhost:3000';

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

describe('Navigate to /failed-request when server returns invalid value, user try again, server returns valid value, load users.', () => {
  beforeEach(() => {
    cy.intercept('http://**').as('httpGeneric');
    cy.intercept('https://**').as('httpsGeneric');
  });
  it('Navigate to /failed-request when server returns invalid value', () => {
    cy.intercept(
      'https://jsonplaceholder.typicode.com/users/',
      { statusCode: 404, body: {} }
    ).as('404UsersApi');
    cy.visit(INITIAL_URL);
    cy.location("pathname")
      .should("equal", "/users");
    cy.wait('@404UsersApi');
    cy.location("pathname")
      .should("equal", "/failed-request");
  });
  it('User try again, server returns valid value, load users.', () => {
    cy.intercept('https://jsonplaceholder.typicode.com/users/').as('usersApi');
    cy.get('[data-testid="linkToReturn"]').click();
    cy.wait('@usersApi');
    cy.location("pathname")
      .should("equal", "/users");
  });
});

describe('Navigate to /offline when occurs NetworkError, user try again, server answer, load users.', () => {
  it('Navigate to /offline when occurs NetworkError', () => {
    cy.intercept(
      'https://jsonplaceholder.typicode.com/users/',
      { forceNetworkError: true }
    ).as('networkErrorUsersApi');
    cy.visit(INITIAL_URL);
    cy.location("pathname")
      .should("equal", "/users");
    cy.wait('@networkErrorUsersApi');
    cy.location("pathname")
      .should("equal", "/offline");
  });
  it('User try again, server answer, load users.', () => {
    cy.intercept('https://jsonplaceholder.typicode.com/users/').as('usersApi');
    cy.get('[data-testid="linkToReturn"]').click();
    cy.wait('@usersApi');
    cy.location("pathname")
      .should("equal", "/users");
  });
});

describe('Navigate to a non-existent route, click on link in Page404, return to index root route', () => {
  it('Navigate to a non-existent route should render 404!', () => {
    cy.visit(INITIAL_URL + '/invalid')
      .get('[data-testid="Page404"]')
      .should('exist');
  });
  it('click on link in Page404, return to index root route', () => {
    cy.get('[data-testid="LinkToRoot"]').click();
    cy.location("pathname")
      .should("equal", "/users");
  });
});

describe('renders the correct number of lines for the mocked Users', () => {
  it('renders the correct number of lines for the mocked Users', () => {
    cy.intercept('https://jsonplaceholder.typicode.com/users/', users).as('usersApi');
    cy.visit(INITIAL_URL);
    cy.wait('@usersApi');
    cy.get('[data-testid="User"]').should('have.length', users.length);
  });
  it('renders the correct number of lines for the fixture users.json', () => {
    cy.intercept('https://jsonplaceholder.typicode.com/users/', { fixture: 'users.json' }).as('usersApi');
    cy.visit(INITIAL_URL);
    cy.wait('@usersApi');
    cy.get('[data-testid="User"]').should('have.length', 2);
  });
});

describe('Interacting in Users with menu & table', () => {
  type ColsTestData = { colName: string, colTestId: string, dropDownTestId: string };
  const colsTestData: ColsTestData[] = [
    { colName: 'Usuário', colTestId: 'UserCol', dropDownTestId: 'Dropdown.Item.UserCol' },
    { colName: 'Email', colTestId: 'EmailCol', dropDownTestId: 'Dropdown.Item.EmailCol' },
    { colName: 'Cliente', colTestId: 'ClientCol', dropDownTestId: 'Dropdown.Item.ClientCol' },
    { colName: 'Perfil de acesso', colTestId: 'ProfileCol', dropDownTestId: 'Dropdown.Item.ProfileCol' },
  ];
  const dropdownMenuSelector = '.UsersMenu [data-testid="Dropdown.Menu"]';
  const dropdownToggleSelector = '.UsersMenu [data-testid="Dropdown.Toggle"';
  it('Click in menu toggle, shows menu.', () => {
    cy.visit(INITIAL_URL);
    cy.get(dropdownMenuSelector)
      .should('not.exist');
    cy.get(dropdownToggleSelector)
      .click();
    cy.get(dropdownMenuSelector)
      .should('exist');
  });
  it('All columns are exhibited', () => {
    cy.wrap(colsTestData).each((col: ColsTestData, index, array) => {
      cy.get(`[data-testid="${col.colTestId}"]`).should('exist');
    });
  });
  /*
  it('Each one of the columns is hidden/shown', () => {
    cy.wrap(colsTestData).each((col: ColsTestData, index, array) => {
      cy.get(`[data-testid="${col.colTestId}"]`).should('exist');
      cy.get(`[data-testid="${col.dropDownTestId}"]`)
        .click();
      cy.get(`[data-testid="${col.colTestId}"]`).should('not.exist');
      cy.get(`[data-testid="${col.dropDownTestId}"]`)
        .click();
      cy.get(`[data-testid="${col.colTestId}"]`).should('exist');
    });
  });
  */
  colsTestData.forEach((col) => {
    it(`Column ${col.colName} is hidden/shown`, () => {
      cy.get(`[data-testid="${col.colTestId}"]`).should('exist');
      cy.get(`[data-testid="${col.dropDownTestId}"]`)
        .click();
      cy.get(`[data-testid="${col.colTestId}"]`).should('not.exist');
      cy.get(`[data-testid="${col.dropDownTestId}"]`)
        .click();
      cy.get(`[data-testid="${col.colTestId}"]`).should('exist');
    });
  });
  it(`Item "Usuário" hidden/shown column`, () => {
    cy.get(`[data-testid=UserCol]`).click();
    cy.get(`[data-testid=UserCol]`).should('exist');
    cy.get(dropdownToggleSelector).within((dropdownToggleElement) => {
      cy.clickMenuDropDownItemContent(dropdownToggleElement, 'Usuário');
    });
    cy.get(`[data-testid=UserCol]`).should('not.exist');
    cy.get(dropdownToggleSelector).within((dropdownToggleElement) => {
      cy.clickMenuDropDownItemContent(dropdownToggleElement, 'Usuário');
    });
    cy.get(`[data-testid=UserCol]`).should('exist');
  });
});
