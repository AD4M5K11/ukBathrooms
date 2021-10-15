<template>
  <v-card
    flat
    class="card bg-primary-lighten-2 source-card"
    max-width="100%"
    @click="selectSource(source.id)"
  >
    <v-card-title>{{ source.name }}</v-card-title>
    <v-card-subtitle class="my-2">{{ source.category }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "SourceCard",
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectSource(sourceId) {
      this.$emit("selected", sourceId);
    },
  },
};
</script>

<style scoped>
.source-card:hover {
  box-shadow: 0 0 3pt 2pt #673AB7;
  border-radius: 3%;
  cursor: pointer;
}
</style>
