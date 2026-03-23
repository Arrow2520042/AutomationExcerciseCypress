/// <reference types="cypress"/>

interface UserData {
    Name: string;
    Email: string;
    Password: string;
}

const TestUser: UserData = {
    Name: 'malpa',
    Email: 'malpa@malpa',
    Password: 'haslomalpa'
};

function navigateToLoginPage() {
    cy.visit('/'); // https://automationteststore.com/
    cy.get('[href="/login"]').click();

    cy.get('.login-form').should('be.visible');
    cy.get('.signup-form').should('be.visible');
}

function createAccount(user: UserData) {

    navigateToLoginPage();

    // Krok 1: Wstępna rejestracja
    cy.get('[data-qa="signup-name"]').type(user.Name);
    cy.get('[data-qa="signup-email"]').type(user.Email);
    cy.get('[data-qa="signup-button"]').click();
    
    // Oczekiwanie na załadowanie drugiego formularza
    cy.get('.login-form').should('be.visible');
    
    // Krok 2: Wypełnianie właściwego formularza 
    cy.get('#id_gender1').check;
    cy.get('[data-qa="password"]').type(user.Password);  
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(user.Name);
    cy.get('[data-qa="last_name"]').type('Testowy');
    cy.get('[data-qa="company"]').type('QA Corp');
    cy.get('[data-qa="address"]').type('Testowa 15');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('New York');
    cy.get('[data-qa="city"]').type('New York City');
    cy.get('[data-qa="zipcode"]').type('12345');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    
    // Krok 3: Wysłanie formularza i weryfikacja
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible');
}

function deleteAccount() {
    cy.visit('/');
    cy.get('[href="/delete_account"]').click();
    cy.url().should('include', '/account_deleted');
}

describe('Testy logowania i rejestracji', () => {

    // ad ignorer itd 
    beforeEach(() => {
        cy.intercept('GET', '**/pagead/ads**', { statusCode: 200, body: '' }).as('blockAds');
        cy.intercept('GET', '**/google-analytics.com/**', { statusCode: 200, body: '' }).as('blockAnalytics');
    });

    // testy
    it('#01 | signup form should pass with valid credentials', () => {
        createAccount(TestUser);
        cy.get('[data-qa="account-created"]').should('be.visible');
        cy.url().should('include', '/account_created');
        deleteAccount();
    });

    it('#02 | login form should not pass with empty credentials', () => {
        navigateToLoginPage();
        cy.get('[data-qa="login-button"]').click();
        cy.get('[data-qa="login-email"]').invoke('prop', 'validationMessage').should('not.be.empty');
    });

    it('#03 | login form should not pass with invalid credentials', () => {
        navigateToLoginPage();
        cy.get('[data-qa="login-email"]').type('malpam@alpa');
        cy.get('[data-qa="login-password"]').type('malpamalpa');
        cy.get('[data-qa="login-button"]').click();
        cy.get('[data-qa="login-email"]').invoke('prop', 'validationMessage').should('not.be.empty');
    });

    it('#04 | login form should pass with valid credentials', () => {
        createAccount(TestUser);
        navigateToLoginPage();
        cy.get('[data-qa="login-email"]').type(TestUser.Email);
        cy.get('[data-qa="login-password"]').type(TestUser.Password);
        cy.get('[data-qa="login-button"]').click();
    });

});