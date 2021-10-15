import { mount } from "@cypress/vue";
import EditTitleDialog from "../components/EditTitleDialog.vue";

describe("Edit Title Dialog", () => {
  beforeEach(() => {
    mount(EditTitleDialog);
  });
  it("Renders the dialog component correctly", () => {
    cy.get("v-dialog").should("be.visible");
    cy.get("v-card").should("be.visible");
  });

  it("has the default layout", () => {
    cy.get(".text-h4").should("have.text", "Edit Headline");
    cy.get("textarea")
      .should("be.visible")
      .invoke("attr", "placeholder")
      .should("contain", "Max 100 chars");

    cy.get("v-btn").first().should("be.visible")
        .should("contain.text", "Save");
    cy.get("v-btn").eq(1).should("be.visible")
        .should("contain.text", "Close");
  });
});
