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
        <div class="row">
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
        </div>
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
            :colors="{
              '#ffffff': 'White',
              '#000000': 'Black'
            }"
            required
            @input="val => (agastyaApiKey.foregroundColor = val)"
          />
        </div>
        <div class="text text--mb-2">
          <div v-if="contrast.isAccessible">
            <font-awesome-icon
              class="icon icon--color-success"
              icon="check-circle"
              fixed-width
            />
            <span>Contrast ratio complies with {{ contrast.score }}</span>
          </div>
          <div v-else>
            <font-awesome-icon
              class="icon icon--color-danger"
              icon="times-circle"
              fixed-width
            />
            <span>Contrast ratio is too low ({{ contrast.ratio }})</span>
          </div>
        </div>
        <div v-if="agastyaApiKey.variables">
          <div class="row">
            <div>
              <Checkbox
                :value="agastyaApiKey.variables.displayNone"
                label="Hide the Agastya button from my website"
                help="Your users will not be able to open Agastya, you can still use the API"
                @input="val => updateValue('variables', 'displayNone', val)"
              />
              <Checkbox
                :value="agastyaApiKey.variables.captioned"
                label="Always show the Agastya label"
                help="If you don't check this option, the label will appear on mouse over"
                @input="val => updateValue('variables', 'captioned', val)"
              />
            </div>
            <div>
              <Input
                :value="agastyaApiKey.variables.headingText || ''"
                label="Heading"
                placeholder="e.g., Help and Accessibility"
                @input="val => updateValue('variables', 'headingText', val)"
              />
              <Input
                :value="agastyaApiKey.variables.subheadingText || ''"
                label="Subheading"
                placeholder="e.g., your website name"
                @input="val => updateValue('variables', 'subheadingText', val)"
              />
            </div>
          </div>
        </div>
        <h2>Layout</h2>
        <div>
          <Blocks
            :value="agastyaApiKey.layout"
            :options="agastyaBlocks"
            :background-color="agastyaApiKey.backgroundColor"
            :foreground-color="agastyaApiKey.foregroundColor"
            @input="val => (agastyaApiKey.layout = val)"
          >
            <div v-if="agastyaApiKey.variables">
              <div class="heading-text">
                {{ agastyaApiKey.variables.headingText }}
              </div>
              <div class="subheading-text">
                {{ agastyaApiKey.variables.subheadingText }}
              </div>
            </div>
          </Blocks>
        </div>
        <h2>Integrations</h2>
        <p>Hello</p>
        <h2>Advanced</h2>
        <h3>Custom CSS</h3>
        <KeyValueList
          label="CSS rules"
          :value="agastyaApiKey.customCss"
          :key-options="agastyaCustomCssKeys"
          key-label="Accessibility mode"
          value-label="CSS code"
          :code="true"
          @input="val => (agastyaApiKey.customCss = val)"
        />
        <h3>Links</h3>
        <div v-if="agastyaApiKey.variables" class="row">
          <div>
            <Input
              type="url"
              :value="agastyaApiKey.variables.homepageLink || ''"
              label="Homepage"
              help="Link to your website's homepage"
              @input="val => updateValue('variables', 'homepageLink', val)"
            />
            <Input
              type="url"
              :value="agastyaApiKey.variables.privacyPolicyLink || ''"
              label="Privacy Policy"
              help="Link to your privacy policy for EU cookie law compliance"
              @input="val => updateValue('variables', 'privacyPolicyLink', val)"
            />
          </div>
          <div>
            <Input
              type="url"
              :value="agastyaApiKey.variables.websiteSettingsLink || ''"
              label="Website settings"
              help="If you have a settings page for users, link that here"
              @input="
                val => updateValue('variables', 'websiteSettingsLink', val)
              "
            />
            <Input
              type="url"
              :value="agastyaApiKey.variables.cookiePolicyLink || ''"
              label="Cookie Policy"
              help="Link to your cookie policy for EU cookie law compliance"
              @input="val => updateValue('variables', 'cookiePolicyLink', val)"
            />
          </div>
        </div>
        <h3>Read aloud</h3>
        <div style="font-size: 80%; margin-top: 2rem">{{ agastyaApiKey }}</div>
        <div v-if="agastyaApiKey.variables" class="row">
          <Input
            :value="agastyaApiKey.variables.readAloudSelector || ''"
            label="CSS selector"
            help="A CSS selector for the main content of your page for Read Aloud"
            placeholder="e.g., main#content"
            @input="val => updateValue('variables', 'readAloudSelector', val)"
          />
          <Select
            :value="agastyaApiKey.variables.readAloudLanguage || 'en-us'"
            label="Pronunciation accent"
            help="We'll use this as the default accent for Read Aloud"
            :options="readAloudLanguages"
            @input="val => updateValue('variables', 'readAloudLanguage', val)"
          />
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
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { getAllCountries } from "countries-and-timezones";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import contrast from "get-contrast";
import {
  faPencilAlt,
  faArrowDown,
  faSync,
  faTrash,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading.vue";
import Confirm from "@/components/Confirm.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import CommaList from "@/components/form/CommaList.vue";
import KeyValueList from "@/components/form/KeyValueList.vue";
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
  faArrowLeft,
  faCheckCircle,
  faTimesCircle
);
const agastyaModes = en.agastyaModes;
const agastyaCustomCssKeys = {};
[
  "dyslexia",
  "night",
  "blue-light-filter",
  "large-font",
  "read-aloud",
  "translate",
  "reading-mode",
  "contrast",
  "keyboard-nav",
  "desaturate",
  "big-cursor",
  "legible-fonts",
  "highlight-links",
  "line-height",
  "word-spacing",
  "letter-spacing",
  "font-size",
  "font-family",
  "landmark-color"
].forEach(val => {
  agastyaCustomCssKeys[val] = en.agastyaModes[val];
});

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
    Checkbox,
    KeyValueList
  },
  middleware: "auth"
})
export default class ManageSettings extends Vue {
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
  agastyaCustomCssKeys = agastyaCustomCssKeys;
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
  readAloudLanguages = {
    "en-us": "English (US)",
    "en-gb": "English (UK)",
    "en-au": "English (Australia)",
    "da-dk": "Danish (Denmark)",
    "nl-nl": "Dutch (Netherlands)",
    "fr-ca": "French (Canada)",
    "fr-fr": "French (France)",
    "de-de": "German (Germany)",
    "it-it": "Italian (Italy)",
    "ja-jp": "Japanese (Japan)",
    "ko-kr": "Korean (South Korea)",
    "pl-pl": "Polish (Poland)",
    "pt-br": "Portuguese (Brazil)",
    "pt-pt": "Portuguese (Portugal)",
    "ru-ru": "Russian (Russia)",
    "sk-sk": "Slovak (Slovakia)",
    "sv-se": "Swedish (Sweden)",
    "tr-tr": "Turkish (Turkey)",
    "uk-ua": "Ukrainian (Ukraine)",
    "af-za": "Afrikaans (South Africa)",
    "am-et": "Amharic (Ethiopia)",
    "hy-am": "Armenian (Armenia)",
    "az-az": "Azerbaijani (Azerbaijan)",
    "id-id": "Indonesian (Indonesia)",
    "ms-my": "Malay (Malaysia)",
    "bn-bd": "Bengali (Bangladesh)",
    "bn-in": "Bengali (India)",
    "ca-es": "Catalan (Spain)",
    "cs-cz": "Czech (Czech Republic)",
    "en-ca": "English (Canada)",
    "en-gh": "English (Ghana)",
    "en-in": "English (India)",
    "en-ie": "English (Ireland)",
    "en-ke": "English (Kenya)",
    "en-nz": "English (New Zealand)",
    "en-ng": "English (Nigeria)",
    "en-ph": "English (Philippines)",
    "en-sg": "English (Singapore)",
    "en-za": "English (South Africa)",
    "en-tz": "English (Tanzania)",
    "es-ar": "Spanish (Argentina)",
    "es-bo": "Spanish (Bolivia)",
    "es-cl": "Spanish (Chile)",
    "es-co": "Spanish (Colombia)",
    "es-cr": "Spanish (Costa Rica)",
    "es-ec": "Spanish (Ecuador)",
    "es-sv": "Spanish (El Salvador)",
    "es-es": "Spanish (Spain)",
    "es-us": "Spanish (United States)",
    "es-gt": "Spanish (Guatemala)",
    "es-hn": "Spanish (Honduras)",
    "es-mx": "Spanish (Mexico)",
    "es-ni": "Spanish (Nicaragua)",
    "es-pa": "Spanish (Panama)",
    "es-py": "Spanish (Paraguay)",
    "es-pe": "Spanish (Peru)",
    "es-pr": "Spanish (Puerto Rico)",
    "es-do": "Spanish (Dominican Republic)",
    "es-uy": "Spanish (Uruguay)",
    "es-ve": "Spanish (Venezuela)",
    "eu-es": "Basque (Spain)",
    "fil-ph": "Filipino (Philippines)",
    "gl-es": "Galician (Spain)",
    "ka-ge": "Georgian (Georgia)",
    "gu-in": "Gujarati (India)",
    "hr-hr": "Croatian (Croatia)",
    "zu-za": "Zulu (South Africa)",
    "is-is": "Icelandic (Iceland)",
    "jv-id": "Javanese (Indonesia)",
    "kn-in": "Kannada (India)",
    "km-kh": "Khmer (Cambodia)",
    "lo-la": "Lao (Laos)",
    "lv-lv": "Latvian (Latvia)",
    "lt-lt": "Lithuanian (Lithuania)",
    "hu-hu": "Hungarian (Hungary)",
    "ml-in": "Malayalam (India)",
    "mr-in": "Marathi (India)",
    "ne-np": "Nepali (Nepal)",
    "nb-no": "Norwegian Bokmål (Norway)",
    "ro-ro": "Romanian (Romania)",
    "si-lk": "Sinhala (Sri Lanka)",
    "sl-si": "Slovenian (Slovenia)",
    "su-id": "Sundanese (Indonesia)",
    "sw-tz": "Swahili (Tanzania)",
    "sw-ke": "Swahili (Kenya)",
    "fi-fi": "Finnish (Finland)",
    "ta-in": "Tamil (India)",
    "ta-sg": "Tamil (Singapore)",
    "ta-lk": "Tamil (Sri Lanka)",
    "ta-my": "Tamil (Malaysia)",
    "te-in": "Telugu (India)",
    "vi-vn": "Vietnamese (Vietnam)",
    "ur-pk": "Urdu (Pakistan)",
    "ur-in": "Urdu (India)",
    "el-gr": "Greek (Greece)",
    "bg-bg": "Bulgarian (Bulgaria)",
    "sr-rs": "Serbian (Serbia)",
    "he-il": "Hebrew (Israel)",
    "ar-il": "Arabic (Israel)",
    "ar-jo": "Arabic (Jordan)",
    "ar-ae": "Arabic (United Arab Emirates)",
    "ar-bh": "Arabic (Bahrain)",
    "ar-dz": "Arabic (Algeria)",
    "ar-sa": "Arabic (Saudi Arabia)",
    "ar-iq": "Arabic (Iraq)",
    "ar-kw": "Arabic (Kuwait)",
    "ar-ma": "Arabic (Morocco)",
    "ar-tn": "Arabic (Tunisia)",
    "ar-om": "Arabic (Oman)",
    "ar-ps": "Arabic (State of Palestine)",
    "ar-qa": "Arabic (Qatar)",
    "ar-lb": "Arabic (Lebanon)",
    "ar-eg": "Arabic (Egypt)",
    "fa-ir": "Persian (Iran)",
    "hi-in": "Hindi (India)",
    "th-th": "Thai (Thailand)",
    "zh-tw": "Chinese, Mandarin (Traditional, Taiwan)",
    "yue-hant-hk": "Chinese, Cantonese (Traditional, Hong Kong)",
    "zh-hk": "Chinese, Mandarin (Simplified, Hong Kong)",
    zh: "Chinese, Mandarin (Simplified, China)"
  };
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

  private updateValue(type: string, variable: string, value: string | boolean) {
    if (this.agastyaApiKey) {
      const agastyaApiKey = JSON.parse(JSON.stringify(this.agastyaApiKey));
      agastyaApiKey[type] = agastyaApiKey[type] || {};
      if (value) {
        agastyaApiKey[type][variable] = value;
      } else {
        delete agastyaApiKey[type][variable];
      }
      this.agastyaApiKey = { ...agastyaApiKey };
    }
  }

  get contrast() {
    if (
      !this.agastyaApiKey ||
      !this.agastyaApiKey.backgroundColor ||
      !this.agastyaApiKey.foregroundColor
    ) {
      return {
        ratio: 1,
        score: 0,
        isAccessible: false
      };
    }
    try {
      return {
        ratio: contrast
          .ratio(
            this.agastyaApiKey.backgroundColor,
            this.agastyaApiKey.foregroundColor
          )
          .toFixed(2),
        score: contrast.score(
          this.agastyaApiKey.backgroundColor,
          this.agastyaApiKey.foregroundColor
        ),
        isAccessible: contrast.isAccessible(
          this.agastyaApiKey.backgroundColor,
          this.agastyaApiKey.foregroundColor
        )
      };
    } catch (error) {
      return {
        ratio: 1,
        score: 0,
        isAccessible: false
      };
    }
  }

  private updateAgastyaApiKey() {
    this.loading = "Updating your Agastya API key";
    const key = { ...this.agastyaApiKey };
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
      .then(agastyaApiKey => {
        this.agastyaApiKey = { ...agastyaApiKey };
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
      .then(agastyaApiKey => {
        this.agastyaApiKey = { ...agastyaApiKey };
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
