<template>
  <main>
    <div
      class="container container--size-medium container--top-20height container--bottom-20height"
    >
      <Loading v-if="loading" :message="loading" />
      <div v-else class="card card--type-padded">
        <div class="row">
          <h1>Agastya Analytics</h1>
          <div class="text text--align-right">
            <button
              aria-label="Refresh"
              data-balloon-pos="down"
              class="button button--type-icon"
              @click="load"
            >
              <font-awesome-icon class="icon" icon="sync" fixed-width />
            </button>
          </div>
        </div>
        <div
          v-if="
            agastyaApiKeys && agastyaApiKeys.data && agastyaApiKeys.data.length
          "
        >
          <table class="table">
            <tbody>
              <tr
                v-for="(agastyaApiKey, index) in agastyaApiKeys.data"
                :key="`${agastyaApiKey.id}_${index}`"
              >
                <td>
                  {{ agastyaApiKey.name || agastyaApiKey.slug }} ({{
                    agastyaApiKey.subscriptionId ? "Pro" : "Free"
                  }})
                </td>
                <td class="text text--align-right">
                  <router-link
                    :to="
                      `/dashboard/${$route.params.team}/analytics/${agastyaApiKey.id}`
                    "
                    aria-label="View Agastya API keys"
                    data-balloon-pos="up"
                    class="button button--type-icon"
                  >
                    <font-awesome-icon class="icon" icon="eye" fixed-width />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination text text--align-center">
            <button
              v-if="agastyaApiKeys && agastyaApiKeys.hasMore"
              class="button"
              :disabled="loadingMore"
              @click="loadMore"
            >
              <span>Load more Agastya API keys</span>
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
        <div v-else>
          <LargeMessage
            heading="No Agastya API keys yet"
            img="undraw_mobile_testing_reah.svg"
            text="Create an Agastya API key in Settings"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faArrowDown, faSync } from "@fortawesome/free-solid-svg-icons";
import { emptyPagination, AgastyaApiKeys } from "../../../../types/manage";
import LargeMessage from "@/components/LargeMessage.vue";
import Loading from "@/components/Loading.vue";
library.add(faEye, faArrowDown, faSync);

@Component({
  middleware: "auth",
  components: {
    Loading,
    LargeMessage,
    FontAwesomeIcon
  }
})
export default class Dashboard extends Vue {
  loading = "";
  loadingMore = false;
  agastyaApiKeys: AgastyaApiKeys = emptyPagination;
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };

  private mounted() {
    this.load();
  }
  private load() {
    this.loading = "Loading your Agastya API keys";
    this.$store
      .dispatch("manage/getAgastyaApiKeys", { team: this.$route.params.team })
      .then(agastyaApiKeys => {
        this.agastyaApiKeys = { ...agastyaApiKeys };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }

  private loadMore() {
    this.loadingMore = true;
    this.$store
      .dispatch("manage/getAgastyaApiKeys", {
        team: this.$route.params.team,
        start: this.$store.state.manage.agastyaApiKeys[this.$route.params.team]
          .next
      })
      .then(() => {
        this.agastyaApiKeys = {
          ...this.$store.getters["manage/agastyaApiKeys"](
            this.$route.params.team
          )
        };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loadingMore = false));
  }

  @Watch("agastyaApiKeys")
  onAgastyaApiKeysChanged() {
    if (
      this.agastyaApiKeys &&
      this.agastyaApiKeys.data &&
      this.agastyaApiKeys.data.length === 1
    )
      this.$router.replace(
        `/dashboard/${this.$route.params.team}/analytics/${this.agastyaApiKeys.data[0].id}`
      );
  }
}
</script>

<style lang="scss" scoped></style>
