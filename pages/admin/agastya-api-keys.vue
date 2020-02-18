<template>
  <main>
    <div class="row">
      <h1>Agastya API keys</h1>
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
    <div v-if="agastyaApiKeys && agastyaApiKeys.data">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(agastyaApiKeys, index) in agastyaApiKeys.data"
            :key="`${agastyaApiKeys.id}_${index}`"
          >
            <td>{{ agastyaApiKeys.name }}</td>
            <td><TimeAgo :date="agastyaApiKeys.createdAt" /></td>
            <td class="text text--align-right">
              <router-link
                :to="
                  `/manage/${agastyaApiKeys.organizationId}/agastya/${agastyaApiKeys.id}`
                "
                aria-label="View"
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
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowDown,
  faSync,
  faEye,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import Team from "@/components/Team.vue";
import { emptyPagination } from "../../types/admin";
library.add(faArrowDown, faSync, faEye, faCog);

@Component({
  components: {
    Loading,
    TimeAgo,
    Team,
    FontAwesomeIcon
  }
})
export default class AdminAgastyaApiKeys extends Vue {
  agastyaApiKeys = emptyPagination;
  loading = "";
  loadingMore = false;

  private created() {
    this.agastyaApiKeys = { ...this.$store.getters["admin/agastyaApiKeys"]() };
  }

  private mounted() {
    this.load();
  }

  private load() {
    this.loading = "Loading your Agastya API keys";
    this.$store
      .dispatch("admin/getAgastyaApiKeys", {})
      .then(agastyaApiKeys => {
        this.agastyaApiKeys = { ...agastyaApiKeys };
      })
      .catch(error => {
        throw new Error(error);
      })
      .then(() => (this.loading = ""));
  }

  private loadMore() {
    this.loadingMore = true;
    this.$store
      .dispatch("admin/getAgastyaApiKeys", {
        start: this.$store.state.admin.agastyaApiKeys.next
      })
      .then(() => {
        this.agastyaApiKeys = {
          ...this.$store.getters["admin/agastyaApiKeys"]()
        };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loadingMore = false));
  }
}
</script>

<style lang="scss" scoped></style>
