<template>
  <div class="text-center">
    <v-dialog v-model="show" width="100%">
      <v-card :width="dialogWidth">
        <v-card-text class="text-center">
          <div class="text-h4">Edit Headline<title></title></div>
          <div>
            <textarea class="my-8 input" v-model="title" :placeholder="inputPlaceholder"/>
            <div v-if="!isInputValid" class="text-h6 mt-2 text-red">
              <v-icon dark right> mdi-cancel </v-icon>
              {{ titleError }}
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="saveTitle()">Save</v-btn>
          <v-btn text @click="closeDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EditTitleDialog",
  components: {},
  data: () => ({
    show: false,
    currentTitle: "",
    title: "",
    titleError: "",
    maxLengthTitle: 100,
  }),
  computed: {
    isInputValid() {
      if (this.title.length && this.title.length > this.maxLengthTitle) {
        this.titleError = `The title must be less than ${this.maxLengthTitle} characters`;
        return false;
      } else {
        this.titleError = "";
        return true;
      }
    },
    inputPlaceholder() {
      return `Max ${this.maxLengthTitle} chars`
    },
    dialogWidth() {
      if (this.$store) {
        switch (this.$vuetify.display.name) {
          case "lg":
            return 400;
          case "xl":
            return 500;
          default:
            return 'auto';
        }
      }
    },
  },
  methods: {
    saveTitle() {
      if (this.isInputValid) {
        this.$store.dispatch("headlines/updateHeadlineTitle", {
          currentTitle: this.currentTitle,
          newTitle: this.title,
        });
        this.closeDialog();
      }
    },
    resetInput() {
      this.title = "";
      this.titleError = "";
    },
    closeDialog() {
      this.show = false;
      this.resetInput();
    },
  },
};
</script>
<style scoped>
.input {
  width: 90%;
}
</style>
