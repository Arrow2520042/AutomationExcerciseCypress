// ***********************************************
// This example commands.js shows you how to
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

import { ILoginAccount } from "../interfaces/account.interface";
import { loginPage } from "../selectors/loginPageSelectors";

declare global {
    namespace Cypress {
        interface Chainable {
            /*
             * Simple method to log into application
             * @example cy.logIntoApp('test', 'test1');
             */
            logIntoApp(parameters: ILoginAccount): Chainable<JQuery<HTMLElement>>
        }
    }
}

Cypress.Commands.add('logIntoApp', (parameters: ILoginAccount) => {
    cy.intercept('GET', 'https://ep1.adtrafficquality.google/getconfig/sodar?**').as('loadPage');

    cy.get(loginPage.loginInput).should('be.visible').type(parameters.email);
    cy.get(loginPage.passwordInput).should('be.visible').type(parameters.password);

    cy.get(loginPage.loginBtn).should('be.visible').click();
    cy.wait('@loadPage');
});
