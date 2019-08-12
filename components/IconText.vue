<template>
  <div class="icon-text">
    <div class="flag" :style="`background-image: url('${image}')`"></div>
    <div>{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import analyticsIcons from "analytics-icons";

@Component({})
export default class Country extends Vue {
  @Prop({ default: "" }) text;

  get image() {
    return analyticsIcons(this.text);
  }

  get name() {
    return this.text || "Name";
  }
}
</script>

<style lang="scss" scoped>
.icon-text {
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  > * {
    display: inline-block;
  }
}
.flag {
  margin: -1.33rem 0.5rem -1rem 0;
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  border-radius: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
