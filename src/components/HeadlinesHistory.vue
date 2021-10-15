<template>
  <v-card @click="wrongApiCall()">
    <v-divider></v-divider>
    <v-card-title>Last seen headlines</v-card-title>
    <v-card-text>
      <v-container>
        <v-row
          v-for="headline in history"
          class="d-flex child-flex"
          :key="headline.title"
        >
          <v-card flat class="card bg-grey source-card my-2" max-width="100%">
            <v-card-title>{{ headline.title }}</v-card-title>
          </v-card>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'HeadlinesHistory',
  computed: {
    ...mapGetters({
      history: "headlines/historyHeadlines",
      sourcesError: "sources/sourcesError",
    }),
  },
  watch: {
    sourcesError(value) {
      window.alert(value.message)
    }
  },
  methods: {
    wrongApiCall() {
      this.$store.dispatch("sources/getSourcesError");
    }
  }
};
</script>
