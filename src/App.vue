<template>
  <section class="section">
    <div class="xcontainer">

      <div class="xcontainer">
        <!-- <div class="notification">
          This container is <strong>centered</strong> on desktop.
        </div> -->

        <!-- main section -->
        <div class="columns">
          <div class="column is-half">
            <h1 class="title">TiDB Playground</h1>
            <md-file
              src="explore-sql.md"
              class="markdown-body"
            ></md-file>

          </div>
          <div class="column is-half x-term-ctx">
            <input
              id="file-uploader"
              type="file"
              hidden
            />

            <div
              class="loading-wrap"
              id="loading"
            >
              <h1 class="loading">
                <div class="loading-before">Loading…</div>
                Loading…
              </h1>
            </div>
          </div>
        </div>

        <div>
          <!-- todo markdown -->

        </div>
      </div>
    </div>
  </section>

</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import "bulma/css/bulma.css";
import "github-markdown-css/github-markdown.css";
import MdFile from "./components/MdFile.vue";

export default {
  name: "app",
  mounted() {
    // [
    //   "./jquery-2.1.1.min.js",
    //   "./jquery.console.js",
    //   "./wasm_exec.js",
    //   "./load.js"
    // ].forEach(i => {
    //   let script = document.createElement("script");
    //   script.setAttribute("src", i);
    //   document.head.appendChild(script);
    // });
  },
  components: { MdFile }
};
</script>

<style>
body {
  /* background-color: #000000; */
  margin: 0;
}

@media only screen and (min-width: 769px) {
  .x-term-ctx {
    top: 0;
    bottom: 0;
    position: fixed;
    right: 0;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

div.term {
  font-size: 14px;
  margin-top: 1em;
}

div.term div.jquery-console-inner {
  /* height: 800px; */
  background: black;
  padding: 0.5em;
  overflow: auto;
  height: 90vh;
  overflow: auto;
}

div.term div.jquery-console-prompt-box {
  color: white;
  font-family: monospace;
}

div.term div.jquery-console-focus span.jquery-console-cursor {
  background: #444;
  color: #eee;
  font-weight: bold;
}

div.term div.jquery-console-message-error {
  color: #ef0505;
  font-family: sans-serif;
  font-weight: bold;
  padding: 0.1em;
}

div.term div.jquery-console-message-success {
  color: #09f753;
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  padding: .1em;
  white-space: pre;
}

div.term span.jquery-console-prompt-label {
  font-weight: bold;
}

/* .inner {
        display: table;
        margin: 0 auto;
        font-family: monospace;
        font-size: 20px;
    }

    .outer {
        width: 100%
    } */

.loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  /* min-width: 100vw; */
  font-family: "Poppins", sans-serif;
  /* background-color: #000000; */
}

.loading {
  position: relative;
  padding: 0.1em;
  font-size: 8vw;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #222222;
  border-bottom: 0.12em solid;
}

.loading-before {
  position: absolute;
  top: 0;
  left: 0;
  padding: inherit;
  overflow: hidden;
  color: green;
  text-shadow: 0 0 0.2em;
  border-bottom: inherit;
  box-sizing: border-box;
  width: 0%;
}

.animated {
  animation: textAnim 2s infinite alternate linear;
}

@keyframes textAnim {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

/* Mobile Styles */
@media only screen and (max-width: 768px) {
  body {
    /* background-color: #f09a9d; Red */
  }
  .columns {
    flex-direction: column !important;
  }
  .column.is-half {
    width: 100%;
    max-height: 48vh !important;
    overflow: auto;
  }
  .loading-wrap,
  div.term div.jquery-console-inner {
    max-height: 48vh;
  }
  .section {
    padding: 0.5rem;
  }
  .loading-wrap {
    min-height: 40vh;
  }
  div.term div.jquery-console-message-success {
    white-space: pre-wrap;
  }
}
</style>
