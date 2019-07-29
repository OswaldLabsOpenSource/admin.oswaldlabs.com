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
          @input="$emit('input', $event.target.value)"
        />
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
  width: 4rem;
  border-radius: 0.2rem;
  border: 1px solid rgba(63, 81, 181, 0.15);
}
</style>
