<template>
  <div class="icon-text">
    <div
      v-if="image"
      :class="`flag flag--size-${size}`"
      :style="`background-image: url('${image}')`"
      :aria-label="showText ? undefined : name"
      data-balloon-pos="up"
    ></div>
    <div v-if="showText">
      <div v-if="heading">
        <strong>{{ heading }}</strong>
      </div>
      <div>{{ name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import analyticsIcons from "analytics-icons";
import { getAllCountries } from "countries-and-timezones";
const countries = getAllCountries();

@Component({})
export default class Country extends Vue {
  @Prop({ default: "" }) text;
  @Prop() heading;
  @Prop({ default: "brand" }) type;
  @Prop({ default: "medium" }) size;
  @Prop({ default: true }) showText;

  get image() {
    if (this.text === "" || this.text === "unknown") return;
    if (this.type === "image")
      return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
        this.text
      )}&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`;
    if (this.type === "domain") return `https://unavatar.now.sh/${this.text}`;
    if (this.type === "avatar")
      return `https://api.adorable.io/avatars/100/${encodeURIComponent(
        this.text
      )}`;
    return analyticsIcons(this.text);
  }

  get name() {
    return this.type === "country"
      ? (countries[this.text.toUpperCase()]
          ? countries[this.text.toUpperCase()].name
          : this.text) || this.text
      : this.text;
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
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  &.flag--size-large {
    width: 3rem;
    height: 3rem;
    margin-top: -2.5rem;
    margin-right: 0.75rem;
  }
}
</style>
