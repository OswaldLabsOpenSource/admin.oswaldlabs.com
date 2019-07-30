<template>
  <div class="cards-list">
    <div v-for="item in data" :key="`i${item.key}`" class="card-item">
      <img alt="" :src="`/app-store/${item.key}.png`" />
      <div class="item-title">{{ item.title }}</div>
      <div class="item-text">{{ item.description }}</div>
      <div
        v-if="item.params && isActive(item.key) && opened.includes(item.key)"
      >
        <div v-for="param in item.params" :key="`i${item.key}${param.model}`">
          <Checkbox
            v-if="param.type === 'boolean'"
            :label="param.label"
            :value="
              result[item.key] ? result[item.key][param.model] : param.value
            "
            :help="param.message"
            :required="param.required"
            @input="val => updateValue(item.key, param.model, val)"
          />
          <Input
            v-else
            :label="param.label"
            :value="
              result[item.key] ? result[item.key][param.model] : param.value
            "
            :help="param.message"
            :required="param.required"
            @input="val => updateValue(item.key, param.model, val)"
          />
        </div>
      </div>
      <button
        v-if="item.params && isActive(item.key) && opened.includes(item.key)"
        type="button"
        class="button"
        style="margin-right: 0.5rem"
        @click="() => (opened = [])"
      >
        Done
      </button>
      <button
        v-if="isActive(item.key) && item.params && !opened.includes(item.key)"
        type="button"
        class="button button--type-icon"
        style="margin-right: 0.5rem"
        aria-label="Edit"
        @click="() => opened.push(item.key)"
      >
        <font-awesome-icon class="icon" icon="pencil-alt" fixed-width />
      </button>
      <button
        v-if="isActive(item.key)"
        type="button"
        class="button button--type-icon button--color-danger"
        aria-label="Disable"
        @click="disable(item)"
      >
        <font-awesome-icon class="icon" icon="trash" fixed-width />
      </button>
      <button v-else type="button" class="button" @click="enable(item)">
        Enable
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import en from "@/locales/en";
import Modal from "@/components/Modal.vue";
import Input from "@/components/form/Input.vue";
import Checkbox from "@/components/form/Checkbox.vue";
library.add(faTrash, faPencilAlt);

@Component({
  components: {
    FontAwesomeIcon,
    Modal,
    Input,
    Checkbox
  }
})
export default class Blocks extends Vue {
  @Prop({ default: [] }) integrations;
  @Prop() value;
  opened: string[] = [];
  data: any = [];
  result: any = {};

  private created() {
    const data: any = [];
    Object.keys(this.integrations).forEach(key => {
      data.push({
        key,
        ...this.integrations[key]
      });
    });
    this.data = data;
    if (this.value) this.result = { ...this.value };
  }

  private enable(integration) {
    const i = { ...integration };
    const result = { ...this.result };
    delete i.key;
    delete i.title;
    delete i.description;
    delete i.params;
    if (Object.keys(i).length) {
      result[integration.key] = i;
    } else {
      result[integration.key] = true;
    }
    this.result = result;
    if (integration.params) this.opened.push(integration.key);
    this.update();
  }

  private disable(integration) {
    const result = { ...this.result };
    delete result[integration.key];
    this.result = result;
    this.update();
  }

  private update() {
    console.log(JSON.stringify(this.result));
    this.$emit("input", this.result);
  }

  private updateValue(key: string, model: string, value: string | boolean) {
    const result = { ...this.result };
    result[key] = typeof result[key] === "object" ? result[key] : {};
    result[key][model] = value;
    this.result = result;
    this.update();
  }

  private isActive(key: string) {
    return Object.keys(this.result).includes(key);
  }
}
</script>

<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-wrap: wrap;
  .card-item {
    width: 280px;
    border-radius: 0.2rem;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.2);
    padding: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 30%;
    }
    .item-title {
      font-weight: bold;
      margin: 0.5rem 0;
    }
    .item-text {
      font-size: 95%;
      margin-bottom: 1rem;
    }
  }
}
</style>
