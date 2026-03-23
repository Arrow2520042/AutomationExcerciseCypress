/// <reference types="cypress"/>

function navigateToLoginPage() {
    cy.visit('/'); // https://automationteststore.com/
    cy.get('[href="/login"]').click();
    cy.get('.login-form').should('be.visible');
    cy.get('.signup-form').should('be.visible');
    cy.get('.header-middle').should('be.visible');
}

function createAccount(name: string, email: string, password: string) {
    navigateToLoginPage();
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-name"]').should('have.value', name);
    cy.get('[data-qa="signup-email"]').should('have.value', email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('.header-middle').should('be.visible');
    cy.get('.login-form').should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('#id_gender1').should('be.checked');
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="password"]').should('have.value', password);

}

describe('', () => {


    /*it('#01 | login form should not pass with invalid credentials', () => {
        navigateToLoginPage();

        cy.get('[data-qa="login-email"]').type('malpamalpa')
        cy.get('[data-qa="login-password"]').type('malpamalpa')

        cy.get('[data-qa="login-button"]').click();

    });*/

    it('#02 | login form should pass with valid credentials', () => {
        createAccount('malpamalpa', 'malpamalpa@example.com', 'haslomalpa');



    });







});