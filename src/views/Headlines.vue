<template>
  <app-bar @show-sources="openSourcesDialog()" @refresh="fetchHeadlinesOfSource" />
  <h1> Loading... </h1>
  <headline />
</template>

<script>
import { mapGetters } from "vuex";
import AppBar from "../components/AppBar.vue";
import EditTitleDialog from "../components/EditTitleDialog.vue";
import SourcesDialog from "../components/SourcesDialog.vue";
import HeadlineCard from "../components/HeadlineCard.vue";
import Headline from './Headline.vue';

export default {
  name: "Headlines",
  components: {
    AppBar,
    EditTitleDialog,
    SourcesDialog,
    HeadlineCard,
    Headline,
  },
  data: () => ({
    isEditingHeadline: false,
  }),
  computed: {
    ...mapGetters({
      headlines: "headlines/allHeadlines",
      loading: "headlines/loadingState",
      selectedSource: "sources/selectedSource",
    }),
    columns() {
      switch (
        this.$vuetify.display.name
      ) {
        default:
          return 5;
      }
    },
  },
  created() {
    this.fetchAllHeadlines();
  },
  methods: {
    openHeadlinePage(title) {
      this.$store.dispatch("headlines/getCurrentHeadline", {
        title,
        log: true,
      });
      this.$router.push({ path: "/headline", query: { title: title } });
    },
    openEditDialog(title) {
      this.isEditingHeadline = true;
      this.$refs.editDialog.currentTitle = title;
      this.$refs.editDialog.title = title;
      this.$refs.editDialog.show = true;
    },
    openSourcesDialog(title) {
      this.$refs.sourcesDialog.show = true;
    },
    fetchAllHeadlines() {
      this.$store.dispatch("headlines/getNewsData");
    },
    fetchHeadlinesOfSource() {
      this.$store.dispatch("headlines/getNewsData", this.selectedSource);
    },
  },
};
</script>

