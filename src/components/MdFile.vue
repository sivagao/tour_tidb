<template>
  <vue-markdown :source="mdText"></vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";
import ClipboardJS from "clipboard";

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
      setTimeout(() => {
        const $ = window.jQuery;

        //  create copy button
        function addCopy(element) {
          var copy = document.createElement("button");
          copy.className = "copy";
          copy.textContent = "Copy";
          $(copy).insertBefore(element);
        }

        var $codes = document.querySelectorAll("pre code.language-sql");

        for (let i = 0; i < $codes.length; i++) {
          addCopy($codes[i]);
        }
        new ClipboardJS(".copy", {
          target: function(trigger) {
            $(".copy").text("Copy");
            $(".copy").css("color", "#94a3ea");
            trigger.innerText = "Copied";
            $(trigger).css("color", "rgb(231, 234, 148)");
            return trigger.nextElementSibling;
          }
        });
      }, 100);
    });
  }
};
</script>

<style lang="css">
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
.markdown-body pre {
  color: rgb(248, 248, 242);
  background-color: rgb(39, 40, 34);
}
.markdown-body .copy {
  position: relative;
  width: 85px;
  float: right;
  z-index: 2;
  color: #94a3ea;
  background: #272822;
  border: none;
  border-radius: 0 3px 0 0;
  /* padding: 16px 0.3rem 0; */
  font-family: inherit;
  font-size: 13px;
  font-style: italic;
}
.copy:hover {
  color: rgb(194, 194, 194);
}
.copy::after {
  font-family: "FontAwesome";
  content: "\f24d";
  margin-left: 5px;
}
</style>