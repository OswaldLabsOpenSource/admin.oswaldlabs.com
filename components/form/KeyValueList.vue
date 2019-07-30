<template>
  <div class="form-group">
    <div
      v-if="help"
      class="text text--size-small text--color-light text--lh-1 text text--mt-m05 text--mb-05"
    >
      {{ help }}
    </div>
    <table class="table">
      <tbody>
        <tr v-for="(item, index) in list" :key="`p_${index}`">
          <td>
            <Select
              v-if="keyOptions"
              :label="keyLabel"
              :value="item.key"
              :options="keyOptions"
              @input="val => input(index, 'key', val)"
            >
            </Select>
            <Input
              v-else
              :label="keyLabel"
              :value="item.key"
              @input="val => input(index, 'key', val)"
            />
          </td>
          <td>
            <Input
              :label="valueLabel"
              :value="item.value"
              :code="code"
              @input="val => input(index, 'value', val)"
            />
          </td>
          <td class="text text--align-right">
            <button
              aria-label="Remove"
              data-balloon-pos="up"
              class="button button--type-icon button--color-danger"
              type="button"
              @click.prevent="remove(item.key)"
            >
              <font-awesome-icon
                class="icon icon--color-danger"
                icon="times"
                fixed-width
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="button button--type-icon" type="button" @click.prevent="add">
      <font-awesome-icon class="icon icon--mr-1" icon="plus" fixed-width />
      <span>Add another</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/form/Input.vue";
import Select from "@/components/form/Select.vue";
library.add(faTimes, faPlus);

@Component({
  components: {
    FontAwesomeIcon,
    Input,
    Select
  }
})
export default class KeyValueList extends Vue {
  @Prop() value;
  @Prop() keyOptions;
  @Prop() keyLabel;
  @Prop() valueLabel;
  @Prop({ default: false }) code;
  @Prop() help;
  list: any = [];
  objectList: any = {};

  private mounted() {
    if (this.value) {
      const list: any = [];
      Object.keys(this.value).forEach(key => {
        list.push({
          key,
          value: this.value[key]
        });
      });
      this.list = list;
    }
  }

  private add() {
    let key = "";
    if (this.keyOptions) {
      const keys = Object.keys(this.keyOptions);
      if (keys.length) key = keys[0];
    }
    this.list.push({
      key,
      value: ""
    });
    this.update();
  }

  private remove(index) {
    const list = [...this.list].filter(item => item.key !== index);
    this.list = list;
    this.update();
  }

  private input(index, type, val) {
    const item = this.list[index];
    item[type] = val;
    this.list[index] = item;
    this.update();
  }

  private update() {
    const objectList = {};
    this.list.forEach(item => {
      objectList[item.key] = item.value;
    });
    this.objectList = objectList;
    this.$emit("input", this.objectList);
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  table {
    margin-bottom: 1rem;
    td,
    th {
      padding: 0;
      padding-top: 0.5rem;
      &:first-child {
        padding-right: 0.5rem;
      }
      &:last-child {
        width: 7%;
      }
    }
    tr:nth-child(even) {
      background-color: transparent;
    }
  }
}
</style>
