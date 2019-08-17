<template>
  <main>
    <div>
      <div>
        <div>
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
              <table class="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User info</th>
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
                    <!-- <td class="less-pad">
                      <input
                        v-if="log._source && log._source.url"
                        class="input input--font-monospace input--padding-condensed"
                        :value="log._source.url"
                        disabled
                      />
                    </td> -->
                    <td v-if="log._source && log._source.country_code">
                      <AnalyticsIconSet
                        :country-code="log._source.country_code"
                        :user-agent="log._source.user_agent"
                        :browser="log._source.browser_name"
                        :manufacturer="log._source.device_manufacturer"
                      />
                    </td>
                    <td v-if="log._source && log._source.action">
                      {{ log._source.action | kebabSentence | shortText }}
                    </td>
                    <td v-else><em>No action</em></td>
                    <td v-if="log._source && log._source.event">
                      {{ log._source.event | eventName }}
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
import AnalyticsIconSet from "@/components/AnalyticsIconSet.vue";
import Loading from "@/components/Loading.vue";
library.add(faEye, faArrowDown, faSync, faCloudDownloadAlt);

function sharedStart(array: string[]) {
  const A = array.concat().sort();
  const a1 = A[0];
  const a2 = A[A.length - 1];
  const L = a1.length;
  let i = 0;
  while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
  return a1.substring(0, i);
}

@Component({
  middleware: "auth",
  components: {
    Loading,
    LargeMessage,
    Select,
    TimeAgo,
    HTTPStatus,
    IconText,
    AnalyticsIconSet,
    Country,
    FontAwesomeIcon
  }
})
export default class Dashboard extends Vue {
  loading = "";
  loadingMore = false;
  data: AgastyaApiKeyLogs = emptyPagination;
  from = 0;

  aggregationAction: Aggregations[] = [];
  aggregationCountryCode: Aggregations[] = [];
  aggregationBrowserName: Aggregations[] = [];
  aggregationOSName: Aggregations[] = [];
  aggregationReferrer: Aggregations[] = [];
  aggregationEvent: Aggregations[] = [];
  aggregationUrl: Aggregations[] = [];
  aggregationCity: Aggregations[] = [];
  aggregationDevice: Aggregations[] = [];

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
    this.aggregationReferrer = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "referrer_domain"
      )
    };
    this.aggregationEvent = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "event"
      )
    };
    this.aggregationUrl = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "url"
      )
    };
    this.aggregationCity = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "city"
      )
    };
    this.aggregationDevice = {
      ...this.$store.getters["manage/agastyaApiKeyGraphs"](
        this.$route.params.team,
        this.$route.params.id,
        "device_manufacturer"
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
        range: this.$route.query.timeFilter,
        from: this.from
      })
      .then(data => {
        this.data = data;
        if (!data || !data.data || !data.data.length)
          throw new Error("no-data");
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
        range: this.$route.query.timeFilter,
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
