<template>
  <div class="container container--type-settings">
    <aside>
      <nav>
        <nuxt-link
          class="item"
          :to="
            `/dashboard/${$route.params.team}/analytics/${$route.params.id}?timeFilter=${$route.query.timeFilter}`
          "
        >
          <font-awesome-icon class="nav-icon" icon="chart-line" fixed-width />
          <span>All events</span>
        </nuxt-link>
        <nuxt-link
          class="item item--type-parent"
          :to="
            `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/user_fp?timeFilter=${$route.query.timeFilter}`
          "
        >
          <font-awesome-icon class="nav-icon" icon="users" fixed-width />
          <span>Users</span>
        </nuxt-link>
        <nav class="sub-nav">
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/user_fp?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Active users</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/action?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Apps &amp; modes</span>
          </nuxt-link>
        </nav>
        <nuxt-link
          class="item item--type-parent"
          :to="
            `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/country_code?timeFilter=${$route.query.timeFilter}`
          "
        >
          <font-awesome-icon class="nav-icon" icon="map" fixed-width />
          <span>Locations</span>
        </nuxt-link>
        <nav class="sub-nav">
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/country_code?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Countries</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/city?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Cities</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/region_name?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Regions</span>
          </nuxt-link>
        </nav>
        <nuxt-link
          class="item item--type-parent"
          :to="
            `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/browser_name?timeFilter=${$route.query.timeFilter}`
          "
        >
          <font-awesome-icon class="nav-icon" icon="laptop" fixed-width />
          <span>Devices</span>
        </nuxt-link>
        <nav class="sub-nav">
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/browser_name?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Browsers</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/os_name?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Operating systems</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/device_manufacturer?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Manufacturers</span>
          </nuxt-link>
        </nav>
        <nuxt-link
          class="item item--type-parent"
          :to="
            `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/referrer_domain?timeFilter=${$route.query.timeFilter}`
          "
        >
          <font-awesome-icon class="nav-icon" icon="table" fixed-width />
          <span>Traffic</span>
        </nuxt-link>
        <nav class="sub-nav">
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/referrer_domain?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Referrers</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/url?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Pages</span>
          </nuxt-link>
          <nuxt-link
            class="sub-item"
            :to="
              `/dashboard/${$route.params.team}/analytics/${$route.params.id}/top/language?timeFilter=${$route.query.timeFilter}`
            "
          >
            <span>Languages</span>
          </nuxt-link>
        </nav>
      </nav>
    </aside>
    <div style="width: 100%">
      <form @submit.prevent="updateTimeFilter">
        <div class="row">
          <Select
            label="Time filter"
            :options="timeOptions"
            :value="timeFilter"
            @input="val => (timeFilter = val)"
          />
          <div style="display: flex; margin-bottom: 1rem; margin-top: 2rem;">
            <button class="button">Load analytics</button>
          </div>
        </div>
      </form>
      <div
        :key="`an${$route.query.timeFilter}${$route.query.now}`"
        class="card"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUsers,
  faMap,
  faLaptop,
  faChartLine,
  faTable
} from "@fortawesome/free-solid-svg-icons";
import Select from "@/components/form/Select.vue";
library.add(faUsers, faMap, faLaptop, faChartLine, faTable);

@Component({
  components: {
    Select,
    FontAwesomeIcon
  }
})
export default class Settings extends Vue {
  timeFilter = "24h";
  timeOptions = {
    "10s": "Last 10 seconds",
    "60s": "Last 60 seconds",
    "10m": "Last 10 minutes",
    "24h": "Last 24 hours",
    "7d": "Last 7 days",
    "30d": "Last 30 days"
  };

  private created() {
    if (!this.$route.query.timeFilter)
      return this.$router.replace(this.$route.path + "?timeFilter=24h");
    this.timeFilter = this.$route.query.timeFilter;
  }

  private updateTimeFilter() {
    return this.$router.replace(
      this.$route.path +
        `?timeFilter=${this.timeFilter}&now=${new Date().getTime()}`
    );
  }
}
</script>
