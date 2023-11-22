/// <reference types="cypress" />

describe("our first suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by tag name
    // cy.get("input");

    // by id
    cy.get("#inputEmail");

    // by class name
    cy.get(".input-full-width");
  });

  it("email and password labels", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordSecondText);
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .should("contain", "checked");
  });

  it("assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("17").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Nov 17, 2023");
      });
  });

  it("radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).eq(0).should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').first().uncheck({ force: true });
    cy.get('[type="checkbox"]').first().should("not.be.checked");
  });

  it("lists and dropdowns", () => {
    cy.visit("/");

    // 1
    // cy.get("nb-select").click();
    // cy.get(".options-list").contains("Dark").click();
    // cy.get("nb-select").should("contain", "Dark");
    // cy.get("nb-layout-header nav").should(
    //   "have.css",
    //   "background-color",
    //   "rgb(34, 43, 69)"
    // );

    // 2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < Object.keys(colors).length - 1) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it.only("web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });

    // 2

    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Dima");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Povo");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumn) => {
        cy.wrap(tableColumn).eq(2).should("contain", "Dima");
        cy.wrap(tableColumn).eq(3).should("contain", "Povo");
      });

    // 3

    const ages = [20, 30, 40, 200];

    cy.wrap(ages).each((age) => {
      cy.get("thead [placeholder='Age']").clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age === 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").last().should("contain", age);
        }
      });
    });
  });
});
