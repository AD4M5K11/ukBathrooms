<template>
  <v-layout row>
    <v-col xs12 md8 offset-md2 lg6 offset-lg3>
      <v-card v-if="articleDetails">
        <v-btn class="mx-auto" color="primary" plain @click="goToHeadlines()">
          <v-icon left icon="mdi-arrow-left-bold"></v-icon>
          <span>Headlines</span>
        </v-btn>
        <v-responsive>
          <v-list subheader style="padding-top: 20px">
            <h1
              class="
                hidden-sm-and-down
                font-weight-light
                display-1
                text-center
                mb-8
              "
            >
              {{ articleDetails.title }}
            </h1>
            <h2 class="hidden-md-and-up px-3 font-weight-light display-1">
              {{ articleDetails.title }}
            </h2>
            <v-layout
              row
              justify-center
              py-2
              class="text-xs-center"
              @click="redirectToArticle(articleDetails.url)"
            >
              <v-responsive max-height="600px">
                <v-img
                  :src="articleDetails.urlToImage || ''"
                  contain
                  class="article-img"
                ></v-img>
              </v-responsive>
            </v-layout>
          </v-list>
          <v-card-title>
            {{ articleDetails.publishedAt }}
          </v-card-title>
          <v-card-text>
            {{ articleDetails.content }}
          </v-card-text>
        </v-responsive>
      </v-card>
      <v-btn class="mx-auto" color="primary" plain @click="next()" aria-placeholder="Next">
      <br />
      <headlines-history />
    </v-col>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import HeadlinesHistory from "../components/HeadlinesHistory.vue";

export default {
  components: {
    HeadlinesHistory,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      articleDetails: "headlines/articleDetails",
    }),
  },
  mounted() {
    const queryTitle = this.$route.query.title;
    this.loadHeadline(queryTitle);
  },
  methods: {
    goToHeadlines() {
      this.$router.push({ path: "/" });
    },
    loadHeadline(title) {
      this.$store.dispatch("headlines/getCurrentHeadline", { title });
    },
    redirectToArticle(url) {
      window.open(url, "blank");
    },
  },
};
</script>

<style scoped>
.article-img {
  cursor: pointer;
}
</style>
