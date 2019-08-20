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
                <Country :code="kv.key" />
              </td>
              <td
                v-if="
                  $route.params.field === 'browser_name' ||
                    $route.params.field === 'os_name' ||
                    $route.params.field === 'device_manufacturer'
                "
              >
                <IconText :text="kv.key" />
              </td>
              <td v-else-if="$route.params.field === 'referrer_domain'">
                <IconText :text="kv.key" type="domain" />
              </td>
              <td v-else-if="$route.params.field === 'user_fp'">
                <code>{{ kv.key }}</code>
              </td>
              <td v-else>{{ kv.key | kebabSentence }}</td>
              <td>{{ kv.doc_count }}</td>
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
