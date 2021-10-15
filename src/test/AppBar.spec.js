import { mount } from "@cypress/vue";
import AppBar from "../components/AppBar.vue";

describe("AppBar", () => {
  beforeEach(() => {
    mount(AppBar);
  });

  it("Displays the Headline title", () => {
    cy.get("v-app-bar-title").should("have.text", "Headlines");
  });

  it("Displays the input for searching", () => {
    cy.get("input")
      .first()
      .should("be.visible")
      .invoke("attr", "placeholder")
      .should("contain", "Search headlines");
    cy.get("input").type("test");
    cy.get("input").should("have.value", "test");
  });

  it("Displays the filter button", () => {
    cy.get("v-btn").first().should("be.visible").should("have.text", "Filter");
  });
});
