<template>
  <div class="form-group">
    <div class="row">
      <no-ssr>
        <div class="blocks-container">
          <div
            class="item item--type-header"
            :style="
              `background-color: ${backgroundColor}; color: ${foregroundColor}`
            "
          >
            <slot />
          </div>
          <draggable v-model="arrayValue" :move="save">
            <transition-group class="blocks-container-inside">
              <div
                v-for="(card, i) in arrayValue"
                :key="`b${i}`"
                :class="`item item--slug-${card.slug} item--type-${card.type}`"
              >
                <div v-if="card.type === 'mode-card'" class="caption">
                  <img
                    class="small-app-icon"
                    alt=""
                    :src="`/app-store/${card.slug}.png`"
                  />
                  <span>{{ agastyaModes[card.slug] || card.slug }}</span>
                </div>
                <div v-else-if="card.type === 'intro-card'" class="caption">
                  <div>
                    <strong>{{ card.title }}</strong>
                  </div>
                  <div style="margin: 0.5rem 0">{{ card.subtitle }}</div>
                  <button class="fake-button" type="button">
                    {{ card.cta }}
                  </button>
                  <div v-if="opened.includes(i)" class="edit-settings">
                    <Input
                      label="Card title"
                      :value="card.title"
                      @input="val => updateVal(i, 'title', val)"
                    />
                    <Input
                      label="Card subtitle"
                      :value="card.subtitle"
                      @input="val => updateVal(i, 'subtitle', val)"
                    />
                    <Input
                      label="Call to action text"
                      :value="card.cta"
                      @input="val => updateVal(i, 'cta', val)"
                    />
                    <Input
                      label="Call to action link"
                      :value="card.url"
                      help="You can use Agastya protocol URLs like agastya-app:modes/all"
                      @input="val => updateVal(i, 'url', val)"
                    />
                    <button class="button" type="button" @click="opened = []">
                      <span>Done</span>
                    </button>
                  </div>
                </div>
                <div v-else-if="card.slug === 'uptime-robot'" class="caption">
                  <img
                    class="small-app-icon"
                    alt=""
                    :src="`/app-store/uptime-robot.png`"
                  />
                  <span>Uptime Robot status</span>
                  <div v-if="opened.includes(i)" class="edit-settings">
                    <Input
                      label="API key"
                      :value="card.key"
                      @input="val => updateVal(i, 'key', val)"
                    />
                    <button class="button" type="button" @click="opened = []">
                      <span>Done</span>
                    </button>
                  </div>
                </div>
                <div v-else-if="card.type === 'link-card'" class="caption">
                  <img
                    class="small-app-icon"
                    alt=""
                    :src="`/app-store/link.png`"
                  />
                  <span>{{ card.title }}</span>
                  <div v-if="opened.includes(i)" class="edit-settings">
                    <Input
                      label="Link title"
                      :value="card.title"
                      @input="val => updateVal(i, 'title', val)"
                    />
                    <Input
                      label="Link URL"
                      help="You can use Agastya protocol URLs like agastya-app:modes/all"
                      :value="card.url"
                      @input="val => updateVal(i, 'url', val)"
                    />
                    <button class="button" type="button" @click="opened = []">
                      <span>Done</span>
                    </button>
                  </div>
                </div>
                <div v-else class="caption">{{ card.name || card }}</div>
                <div v-if="!opened.includes(i)" class="actions">
                  <button
                    v-if="
                      ['link-card', 'intro-card'].includes(card.type) ||
                        ['uptime-robot'].includes(card.slug)
                    "
                    aria-label="Edit"
                    data-balloon-pos="up"
                    type="button"
                    class="button button--type-icon button--size-small"
                    style="margin-right: 0.5rem"
                    @click="opened.push(i)"
                  >
                    <font-awesome-icon
                      class="icon"
                      icon="pencil-alt"
                      fixed-width
                    />
                  </button>
                  <button
                    aria-label="Delete"
                    data-balloon-pos="up"
                    type="button"
                    class="button button--color-danger button--type-icon button--size-small"
                    @click="deleteItem(i)"
                  >
                    <font-awesome-icon
                      class="icon icon--color-danger"
                      icon="trash"
                      fixed-width
                    />
                  </button>
                </div>
              </div>
            </transition-group>
          </draggable>
          <div class="item item--type-footer">
            Customization options
          </div>
        </div>
      </no-ssr>
      <div>
        <button class="button" type="button" @click="() => (showAdd = true)">
          <font-awesome-icon icon="plus" class="icon icon--mr-1" />
          <span>Add mode block</span>
        </button>
      </div>
    </div>
    <transition name="modal">
      <Modal v-if="showAdd" :on-close="() => (showAdd = false)">
        <h2>Add new block</h2>
        <div class="blocks-list">
          <button
            v-for="(option, i) in options"
            :key="`o${i}`"
            class="button"
            type="button"
            @click="addItem(option)"
          >
            <img
              class="small-app-icon"
              alt=""
              :src="`/app-store/${option.slug}.png`"
            />
            <span>{{
              agastyaModes[option.slug] ||
                option.name ||
                option.slug ||
                option.title ||
                option.type ||
                option
            }}</span>
          </button>
        </div>
      </Modal>
    </transition>
    <div
      v-if="help"
      class="text text--size-small text--color-light text--lh-1 text text--mt-05"
    >
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faPlus,
  faTrash,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import en from "@/locales/en";
import Modal from "@/components/Modal.vue";
import Input from "@/components/form/Input.vue";
const agastyaModes = en.agastyaModes;
library.add(faTimes, faPlus, faTrash, faPencilAlt);

@Component({
  components: {
    draggable,
    FontAwesomeIcon,
    Modal,
    Input
  }
})
export default class Blocks extends Vue {
  @Prop({ default: [] }) options;
  @Prop() value;
  @Prop() label;
  @Prop() required;
  @Prop() help;
  @Prop({ default: "#333" }) backgroundColor;
  @Prop({ default: "#333" }) foregroundColor;
  labelId = "";
  showAdd = false;
  arrayValue: any[] = [];
  agastyaModes = agastyaModes;
  opened: number[] = [];

  private created() {
    this.labelId = Math.random()
      .toString(36)
      .substring(7);
    if (typeof this.value === "string") {
      this.arrayValue = JSON.parse(this.value);
    } else if (this.value) {
      this.arrayValue = JSON.parse(JSON.stringify(this.value));
    }
  }

  private save() {
    this.$emit("input", this.arrayValue);
  }

  private deleteItem(index: number) {
    this.arrayValue = [...this.arrayValue].filter((val: any, i) => i !== index);
  }

  private addItem(option: any) {
    this.arrayValue.push(option);
    this.showAdd = false;
  }

  private updateVal(index: number, key: string, value: string) {
    const array = [...this.arrayValue];
    array[index][key] = value;
    this.arrayValue = array;
  }

  @Watch("arrayValue", { deep: true })
  onArrayValueChanged() {
    this.save();
  }
}
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  padding: 0.5rem 1.25rem;
  width: 49%;
  position: relative;
  cursor: move;
  &.item--type-intro-card,
  &.item--type-link-card,
  &.item--type-header,
  &.item--type-footer,
  &.item--type-app-card {
    width: 100%;
  }
  .actions {
    position: absolute;
    z-index: 1;
    right: 0.5rem;
    top: 0.5rem;
  }
  &.item--type-header {
    box-shadow: none;
    margin-bottom: 0;
    border-radius: 0.75rem 0.75rem 0 0;
    text-align: left;
    padding: 1rem;
  }
  &.item--type-footer {
    border-radius: 0 0 0.75rem 0.75rem;
    background-color: #eee;
    margin-top: -0.75rem;
    text-align: center;
  }
}
.blocks-container-inside {
  display: flex;
  flex-wrap: wrap;
  background-color: #eee;
  padding: 0.5rem;
  justify-content: space-between;
}
.caption {
  white-space: nowrap;
  margin: 0.5rem 0;
}
.edit-settings {
  margin-top: 1rem;
}
.blocks-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  button {
    margin-bottom: 1rem;
    width: 47%;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
}
.fake-button {
  font: inherit;
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  border: 1px solid;
  background: transparent;
}
.small-app-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  vertical-align: middle;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
}
</style>
