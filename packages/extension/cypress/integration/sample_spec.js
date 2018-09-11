/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("https://storage.googleapis.com/diff-tester/index.html");
  });

  it("can open extension", () => {
    cy.wait(5000);
    cy.window().then(win => {
      win.postMessage("test", "*");
    });
  });
});
