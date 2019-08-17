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
          <font-awesome-icon class="nav-icon" icon="users" fixed-width />
          <span>All events</span>
        </nuxt-link>
        <nuxt-link
          class="item"
          :to="
            `/dashboard/${$route.params.team}/analytics/${$route.params.id}/users/combined_fp?timeFilter=${$route.query.timeFilter}`
          "
        >
          <font-awesome-icon class="nav-icon" icon="users" fixed-width />
          <span>Users</span>
        </nuxt-link>
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
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Select from "@/components/form/Select.vue";
library.add(faUsers);

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
