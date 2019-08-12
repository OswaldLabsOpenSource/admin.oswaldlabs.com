<template>
  <main>
    <div class="container">
      <div class="card card--type-padded">
        <div class="row">
          <h1>Agastya Analytics</h1>
          <div class="text text--align-right">
            <button
              aria-label="Refresh"
              data-balloon-pos="down"
              class="button button--type-icon"
              @click="load"
            >
              <font-awesome-icon
                class="icon"
                icon="sync"
                :spin="!!loading"
                fixed-width
              />
            </button>
          </div>
        </div>
        <div>
          <form @submit.prevent="load">
            <div class="row">
              <Select
                label="Time filter"
                :options="timeOptions"
                :value="timeFilter"
                @input="val => (timeFilter = val)"
              />
              <div
                style="display: flex; margin-bottom: 1rem; margin-top: 2rem;"
              >
                <button class="button">Load analytics</button>
              </div>
            </div>
          </form>
          <div>
            <LargeMessage
              v-if="!loading && (!data || !data.data || !data.data.length)"
              heading="No API logs yet"
              img="undraw_software_engineer_lvl5.svg"
              text="We couldn't find any API logs for this API key yet, go ahead and make some requests first"
            />
            <div
              v-else-if="data && data.data && data.data.length"
              :class="{ loading }"
            >
              <div class="row text text--mb-2">
                <div v-if="data.count">
                  <div class="text text--size-250">
                    {{ data.count | number }}
                  </div>
                  <div>total events</div>
                </div>
              </div>
              <div class="row">
                <div>
                  <h2>Countries</h2>
                  <table class="table">
                    <tbody>
                      <tr
                        v-for="(row, i) in aggregationCountryCode"
                        :key="`r${i}country`"
                      >
                        <td><Country :code="row.key" /></td>
                        <td>{{ row.doc_count }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2>Browsers</h2>
                  <table class="table">
                    <tbody>
                      <tr
                        v-for="(row, i) in aggregationBrowserName"
                        :key="`r${i}browser`"
                      >
                        <td><IconText type="browser" :text="row.key" /></td>
                        <td>{{ row.doc_count }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2>Operating systems</h2>
                  <table class="table">
                    <tbody>
                      <tr
                        v-for="(row, i) in aggregationOSName"
                        :key="`r${i}os`"
                      >
                        <td><IconText type="browser" :text="row.key" /></td>
                        <td>{{ row.doc_count }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2>Actions</h2>
                  <table class="table">
                    <tbody>
                      <tr
                        v-for="(row, i) in aggregationAction"
                        :key="`r${i}action`"
                      >
                        <td>{{ row.key }}</td>
                        <td>{{ row.doc_count }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h2>All events</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>URL</th>
                    <th>Location</th>
                    <th>Action</th>
                    <th>Event</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(log, i) in data.data" :key="`l${log._id}${i}`">
                    <td v-if="log._source && log._source.date">
                      <TimeAgo :date="log._source.date" />
                    </td>
                    <td class="less-pad">
                      <input
                        v-if="log._source && log._source.url"
                        class="input input--font-monospace input--padding-condensed"
                        :value="log._source.url"
                        disabled
                      />
                    </td>
                    <td v-if="log._source && log._source.country_code">
                      <Country
                        :code="log._source.country_code"
                        :text="log._source.city"
                      />
                    </td>
                    <td v-if="log._source && log._source.action">
                      {{ log._source.action | kebabSentence | shortText }}
                    </td>
                    <td v-else><em>No action</em></td>
                    <td v-if="log._source && log._source.event">
                      {{ log._source.event | kebabSentence | shortText }}
                    </td>
                    <td v-else><em>No event</em></td>
                    <td>
                      <button
                        aria-label="Download JSON"
                        data-balloon-pos="up"
                        class="button button--type-icon"
                        @click="() => downloadJson(log)"
                      >
                        <font-awesome-icon
                          class="icon"
                          icon="cloud-download-alt"
                          fixed-width
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination text text--align-center">
                <button
                  v-if="data && data.hasMore"
                  class="button"
                  :disabled="loadingMore"
                  @click="loadMore"
                >
                  <span>Load more logs</span>
                  <font-awesome-icon
                    v-if="!loadingMore"
                    class="icon"
                    icon="arrow-down"
                  />
                  <font-awesome-icon
                    v-else
                    class="icon icon--ml-2 icon--color-light"
                    icon="sync"
                    spin
                  />
                </button>
              </div>
            </div>
            <Loading v-else :message="loading" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import download from "downloadjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faArrowDown,
  faSync,
  faCloudDownloadAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  emptyPagination,
  AgastyaApiKey,
  Aggregations,
  AgastyaApiKeyLogs
} from "@/types/manage";
import Select from "@/components/form/Select.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import Country from "@/components/Country.vue";
import IconText from "@/components/IconText.vue";
import HTTPStatus from "@/components/HTTPStatus.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import Loading from "@/components/Loading.vue";
library.add(faEye, faArrowDown, faSync, faCloudDownloadAlt);

@Component({
  middleware: "auth",
  components: {
    Loading,
    LargeMessage,
    Select,
    TimeAgo,
    HTTPStatus,
    IconText,
    Country,
    FontAwesomeIcon
  }
})
export default class Dashboard extends Vue {
  loading = "";
  loadingMore = false;
  data: AgastyaApiKeyLogs = emptyPagination;
  timeFilter = "24h";
  from = 0;
  timeOptions = {
    "10s": "Last 10 seconds",
    "60s": "Last 60 seconds",
    "10m": "Last 10 minutes",
    "24h": "Last 24 hours",
    "7d": "Last 7 days",
    "30d": "Last 30 days"
  };

  aggregationAction: Aggregations[] = [];
  aggregationCountryCode: Aggregations[] = [];
  aggregationBrowserName: Aggregations[] = [];
  aggregationOSName: Aggregations[] = [];

  private created() {
    this.data = {
      ...this.$store.getters["manage/agastyaApiKeyLogs"](
        this.$route.params.team,
        this.$route.params.id
      )
    };
    this.aggregationAction = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "action"
      )
    };
    this.aggregationCountryCode = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "country_code"
      )
    };
    this.aggregationBrowserName = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "browser_name"
      )
    };
    this.aggregationOSName = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "os_name"
      )
    };
  }

  private mounted() {
    this.load();
  }

  private load() {
    this.from = 0;
    this.loading = "Loading your API logs";
    this.$store
      .dispatch("manage/getAgastyaApiKeyLogs", {
        team: this.$route.params.team,
        id: this.$route.params.id,
        range: this.timeFilter,
        from: this.from
      })
      .then(data => {
        this.data = data;
      })
      .then(() =>
        this.$store.dispatch("manage/getAgastyaApiKeyGraphs", {
          team: this.$route.params.team,
          id: this.$route.params.id,
          range: this.timeFilter,
          from: this.from,
          field: "action"
        })
      )
      .then(aggregationAction => {
        this.aggregationAction = aggregationAction;
      })
      .then(() =>
        this.$store.dispatch("manage/getAgastyaApiKeyGraphs", {
          team: this.$route.params.team,
          id: this.$route.params.id,
          range: this.timeFilter,
          from: this.from,
          field: "country_code"
        })
      )
      .then(aggregationCountryCode => {
        this.aggregationCountryCode = aggregationCountryCode;
      })
      .then(() =>
        this.$store.dispatch("manage/getAgastyaApiKeyGraphs", {
          team: this.$route.params.team,
          id: this.$route.params.id,
          range: this.timeFilter,
          from: this.from,
          field: "browser_name"
        })
      )
      .then(aggregationBrowserName => {
        this.aggregationBrowserName = aggregationBrowserName;
      })
      .then(() =>
        this.$store.dispatch("manage/getAgastyaApiKeyGraphs", {
          team: this.$route.params.team,
          id: this.$route.params.id,
          range: this.timeFilter,
          from: this.from,
          field: "os_name"
        })
      )
      .then(aggregationOSName => {
        this.aggregationOSName = aggregationOSName;
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }

  private loadMore() {
    const data = { ...this.data };
    if (data && data.data) {
      this.from = data.data.length;
    }
    this.loadingMore = true;
    this.$store
      .dispatch("manage/getAgastyaApiKeyLogs", {
        team: this.$route.params.team,
        id: this.$route.params.id,
        range: this.timeFilter,
        from: this.from
      })
      .then(() => {
        this.data = {
          ...this.$store.getters["manage/agastyaApiKeyLogs"](
            this.$route.params.team,
            this.$route.params.id
          )
        };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loadingMore = false));
  }

  private downloadJson(log) {
    download(
      JSON.stringify(log._source, null, 2),
      `log-${log._id}.json`,
      "application/json"
    );
  }
}
</script>

<style lang="scss" scoped>
td.less-pad {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
