/// <reference types="cypress" />

import { onFormsLayoutsPage } from "../support/pageObjects/formLayoutsPage";
import { navigateTo } from "../support/pageObjects/navigationPage";

describe("Test with page objects", () => {
  beforeEach(() => {
    cy.openHomePage()
  });

  it("should verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });

  it("should submit inline and basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormsLayoutsPage.submitInlineForm();
  });
});
