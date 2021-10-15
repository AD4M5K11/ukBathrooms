<template>
  <v-app-bar density="compact" class="app-bar text-center">
    <v-app-bar-title @click="refresh()" class="bar-title hidden-sm-and-down">{{
      title
    }}</v-app-bar-title>
    <input
      class="pa-1 search-input"
      v-model="searchText"
      placeholder="Search headlines"
      @keyup="searchHeadlines()"
    />
    <v-spacer></v-spacer>
    <v-btn class="hidden-md-and-up mr-2" color="primary" @click="refresh()">
      <v-icon icon="mdi-home-outline"></v-icon>
    </v-btn>
    <v-btn class="ma-2" color="primary" plain @click="showSources">
      <v-icon icon="mdi-filter-outline"></v-icon>
      <span class="hidden-sm-and-down">Filter</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppBar",
  data: () => ({
    searchText: "",
    title: "Headlines",
  }),
  computed: {
    ...mapGetters({
      selectedSource: "sources/selectedSource",
    })
  },
  created() {
    if (this.$store) {
      this.$store.dispatch("sources/getSourcesData");
    }
  },
  methods: {
    showSources() {
      this.$emit("show-sources");
    },
    refresh() {
      this.$store.dispatch("sources/updateSelectedSource", null);
      this.searchText = "";
      this.$emit("refresh");
    },
    searchHeadlines() {
      if (this.$store) {
        this.$store.dispatch("headlines/searchNewsData", {
          searchText: this.searchText,
          source: this.selectedSource
        });
      }
    },
  },
};
</script>

<style scoped>
.bar-title {
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .search-input {
    max-width: 150px;
  }
}
</style>
