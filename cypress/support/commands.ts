/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('clickMenuDropDownItemContent', (dropdownToggleElement, itemContent) => {
	const dropdownSelector = '.dropdown';
	const dropdownMenuSelector = '.dropdown-menu';
	cy.wrap(dropdownToggleElement).should('exist');
	const dropDownMenuElement = cy.$$(dropdownMenuSelector, dropdownToggleElement.closest(dropdownSelector));
	// if menu isn't visible, click to show it
	if (dropDownMenuElement.length === 0 || !dropDownMenuElement.is(":visible")) {
		cy.wrap(dropdownToggleElement).click();
	}
	cy.wrap(dropdownToggleElement)
		.closest(dropdownSelector)
		.find(dropdownMenuSelector)
		.contains(itemContent)
		.click();
});

declare global {
  namespace Cypress {
    interface Chainable {
		/**
		 * Method to click in an item of a `Dropdown` React Bootstrap component informing its text content
		 * @param dropdownToggleElement The jQuery wrapped element of `Dropdown.Toggle` component.
		 * @param itemContent The text content of the menu item to be clicked
		 * @example
		 * clickMenuDropDownItemContent($dropdownToggleElement, 'Logout') // returns void
		 */
		clickMenuDropDownItemContent(dropdownToggleElement: JQuery<HTMLElement>, itemContent: string): Chainable<void>
    }
  }
}

export default undefined;