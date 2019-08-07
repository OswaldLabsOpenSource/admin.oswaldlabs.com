<template>
  <main></main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Settings extends Vue {
  private created() {
    this.$router.replace(`/manage/${this.$route.params.team}/agastya`);
  }
}
</script>

<style lang="scss" scoped></style>
