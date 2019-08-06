<template>
  <main>
    <div
      class="container container--size-medium container--top-20height container--bottom-20height"
    >
      <div class="row">
        <router-link
          :to="`/dashboard/${$route.params.team}/analytics`"
          class="card card--type-padded text text--align-center"
        >
          <font-awesome-icon
            class="icon icon--size-large"
            icon="chart-line"
            fixed-width
          />
          <div>Analytics</div>
        </router-link>
        <router-link
          :to="`/dashboard/${$route.params.team}/audit-webpages`"
          class="card card--type-padded text text--align-center"
        >
          <font-awesome-icon
            class="icon icon--size-large"
            icon="history"
            fixed-width
          />
          <div>Audits</div>
        </router-link>
        <a
          href="https://help.oswaldlabs.com"
          target="_blank"
          class="card card--type-padded text text--align-center"
        >
          <font-awesome-icon
            class="icon icon--size-large"
            icon="question-circle"
            fixed-width
          />
          <div>Help</div>
        </a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHistory,
  faChartLine,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
library.add(faHistory, faChartLine, faQuestionCircle);

@Component({
  middleware: "auth",
  components: {
    FontAwesomeIcon
  }
})
export default class Dashboard extends Vue {
  private mounted() {}
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 10vh 0;
  margin-bottom: 10vh;
  h1 {
    margin: 0 0 2rem 0;
  }
}
.card {
  display: block;
  font-size: 125%;
}
.icon--size-large {
  font-size: 200%;
  margin-bottom: 1rem;
}
</style>
