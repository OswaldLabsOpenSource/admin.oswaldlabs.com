<template>
  <main>
    <Loading v-if="loading" :message="loading" />
    <div v-else>
      <div class="row">
        <div>
          <nuxt-link
            :to="`/manage/${$route.params.team}/agastya`"
            aria-label="Back"
            data-balloon-pos="down"
            class="button button--type-icon button--type-back"
          >
            <font-awesome-icon class="icon" icon="arrow-left" fixed-width />
          </nuxt-link>
          <h1>Agastya API key</h1>
        </div>
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
      <form
        v-if="agastyaApiKey"
        v-meta-ctrl-enter="updateAgastyaApiKey"
        @submit.prevent="updateAgastyaApiKey"
      >
        <h2>Settings</h2>
        <Input
          :value="agastyaApiKey.name"
          label="Name"
          placeholder="Enter a name for this Agastya API key"
          required
          @input="val => (agastyaApiKey.name = val)"
        />
        <Input
          :value="agastyaApiKey.slug"
          label="API key"
          placeholder="Enter a unique, vanity API key"
          help="Changing your API key can have unintended side effects"
          required
          @input="val => (agastyaApiKey.slug = val)"
        />
        <CommaList
          label="Domains"
          help="Agastya will only work on these whitelisted domains"
          :value="agastyaApiKey.domains"
          placeholder="Enter a host name without protocol, e.g., oswaldlabs.com"
          @input="val => (agastyaApiKey.domains = val)"
        />
        <h2>Design</h2>
        <div class="row">
          <ColorInput
            :value="agastyaApiKey.backgroundColor"
            label="Theme color"
            required
            @input="val => (agastyaApiKey.backgroundColor = val)"
          />
          <ColorInput
            :value="agastyaApiKey.foregroundColor"
            label="Text color"
            required
            @input="val => (agastyaApiKey.foregroundColor = val)"
          />
        </div>
        <h2>Layout</h2>
        <Blocks
          :value="agastyaApiKey.layout"
          :options="agastyaBlocks"
          @input="val => (agastyaApiKey.layout = val)"
        />
        <div style="font-size: 80%; margin-top: 2rem">
          {{ agastyaApiKey.layout }}
        </div>
        <button class="button">Update Agastya API key</button>
        <button
          type="button"
          class="button button--color-danger"
          style="margin-left: 0.5rem"
          @click.prevent="showDelete = agastyaApiKey"
        >
          Delete key
        </button>
      </form>
    </div>
    <transition name="modal">
      <Confirm v-if="showDelete" :on-close="() => (showDelete = false)">
        <h2>Are you sure you want to delete this Agastya API key?</h2>
        <p>
          Deleting an Agastya API key is not reversible, and you'll need to
          update any apps using this key.
        </p>
        <button
          class="button button--color-danger button--state-cta"
          @click="deleteAgastyaApiKey(showDelete.id)"
        >
          Yes, delete Agastya API key
        </button>
        <button type="button" class="button" @click="showDelete = false">
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
  faTrash,
  faEye,
  faEyeSlash,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading.vue";
import Confirm from "@/components/Confirm.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import CommaList from "@/components/form/CommaList.vue";
import Input from "@/components/form/Input.vue";
import Blocks from "@/components/form/Blocks.vue";
import ColorInput from "@/components/form/ColorInput.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Select from "@/components/form/Select.vue";
import { User } from "@/types/auth";
import en from "@/locales/en";
import { AgastyaApiKeys, emptyPagination, AgastyaApiKey } from "@/types/manage";
library.add(
  faPencilAlt,
  faArrowDown,
  faSync,
  faTrash,
  faEye,
  faEyeSlash,
  faArrowLeft
);
const agastyaModes = en.agastyaModes;

@Component({
  components: {
    Loading,
    Blocks,
    Input,
    CommaList,
    Confirm,
    ColorInput,
    TimeAgo,
    FontAwesomeIcon,
    Select,
    LargeMessage,
    Checkbox
  },
  middleware: "auth"
})
export default class ManageSettings extends Vue {
  agastyaApiKeys: AgastyaApiKeys = emptyPagination;
  agastyaModes = agastyaModes;
  showDelete = false;
  loading = "";
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };
  agastyaApiKey: AgastyaApiKey | null = null;
  agastyaBlocks = [
    {
      type: "mode-card",
      slug: "dyslexia"
    },
    {
      type: "mode-card",
      slug: "night"
    },
    {
      type: "mode-card",
      slug: "blue-light-filter"
    },
    {
      type: "mode-card",
      slug: "large-font"
    },
    {
      type: "mode-card",
      slug: "read-aloud"
    },
    {
      type: "mode-card",
      slug: "translate"
    },
    {
      type: "mode-card",
      slug: "reading-mode"
    },
    {
      type: "mode-card",
      slug: "contrast"
    },
    {
      type: "mode-card",
      slug: "keyboard-nav"
    },
    {
      type: "mode-card",
      slug: "desaturate"
    },
    {
      type: "mode-card",
      slug: "big-cursor"
    },
    {
      type: "mode-card",
      slug: "legible-fonts"
    },
    {
      type: "mode-card",
      slug: "highlight-links"
    },
    {
      type: "mode-card",
      slug: "line-height"
    },
    {
      type: "mode-card",
      slug: "word-spacing"
    },
    {
      type: "mode-card",
      slug: "letter-spacing"
    },
    {
      type: "mode-card",
      slug: "font-size"
    },
    {
      type: "mode-card",
      slug: "font-family"
    },
    {
      type: "mode-card",
      slug: "landmark-color"
    },
    {
      type: "link-card",
      slug: "link",
      name: "Link",
      title: "More accessibility features",
      url: "agastya-app:modes/all"
    },
    {
      type: "intro-card",
      slug: "intro",
      name: "Intro call-to-action card",
      cta: "Send message",
      subtitle: "If you need help or have feedback, get in touch.",
      title: "Have a question?",
      url: "agastya-app:pages/form"
    },
    {
      type: "app-card",
      slug: "uptime-robot",
      name: "Uptime Robot status",
      key: "Your API key"
    },
    {
      type: "app-card",
      name: "Social media share icons",
      title: "Share this page",
      slug: "share"
    }
  ];

  private created() {
    this.agastyaApiKey = {
      ...this.$store.getters["manage/agastyaApiKey"](
        this.$route.params.team,
        this.$route.params.key
      )
    };
  }

  private load() {
    this.loading = "Loading your Agastya API key";
    this.$store
      .dispatch("manage/getAgastyaApiKey", {
        team: this.$route.params.team,
        id: this.$route.params.key
      })
      .then(agastyaApiKey => {
        this.agastyaApiKey = { ...agastyaApiKey };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }

  private mounted() {
    this.load();
  }

  private updateAgastyaApiKey() {
    this.loading = "Updating your Agastya API key";
    const key = this.agastyaApiKey;
    if (key) {
      [
        "agastyaApiKey",
        "secretKey",
        "organizationId",
        "createdAt",
        "updatedAt",
        "lastAuditAt"
      ].forEach(k => delete key[k]);
    }
    this.$store
      .dispatch("manage/updateAgastyaApiKey", {
        team: this.$route.params.team,
        id: this.$route.params.key,
        ...key
      })
      .then(agastyaApiKeys => {
        this.agastyaApiKeys = { ...agastyaApiKeys };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.loading = "";
      });
  }

  private deleteAgastyaApiKey(key: string) {
    this.showDelete = false;
    this.loading = "Deleting your Agastya API key";
    this.$store
      .dispatch("manage/deleteAgastyaApiKey", {
        team: this.$route.params.team,
        id: key
      })
      .then(agastyaApiKeys => {
        this.agastyaApiKeys = { ...agastyaApiKeys };
        this.$router.push(`/manage/${this.$route.params.team}/agastya`);
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }
}
</script>

<style lang="scss" scoped></style>
