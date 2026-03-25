/// <reference types="cypress"/>

describe('Test contact us and cases page', () => {

    // ad ignorer itd 
    beforeEach(() => {
        cy.intercept('GET', '**/pagead/ads**', { statusCode: 200, body: '' }).as('blockAds');
        cy.intercept('GET', '**/google-analytics.com/**', { statusCode: 200, body: '' }).as('blockAnalytics');
    });

    it('#01 | should navigate to contact us page and send message', () => {
        cy.visit('/');
        cy.get('[href="/contact_us"]').click();
        cy.url().should('include', '/contact_us');
        cy.get('#contact-us-form').should('be.visible');
        cy.get('[data-qa="name"]').type('John Doe');
        cy.get('[data-qa="email"]').type('john.doe@example.com');
        cy.get('[data-qa="subject"]').type('Test Subject');
        cy.get('[data-qa="message"]').type('Hello, this is a test message.');
        cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/test.png', { force: true })
        cy.get('[data-qa="submit-button"]').click();
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });

    it('#02 | should navigate to test cases page', () => {
        cy.visit('/');
        cy.get('a[href="/test_cases"]').first().click();
        cy.url().should('include', '/test_cases');
    });

});
