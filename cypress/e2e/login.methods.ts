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

    // Step 1: Initial signup
    cy.get('[data-qa="signup-name"]').type(user.Name);
    cy.get('[data-qa="signup-email"]').type(user.Email);
    cy.get('[data-qa="signup-button"]').click();
    
    // Wait for the second form to load
    cy.get('.login-form').should('be.visible');
    
    // Step 2: Fill the main form
    cy.get('#id_gender1').check({ force: true });
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
    
    // Step 3: Submit and verify
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible');
}

function deleteAccount() {
    cy.visit('/');
    cy.get('[href="/delete_account"]').click();
    cy.url().should('include', '/delete_account');
}

describe('Registration and login tests', () => {

    // ad blockers etc.
    beforeEach(() => {
        cy.intercept('GET', '**/pagead/ads**', { statusCode: 200, body: '' }).as('blockAds');
        cy.intercept('GET', '**/google-analytics.com/**', { statusCode: 200, body: '' }).as('blockAnalytics');
    });

    // tests

    it('#00 | delete test account if exists', () => {
        navigateToLoginPage();
        cy.get('[data-qa="login-email"]').type(TestUser.Email);
        cy.get('[data-qa="login-password"]').type(TestUser.Password);
        cy.get('[data-qa="login-button"]').click();

        const invalidLoginText = 'Your email or password is incorrect!';

        cy.get('body', { timeout: 10000 }).then($body => {
            if ($body.find('[href="/delete_account"]').length) {
                deleteAccount();
                return;
            }

            if ($body.text().includes(invalidLoginText)) {
                cy.contains(invalidLoginText).should('be.visible');
                return;
            }

            cy.get('[href="/delete_account"]', { timeout: 10000 }).should('be.visible');
            deleteAccount();
        });
    })


    it('#01 | create new account -> logout -> login -> delete account', () => {
        createAccount(TestUser);
        cy.visit('/');
        cy.get('[href="/logout"]').click();
        navigateToLoginPage();
        cy.get('[data-qa="login-email"]').type(TestUser.Email);
        cy.get('[data-qa="login-password"]').type(TestUser.Password);
        cy.get('[data-qa="login-button"]').click();
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
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('#04 | Register User with existing email', () => {
        createAccount(TestUser);
        cy.get('[data-qa="continue-button"]').click();
        cy.get('[href="/logout"]').click();
        cy.get('[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type('Another User');
        cy.get('[data-qa="signup-email"]').type(TestUser.Email);
        cy.get('[data-qa="signup-button"]').click();
        cy.contains('Email Address already exist!').should('be.visible');        
    });

   

});