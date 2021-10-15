<template>
  <v-dialog v-model="show" scrollable fullscreen> 
    <v-card>
      <v-card-title class="dialog-title bg-primary">Select a source</v-card-title>
      <v-card-text class="dialog-content">
        <v-row>
          <v-col
            v-for="source in sources"
            class="d-flex child-flex"
            :key="source.id"
            :cols="columns"
          >
            <source-card :source="source" @selected="selectSource($event)"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import SourceCard from './SourceCard.vue'

export default {
  name: "SourcesDialog",
  components: {
    SourceCard
  },
  data: () => ({
    show: false,
    selectedSource: "",
  }),
  computed: {
    ...mapGetters({
      sources: "sources/allSources",
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
  methods: {
    selectSource(sourceId) {
      this.$store.dispatch("sources/updateSelectedSource", sourceId);
      this.$emit("source-changed");
      this.show = false;
    },
  },
};
</script>
<style>
.v-overlay__content {
  overflow-y: auto !important;
}
.v-dialog .v-overlay__content {
  max-height: 90% !important;
  max-width: 90% !important;
}
.v-card-title {
  word-break: break-word !important;
}
</style>
