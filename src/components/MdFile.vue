<template>
  <vue-markdown :source="mdText"></vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";

import axios from "axios";

export default {
  name: "md-viewer",
  props: ["src"],
  components: { VueMarkdown },
  data: function() {
    return { mdText: "" };
  },
  mounted() {
    axios.get(this.src).then(response => {
      this.mdText = response.data;
    });
  }
};
</script>

<style lang="scss"></style>