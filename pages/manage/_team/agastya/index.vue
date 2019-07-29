<template>
  <main>
    <Loading v-if="loading" :message="loading" />
    <div v-else>
      <div class="row">
        <h1>Agastya</h1>
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
      <LargeMessage
        v-if="
          !loading &&
            (!agastyaApiKeys ||
              !agastyaApiKeys.data ||
              !agastyaApiKeys.data.length)
        "
        heading="No Agastya API keys yet"
        img="undraw_software_engineer_lvl5.svg"
        text="Create an Agastya API key below"
      />
      <div
        v-else-if="
          agastyaApiKeys && agastyaApiKeys.data && agastyaApiKeys.data.length
        "
      >
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Agastya API key</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(agastyaApiKey, index) in agastyaApiKeys.data"
              :key="`${agastyaApiKey.id}_${index}`"
            >
              <td>{{ agastyaApiKey.name }}</td>
              <td>
                <code>{{ agastyaApiKey.slug }}</code>
              </td>
              <td><TimeAgo :date="agastyaApiKey.createdAt" /></td>
              <td class="text text--align-right">
                <router-link
                  :to="
                    `/manage/${$route.params.team}/agastya/${agastyaApiKey.id}`
                  "
                  aria-label="Edit"
                  data-balloon-pos="up"
                  class="button button--type-icon"
                >
                  <font-awesome-icon
                    class="icon"
                    icon="pencil-alt"
                    fixed-width
                  />
                </router-link>
                <button
                  aria-label="Delete"
                  data-balloon-pos="up"
                  class="button button--type-icon button--color-danger"
                  @click="() => (showDelete = agastyaApiKey)"
                >
                  <font-awesome-icon class="icon" icon="trash" fixed-width />
                </button>
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
            <span>Load more Agastya API key</span>
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
      <h2>Create Agastya API key</h2>
      <p>
        You can use Agastya API key to programmatically access Oswald Labs
        Platform in your applications.
      </p>
      <form @submit.prevent="createAgastyaApiKey">
        <Input
          :value="newAgastyaApiKeyName"
          label="Name"
          placeholder="Enter your website's name"
          required
          @input="val => (newAgastyaApiKeyName = val)"
        />
        <button class="button">Create Agastya API key</button>
      </form>
    </div>
    <transition name="modal">
      <Confirm v-if="showDelete" :on-close="() => (showDelete = null)">
        <h2>Are you sure you want to delete this Agastya API key?</h2>
        <p>
          Deleting an Agastya API key is not reversible, and Agastya will stop
          working on your website immediately.
        </p>
        <button
          class="button button--color-danger button--state-cta"
          @click="deleteAgastyaApiKey(showDelete.id)"
        >
          Yes, delete Agastya API key
        </button>
        <button type="button" class="button" @click="showDelete = null">
          No, don't delete
        </button>
      </Confirm>
    </transition>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { getAllCountries } from "countries-and-timezones";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilAlt,
  faArrowDown,
  faSync,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading.vue";
import Confirm from "@/components/Confirm.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import CheckList from "@/components/form/CheckList.vue";
import Input from "@/components/form/Input.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Select from "@/components/form/Select.vue";
import { User } from "@/types/auth";
import { AgastyaApiKeys, emptyPagination, AgastyaApiKey } from "@/types/manage";
library.add(faPencilAlt, faArrowDown, faSync, faTrash);

@Component({
  components: {
    Loading,
    Confirm,
    CheckList,
    TimeAgo,
    Input,
    FontAwesomeIcon,
    Select,
    LargeMessage,
    Checkbox
  },
  middleware: "auth"
})
export default class ManageSettings extends Vue {
  agastyaApiKeys: AgastyaApiKeys = emptyPagination;
  showDelete: AgastyaApiKey | null = null;
  loadingMore = false;
  loading = "";
  newAgastyaApiKeyName = "";
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };

  private created() {
    this.agastyaApiKeys = {
      ...this.$store.getters["manage/agastyaApiKeys"](this.$route.params.team)
    };
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

  private mounted() {
    this.load();
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

  private createAgastyaApiKey() {
    this.loading = "Creating your Agastya API key";
    this.$store
      .dispatch("manage/createAgastyaApiKey", {
        team: this.$route.params.team,
        name: this.newAgastyaApiKeyName
      })
      .then(agastyaApiKeys => {
        this.agastyaApiKeys = { ...agastyaApiKeys };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.loading = "";
        this.newAgastyaApiKeyName = "";
      });
  }

  private deleteAgastyaApiKey(key: string) {
    this.showDelete = null;
    this.loading = "Deleting your Agastya API key";
    this.$store
      .dispatch("manage/deleteAgastyaApiKey", {
        team: this.$route.params.team,
        id: key
      })
      .then(agastyaApiKeys => {
        this.agastyaApiKeys = { ...agastyaApiKeys };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }
}
</script>

<style lang="scss" scoped></style>
