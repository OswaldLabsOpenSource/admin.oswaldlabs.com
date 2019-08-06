import Vue from "vue";
Vue.filter("currency", (value: number) =>
  ((value || 0) / 100).toLocaleString()
);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

Vue.filter("kebabSentence", (value: string) =>
  capitalizeFirstLetter(value.replace(/-/g, " "))
);
