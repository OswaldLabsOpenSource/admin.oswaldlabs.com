<template>
  <main>
    <div>
      <Loading v-if="loading" :message="loading" />
      <div v-else-if="data && data.length">
        <table class="table table--type-data">
          <thead>
            <tr>
              <th>{{ columnName }}</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(kv, i) in data" :key="`kv${i}`">
              <td v-if="$route.params.field === 'country_code'">
                <router-link
                  :to="
                    `/dashboard/${$route.params.team}/analytics/${
                      $route.params.id
                    }?timeFilter=${$route.query.timeFilter}&filter=${
                      $route.params.field
                    }%3A${e(kv.key)}`
                  "
                >
                  <Country :code="kv.key" />
                </router-link>
              </td>
              <td
                v-else-if="
                  $route.params.field === 'city' ||
                    $route.params.field === 'region_name'
                "
              >
                <router-link
                  :to="
                    `/dashboard/${$route.params.team}/analytics/${
                      $route.params.id
                    }?timeFilter=${$route.query.timeFilter}&filter=${
                      $route.params.field
                    }%3A${e(kv.key)}`
                  "
                >
                  <span v-if="kv.key.includes(':')">
                    <Country :show-text="false" :code="kv.key.split(':')[0]" />
                    <span>{{ kv.key.split(":")[1] }}</span>
                  </span>
                  <span v-else>{{ kv.key }}</span>
                </router-link>
              </td>
              <td
                v-else-if="
                  $route.params.field === 'browser_name' ||
                    $route.params.field === 'os_name' ||
                    $route.params.field === 'device_manufacturer'
                "
              >
                <router-link
                  :to="
                    `/dashboard/${$route.params.team}/analytics/${
                      $route.params.id
                    }?timeFilter=${$route.query.timeFilter}&filter=${
                      $route.params.field
                    }%3A${e(kv.key)}`
                  "
                >
                  <IconText :text="kv.key" />
                </router-link>
              </td>
              <td v-else-if="$route.params.field === 'referrer_domain'">
                <router-link
                  :to="
                    `/dashboard/${$route.params.team}/analytics/${
                      $route.params.id
                    }?timeFilter=${$route.query.timeFilter}&filter=${
                      $route.params.field
                    }%3A${e(kv.key)}`
                  "
                >
                  <IconText :text="kv.key" type="domain" />
                </router-link>
              </td>
              <td v-else-if="$route.params.field === 'user_fp'">
                <router-link
                  :to="
                    `/dashboard/${$route.params.team}/analytics/${
                      $route.params.id
                    }?timeFilter=${$route.query.timeFilter}&filter=${
                      $route.params.field
                    }%3A${e(kv.key)}`
                  "
                >
                  <code>{{ kv.key }}</code>
                </router-link>
              </td>
              <td v-else>
                <router-link
                  :to="
                    `/dashboard/${$route.params.team}/analytics/${
                      $route.params.id
                    }?timeFilter=${$route.query.timeFilter}&filter=${
                      $route.params.field
                    }%3A${e(kv.key)}`
                  "
                >
                  {{ kv.key | kebabSentence }}
                </router-link>
              </td>
              <td>
                {{ kv.doc_count }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Aggregations } from "@/types/manage";
import Loading from "@/components/Loading.vue";
import Country from "@/components/Country.vue";
import IconText from "@/components/IconText.vue";

@Component({
  middleware: "auth",
  components: {
    Loading,
    Country,
    IconText
  }
})
export default class Dashboard extends Vue {
  loading = "";
  data: Aggregations[] = [];
  from = 0;
  titles = {
    user_fp: "Anonymous user ID"
  };

  get columnName() {
    if (this.titles[this.$route.params.field])
      return this.titles[this.$route.params.field];
    return "Key";
  }

  private mounted() {
    this.load();
  }

  private e(t: string) {
    return encodeURIComponent(t);
  }

  private load() {
    this.from = 0;
    this.loading = "Loading new data";
    this.$store
      .dispatch("manage/getAgastyaApiKeyGraphs", {
        team: this.$route.params.team,
        id: this.$route.params.id,
        field: this.$route.params.field,
        range: this.$route.query.timeFilter,
        from: this.from
      })
      .then(data => {
        this.data = data;
        if (!data.length) throw new Error("no-data");
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }
}
</script>
