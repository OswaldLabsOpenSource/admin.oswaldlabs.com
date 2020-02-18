<template>
  <div class="form-group">
    <label :for="labelId">{{ label }}</label>
    <div class="row row--type-mobile">
      <div
        class="column column--type-shrink input--type-color"
        :style="`background-color: ${value}`"
      />
      <div class="column column--type-grow">
        <input
          :id="labelId"
          :value="value"
          :type="type"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :required="required"
          :min="min"
          :max="max"
          v-bind="$attrs"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          class="input input--font-monospace"
          @input="$emit('input', $event.target.value)"
        />
        <div class="list list--type-colors">
          <button
            v-for="(color, i) in colors"
            :key="`c${color}${i}`"
            :aria-label="color"
            type="button"
            :style="`background: ${i}`"
            @click="$emit('input', i)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="help"
      class="text text--size-small text--color-light text--lh-1 text text--mt-05"
    >
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop({ default: "text" }) type;
  @Prop({
    default: () => {
      return {
        "#d30000": "Red",
        "#e65722": "Orange",
        "#9d8319": "Reef gold",
        "#4b6a88": "Blue gray",
        "#555555": "Gray",
        "#e000e0": "Pink",
        "#e73c70": "Magenta",
        "#1978d4": "Blue",
        "#008080": "Teal",
        "#28a228": "Green"
      };
    }
  })
  colors;

  @Prop() value;
  @Prop() label;
  @Prop() required;
  @Prop() placeholder;
  @Prop() help;
  @Prop() autocomplete;
  @Prop() min;
  @Prop() max;
  labelId = "";

  private created() {
    this.labelId = Math.random()
      .toString(36)
      .substring(7);
  }
}
</script>

<style lang="scss">
.input--type-color {
  width: 3rem;
  border-radius: 0.2rem;
  border: 1px solid rgba(63, 81, 181, 0.15);
}
.list--type-colors {
  display: flex;
  > button {
    border: 1px solid rgba(63, 81, 181, 0.15);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    box-sizing: border-box;
  }
}
</style>
