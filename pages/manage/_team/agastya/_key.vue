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
                :value="agastyaApiKey.variables.hideOptions"
                label="Hide user options from bottom of widget"
                help="Customize, settings, help and feedback menu will be hidden"
                @input="val => updateValue('variables', 'hideOptions', val)"
              />
              <Checkbox
                :value="agastyaApiKey.variables.captioned"
                label="Always show the Agastya label"
                help="If you don't check this option, the label will appear on mouse over"
                @input="val => updateValue('variables', 'captioned', val)"
              />
              <div>
                <span
                  class="fake-button"
                  :style="`background: ${agastyaApiKey.backgroundColor}`"
                >
                  <svg
                    v-if="agastyaApiKey.variables.icon === 'help'"
                    viewBox="0 0 92 92"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M46 0a46 46 0 110 92 46 46 0 010-92zm-1.5 62c-2.5 0-4.7 1-6.5 2.7a8.4 8.4 0 00-2.6 6.3c0 2.5.9 4.6 2.6 6.4 1.8 1.8 4 2.6 6.5 2.6 1.6 0 3-.4 4.4-1.2a9.7 9.7 0 003.3-3.2 8.5 8.5 0 00-1.5-10.9 8.8 8.8 0 00-6.2-2.6zm1-50c-4.2 0-8 .6-11.5 2a18.5 18.5 0 00-8.4 6.5c-2.1 3-3.2 6.8-3.2 11.6h16.5a6 6 0 013.3-5.5 6.4 6.4 0 016.2-.1c.8.4 1.5 1 2 1.8s.8 1.8.8 2.9c0 1.2-.3 2.3-1 3.2-.6 1-1.5 1.8-2.6 2.7L44 39.7c-1.5 1-2.9 2.2-4 3.5-1 1.3-2 3-2.5 5-.5 2.2-.8 5-.8 8.6v1.5h15.2v-1.5c0-1.8.3-3.2.8-4.4A9.7 9.7 0 0155 49c1-1 2.4-1.9 4-2.8 2-1.2 3.9-2.6 5.5-4a16.5 16.5 0 005-12c0-4.2-1-7.6-3-10.3-2.2-2.7-5-4.7-8.7-6-3.6-1.4-7.7-2-12.3-2z"
                      :fill="agastyaApiKey.foregroundColor"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else-if="agastyaApiKey.variables.icon === 'chat'"
                    viewBox="0 0 92 92"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M68 5H24C14 5 5 13 5 23v26c0 10 9 18 19 18h14l27 20V67h3c10 0 19-8 19-18V23c0-10-9-18-19-18zM29 40a5 5 0 110-10 5 5 0 010 10zm17 0a5 5 0 110-10 5 5 0 010 10zm17 0a5 5 0 110-10 5 5 0 010 10z"
                      :fill="agastyaApiKey.foregroundColor"
                      fill-rule="nonzero"
                    />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      :fill="agastyaApiKey.foregroundColor"
                      d="M49.86 0a49.86 49.86 0 1 0 0 99.72 49.86 49.86 0 0 0 0-99.72zm-.75 9.9a6.46 6.46 0 1 1 .01 12.91 6.46 6.46 0 0 1-.01-12.9zm27.94 20.83l-19.18 2.42v19.2l9.3 31.03a3.62 3.62 0 0 1-2.63 4.4 3.57 3.57 0 0 1-4.4-2.54L50.62 57h-2.94l-8.76 28.83a3.6 3.6 0 0 1-4.7 2.01c-1.86-.73-3-2.84-2.27-4.72L40 52.67V33.15l-17.67-2.4a3.2 3.2 0 0 1-2.9-3.56 3.34 3.34 0 0 1 3.6-3.04L44.5 26h9.41l22.87-1.89a3.28 3.28 0 0 1 3.42 3.18 3.3 3.3 0 0 1-3.15 3.44z"
                    />
                  </svg>
                </span>
              </div>
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
              <Select
                :value="agastyaApiKey.variables.icon || 'accessibility'"
                label="Icon"
                :options="{
                  accessibility: 'Accessibility',
                  help: 'Help (question mark)',
                  chat: 'Chat'
                }"
                @input="val => updateValue('variables', 'icon', val)"
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
        <Integrations
          :integrations="integrations"
          :value="agastyaApiKey.integrations"
          @input="val => (agastyaApiKey.integrations = val)"
        />
        <h2>Advanced</h2>
        <div class="row">
          <div>
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
          </div>
          <div v-if="agastyaApiKey.variables">
            <Input
              type="text"
              :value="agastyaApiKey.variables.initialPage || '/'"
              label="Initial page"
              help="Initial Agastya page to open"
              @input="val => updateValue('variables', 'initialPage', val)"
            />
          </div>
        </div>
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
        <!-- <div style="font-size: 80%; margin-top: 2rem">{{ agastyaApiKey }}</div> -->
        <div v-if="agastyaApiKey.variables" class="row">
          <Input
            :value="agastyaApiKey.variables.readAloudSelector || ''"
            label="CSS selector"
            help="A CSS selector for the main content of your page for Read Aloud"
            placeholder="e.g., main#content"
            @input="val => updateValue('variables', 'readAloudSelector', val)"
          />
          <Select
            :value="agastyaApiKey.variables.readAloudLanguage || 'xx'"
            label="Language and accent"
            help="We'll use this as the default accent for Read Aloud"
            :options="readAloudLanguages"
            @input="val => updateValue('variables', 'readAloudLanguage', val)"
          />
        </div>
        <h3>Dialogflow</h3>
        <div v-if="agastyaApiKey.protectedInfo" class="row">
          <Input
            :value="agastyaApiKey.protectedInfo.dialogflowServiceAccount || ''"
            label="Service account JSON"
            @input="
              val =>
                updateValue('protectedInfo', 'dialogflowServiceAccount', val)
            "
          />
        </div>
        <h3>Translation</h3>
        <div v-if="agastyaApiKey.variables" class="row">
          <CheckList
            :value="agastyaApiKey.variables.translateLanguages || ''"
            label="Translate languages"
            :options="translateLanguages"
            @input="val => updateValue('variables', 'translateLanguages', val)"
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
    <div v-if="!loading && agastyaApiKey" class="text text--mt-2">
      <h2>Subscription</h2>
      <div v-if="agastyaApiKey && agastyaApiKey.subscriptionId">
        <div
          v-if="agastyaApiKey.subscription && agastyaApiKey.subscription.plan"
        >
          <ul>
            <li>
              <strong>Plan: </strong>
              <span>{{ agastyaApiKey.subscription.plan.nickname }}</span>
              <span
                :class="
                  `label label--color-${agastyaApiKey.subscription.status}`
                "
                >{{ agastyaApiKey.subscription.status }}</span
              >
            </li>
            <li>
              <strong>Price: </strong>
              <span>{{
                (
                  agastyaApiKey.subscription.plan.currency || "eur"
                ).toUpperCase()
              }}</span>
              <span>{{
                agastyaApiKey.subscription.plan.amount | currency
              }}</span>
              <span>per {{ agastyaApiKey.subscription.plan.interval }}</span>
            </li>
            <li v-if="agastyaApiKey.subscription.cancel_at">
              <strong>Cancels: </strong>
              <TimeAgo :date="agastyaApiKey.subscription.cancel_at * 1000" />
            </li>
          </ul>
          <button
            v-if="!agastyaApiKey.subscription.cancel_at"
            type="button"
            class="button button--color-danger"
            @click="cancelSubscription"
          >
            Cancel subscription
          </button>
          <div v-else class="card card--type-padded text text--mt-2">
            <h2>Scheduled for cancelation</h2>
            <p>
              This subscription will be cancelled on
              {{
                new Date(
                  agastyaApiKey.subscription.cancel_at * 1000
                ).toLocaleDateString()
              }}.
            </p>
            <button class="button button--color-success" @click="revertCancel">
              Revert cancelation
            </button>
          </div>
        </div>
        <div v-else>
          <p>
            You have a custom paid subscription. If you want to make any changes
            to it, you'll have to contact someone from our team.
          </p>
        </div>
      </div>
      <div v-else>
        <p>
          You're currently on the <strong>Free plan</strong>. You can choose a
          paid subscription below.
        </p>
        <form
          v-if="pricingPlans"
          v-meta-ctrl-enter="createSubscription"
          @submit.prevent="createSubscription"
        >
          <div
            v-for="(plan, index) in pricingPlans.data"
            :key="`${plan.id}_${index}`"
            class="fake-radio-container"
          >
            <label>
              <input v-model="newPlan" type="radio" :value="plan.id" required />
              <span class="fake-radio" role="radio" tabindex="0" />
              <strong class="name">{{ plan.nickname }}</strong>
              <span class="amount">
                {{ (plan.currency || "eur").toUpperCase() }}
                {{ plan.amount | currency }}
              </span>
              <span class="interval">
                {{
                  plan.interval_count == 1
                    ? "per"
                    : `per ${plan.interval_count}`
                }}
                {{ plan.interval }}
              </span>
            </label>
          </div>
          <button class="button">Create subscription</button>
        </form>
      </div>
    </div>
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
import Integrations from "@/components/Integrations.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import CommaList from "@/components/form/CommaList.vue";
import KeyValueList from "@/components/form/KeyValueList.vue";
import Input from "@/components/form/Input.vue";
import Blocks from "@/components/form/Blocks.vue";
import ColorInput from "@/components/form/ColorInput.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import CheckList from "@/components/form/CheckList.vue";
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
const integrations = en.integrations;
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
    Integrations,
    LargeMessage,
    Checkbox,
    CheckList,
    KeyValueList
  },
  middleware: "auth",
  computed: mapGetters({
    pricingPlans: "manage/pricingPlans"
  })
})
export default class ManageSettings extends Vue {
  agastyaModes = agastyaModes;
  showDelete = false;
  pricingPlans!: any;
  loading = "";
  noBilling = false;
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };

  agastyaApiKey: AgastyaApiKey | null = null;
  agastyaCustomCssKeys = agastyaCustomCssKeys;
  integrations = integrations;
  newPlan = "";
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
    xx: "Infer from webpage",
    "en-US": "English (US)",
    "en-GB": "English (UK)",
    "en-IN": "English (India)",
    "en-AU": "English (Australia)",
    "en-GBR": "English (Wales)",
    "fr-FR": "French (France)",
    "fr-CA": "French (Canada)",
    "pt-PT": "Portuguese (Portugal)",
    "pt-BR": "Portuguese (Brazil)",
    "es-ES": "Spanish (Spain)",
    "es-MX": "Spanish (Mexico)",
    "es-US": "Spanish (US)",
    ar: "Arabic",
    zh: "Chinese",
    da: "Danish",
    nl: "Dutch",
    hi: "Hindi",
    de: "German",
    is: "Icelandic",
    it: "Italian",
    jp: "Japanese",
    ko: "Korean",
    np: "Nepali",
    pl: "Polish",
    ro: "Romanian",
    ru: "Russian",
    sv: "Slovak",
    tr: "Turkish",
    cy: "Welsh"
  };

  translateLanguages = {
    af: { text: "Afrikaans" },
    sq: { text: "Albanian" },
    am: { text: "Amharic" },
    ar: { text: "Arabic" },
    hy: { text: "Armenian" },
    az: { text: "Azerbaijani" },
    eu: { text: "Basque" },
    be: { text: "Belarusian" },
    bn: { text: "Bengali" },
    bs: { text: "Bosnian" },
    bg: { text: "Bulgarian" },
    ca: { text: "Catalan" },
    ceb: { text: "Cebuano" },
    "zh-CN": { text: "Chinese (Simplified)" },
    "zh-TW": { text: "Chinese (Traditional)" },
    co: { text: "Corsican" },
    hr: { text: "Croatian" },
    cs: { text: "Czech" },
    da: { text: "Danish" },
    nl: { text: "Dutch" },
    en: { text: "English" },
    eo: { text: "Esperanto" },
    et: { text: "Estonian" },
    fi: { text: "Finnish" },
    fr: { text: "French" },
    fy: { text: "Frisian" },
    gl: { text: "Galician" },
    ka: { text: "Georgian" },
    de: { text: "German" },
    el: { text: "Greek" },
    gu: { text: "Gujarati" },
    ht: { text: "Haitian Creole" },
    ha: { text: "Hausa" },
    haw: { text: "Hawaiian" },
    he: { text: "Hebrew" },
    hi: { text: "Hindi" },
    hmn: { text: "Hmong" },
    hu: { text: "Hungarian" },
    is: { text: "Icelandic" },
    ig: { text: "Igbo" },
    id: { text: "Indonesian" },
    ga: { text: "Irish" },
    it: { text: "Italian" },
    ja: { text: "Japanese" },
    jw: { text: "Javanese" },
    kn: { text: "Kannada" },
    kk: { text: "Kazakh" },
    km: { text: "Khmer" },
    ko: { text: "Korean" },
    ku: { text: "Kurdish" },
    ky: { text: "Kyrgyz" },
    lo: { text: "Lao" },
    la: { text: "Latin" },
    lv: { text: "Latvian" },
    lt: { text: "Lithuanian" },
    lb: { text: "Luxembourgish" },
    mk: { text: "Macedonian" },
    mg: { text: "Malagasy" },
    ms: { text: "Malay" },
    ml: { text: "Malayalam" },
    mt: { text: "Maltese" },
    mi: { text: "Maori" },
    mr: { text: "Marathi" },
    mn: { text: "Mongolian" },
    my: { text: "Myanmar (Burmese)" },
    ne: { text: "Nepali" },
    no: { text: "Norwegian" },
    ny: { text: "Nyanja (Chichewa)" },
    ps: { text: "Pashto" },
    fa: { text: "Persian" },
    pl: { text: "Polish" },
    pt: { text: "Portuguese" },
    pa: { text: "Punjabi" },
    ro: { text: "Romanian" },
    ru: { text: "Russian" },
    sm: { text: "Samoan" },
    gd: { text: "Scots Gaelic" },
    sr: { text: "Serbian" },
    st: { text: "Sesotho" },
    sn: { text: "Shona" },
    sd: { text: "Sindhi" },
    si: { text: "Sinhala (Sinhalese)" },
    sk: { text: "Slovak" },
    sl: { text: "Slovenian" },
    so: { text: "Somali" },
    es: { text: "Spanish" },
    su: { text: "Sundanese" },
    sw: { text: "Swahili" },
    sv: { text: "Swedish" },
    tl: { text: "Tagalog (Filipino)" },
    tg: { text: "Tajik" },
    ta: { text: "Tamil" },
    te: { text: "Telugu" },
    th: { text: "Thai" },
    tr: { text: "Turkish" },
    uk: { text: "Ukrainian" },
    ur: { text: "Urdu" },
    uz: { text: "Uzbek" },
    vi: { text: "Vietnamese" },
    cy: { text: "Welsh" },
    xh: { text: "Xhosa" },
    yi: { text: "Yiddish" },
    yo: { text: "Yoruba" },
    zu: { text: "Zulu" }
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
      .then(() =>
        this.$store.dispatch("manage/getPricingPlans", this.$route.params.team)
      )
      .then(plans => {
        this.newPlan = this.pricingPlans.data[0].id;
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

  private cancelSubscription() {
    if (!this.agastyaApiKey || !this.agastyaApiKey.subscriptionId) return;
    this.loading = "Canceling your subscription";
    this.$store
      .dispatch("manage/cancelAgastyaSubscription", {
        team: this.$route.params.team,
        id: this.$route.params.key
      })
      .then(() => this.load())
      .catch(() => {})
      .finally(() => (this.loading = ""));
  }

  private createSubscription() {
    this.loading = "Creating your subscription";
    this.$store
      .dispatch("manage/createAgastyaSubscription", {
        team: this.$route.params.team,
        plan: this.newPlan,
        id: this.$route.params.key
      })
      .then(() => this.load())
      .catch(error => {
        if (error.response.data.error === "no-customer") this.noBilling = true;
      })
      .finally(() => (this.loading = ""));
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

  private revertCancel() {
    this.showDelete = false;
    this.loading = "Saving your subscription";
    this.$store
      .dispatch("manage/revertAgastyaSubscription", {
        team: this.$route.params.team,
        id: this.$route.params.key
      })
      .then(subscription => this.load())
      .catch(() => {})
      .finally(() => (this.loading = ""));
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

<style lang="scss" scoped>
.heading-text {
  font-size: 125%;
}
.fake-button {
  display: inline-block;
  background-color: #333;
  height: 3.41rem;
  width: 3.41rem;
  border-radius: 100%;
  svg {
    width: 2.75rem;
    height: 2.75rem;
    margin: 0.33rem;
  }
}
</style>
