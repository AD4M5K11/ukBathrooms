<template>
  <v-card
    flat
    style="margin: 10px; background-color: transparent"
    class="card"
    max-width="100%"
  >
    <div
      flat
      class="text-center gradient"
      @click="openHeadlinePage(headline.title)"
    >
      <v-img
        :src="headline.urlToImage || ''"
        class="align-end"
        gradient="to bottom, black, rgba(0,0,0,.5)"
        height="200px"
        cover
      >
      </v-img>
    </div>
    <v-card-title class="card-title">{{ headline.title }}</v-card-title>
    <v-card-subtitle class="">{{ headline.publishedAt }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="primary-light"
        round
        text
        @click="openEditDialog(headline.title)"
      >
        <v-icon left icon="mdi-pencil-outline"></v-icon>
        <span>Edit</span>
      </v-btn>
      <v-btn
        color="primary-light"
        round
        text
        @click="openHeadlinePage(headline.title)"
      >
        <v-icon left icon="mdi-plus-outline"></v-icon>
        <span>More</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "HeadlineCard",
  data: () => ({
    isEditingHeadline: false,
  }),
  props: {
    headline: {
      type: Object,
      required: true,
    },
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
      this.$emit("edit", title);
    },
    openSourcesDialog(title) {
      this.$emit("show-sources", title);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 3%;
}
.card:hover {
  box-shadow: 0 0 3pt 2pt rgba(119, 128, 1, 0.397);
  border-radius: 3%;
  cursor: pointer;
}
.gradient {
  position: relative;
}
.gradient:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(73, 1, 64, 0.6) 100%
  );
}
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
