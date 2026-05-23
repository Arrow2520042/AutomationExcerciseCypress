/// <reference types="cypress"/>

import { productsPage } from '../selectors/productsPageSelectors';
import { urls } from '../support/urls';

describe('Contact us, cases, and products tests', () => {

    // ad blockers etc.
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

    it('#03 | should search for product and show results', () => {
        const searchTerm = 'Top';

        cy.visit(urls.productsPage);
        cy.contains(productsPage.productsTitle, 'All Products').should('be.visible');

        cy.get(productsPage.searchProductInput).should('be.visible').type(searchTerm);
        cy.get(productsPage.submitSearchBtn).should('be.visible').click();

        cy.contains(productsPage.productsTitle, 'Searched Products').should('be.visible');
        cy.get(productsPage.productsList)
            .find(productsPage.productCard)
            .should('have.length.greaterThan', 0);

        cy.get(productsPage.productName).then($names => {
            const hasMatch = Array.from($names, item => item.textContent || '')
                .some(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

            expect(hasMatch).to.eq(true);
        });
    });

    it('#04 | should add product to cart', () => {
        cy.intercept('GET', '**/add_to_cart/**').as('addToCart');
        cy.visit(urls.productsPage);

        cy.get(productsPage.productCard).first().trigger('mouseover');
        cy.get(productsPage.addCartBtn).first().click();
        cy.wait('@addToCart');

        cy.contains(productsPage.viewCartLink, 'View Cart').should('be.visible').click();

        cy.url().should('include', urls.cartPage);
        cy.contains('Cart is empty').should('not.be.visible');
        cy.get(productsPage.cartDescription)
            .should('be.visible')
            .and('have.length.greaterThan', 0);
    });

});
