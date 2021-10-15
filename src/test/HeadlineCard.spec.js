import { mount } from "@cypress/vue";
import HeadlineCard from "../components/HeadlineCard.vue";

describe("Headline Card", () => {
  it("Renders the card component correctly", () => {
    mount(HeadlineCard, {
      propsData: {
        headline: {
          title: "Card Test",
          urlToImage:
            "https://www.google.co.uk/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2FAutos%2Fcomments%2Ffljfda%2Fmazda_rx7_fd3s_triple_black_rx7%2F&psig=AOvVaw1EDmPnb38v9CU9Yo4qdR2e&ust=1634404547210000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCPCd4sb1zPMCFQAAAAAdAAAAABAJ",
          publishedAt: "Thu, Mar 19 2020 10:39:27 GMT",
        },
      },
    });

    cy.get("v-card").should("be.visible");
    cy.get("v-card-title").should("contain.text", "Card Test");
    cy.get("v-card-subtitle").should(
      "contain.text",
      "Thu, Mar 19 2020 10:39:27 GMT"
    );
    cy.get("v-btn").first().should("be.visible").should("contain.text", "Edit");
    cy.get("v-btn").eq(1).should("be.visible").should("contain.text", "More");
  });
});
