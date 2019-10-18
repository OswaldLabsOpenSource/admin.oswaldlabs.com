<template>
  <div class="user-journey">
    <div v-if="data && data[0] && data[0]._source">
      <div class="row text text--mb-2">
        <div>
          <div>
            <IconText
              heading="City"
              size="large"
              :text="placify(data[0]._source.city)"
              type="image"
            />
          </div>
        </div>
        <div>
          <div>
            <IconText
              heading="Region"
              size="large"
              :text="placify(data[0]._source.region_name)"
              type="image"
            />
          </div>
        </div>
        <div>
          <div>
            <IconText
              heading="Country"
              size="large"
              :text="data[0]._source.country_code || data[0]._source.ipCountry"
              type="country"
            />
          </div>
        </div>
      </div>
      <div class="row text text--mb-2">
        <div>
          <div>
            <IconText
              heading="Browser"
              size="large"
              :text="data[0]._source.browser_name"
              type="brand"
            />
          </div>
        </div>
        <div>
          <div>
            <IconText
              heading="Operating system"
              size="large"
              :text="data[0]._source.os_name"
              type="brand"
            />
          </div>
        </div>
        <div>
          <div>
            <IconText
              heading="Device"
              size="large"
              :text="
                data[0]._source[
                  'device_manufacturer' || 'device_model' || 'device_type'
                ]
              "
              type="brand"
            />
          </div>
        </div>
      </div>
      <div class="row text text--mb-2">
        <div>
          <IconText
            heading="Timezone"
            size="large"
            :text="data[0]._source.time_zone"
            type="image"
          />
        </div>
        <div>
          <div>
            <IconText
              heading="Session ID"
              size="large"
              :text="getId('session_id')"
              type="avatar"
            />
          </div>
        </div>
        <div>
          <div>
            <IconText
              heading="User ID"
              size="large"
              :text="getId('user_fp')"
              type="avatar"
            />
          </div>
        </div>
      </div>
      <div class="row text text--mb-2">
        <div>
          <IconText
            heading="Domain"
            size="large"
            :text="data[0]._source.url_domain"
            type="domain"
          />
        </div>
        <div>
          <IconText
            heading="Referrer"
            size="large"
            :text="data[0]._source.referrer_domain"
            type="domain"
          />
        </div>
        <div>
          <IconText
            heading="Ad blocking"
            size="large"
            :text="data[0]._source.adblock ? 'AdBlock On' : 'AdBlock Off'"
          />
        </div>
      </div>
      <ul>
        <li v-for="(item, i) in data" :key="`di${i}${item._id}`">
          <div v-if="item._source.date">
            {{
              new Date(item._source.date).toLocaleString({
                dateStyle: "full",
                timeStyle: "full"
              })
            }}
          </div>
          <div>
            <strong>{{ item._source.action | eventName }}: </strong>
            {{ item._source.event | eventName }}
            <q v-if="item._source.action === 'dialogflow'">
              <span v-if="item._source.event === 'bot-reply'">{{
                item._source.kv1
              }}</span>
              <em v-else>{{ item._source.description }}</em>
            </q>
            <span v-else-if="item._source.event === 'pageview'">
              on {{ item._source.url }}</span
            >
            <span v-else>{{ item._source.description }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";
import IconText from "@/components/IconText.vue";
import TimeAgo from "@/components/TimeAgo.vue";

@Component({
  computed: mapGetters({
    self: "auth/user"
  }),
  components: {
    IconText,
    TimeAgo
  }
})
export default class User extends Vue {
  self!: any;
  @Prop({
    required: true,
    default: () => {
      return [];
    }
  })
  data;

  placify(place: string) {
    try {
      if (place && this.data && this.data.length) {
        const country: string =
          this.data[0]._source.country_code ||
          this.data[0]._source.ipCountry ||
          "";
        return place.replace(`${country.toUpperCase()}:`, "");
      }
    } catch (error) {
      console.log(error);
    }
  }

  getId(type: string) {
    return typeof this.data[0]._source[type] === "string"
      ? this.data[0]._source[type].slice(0, 10)
      : this.data[0]._source[type];
  }
}
</script>

<style lang="scss" scoped>
.user-journey {
  ul {
    li {
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
    }
  }
}
</style>
