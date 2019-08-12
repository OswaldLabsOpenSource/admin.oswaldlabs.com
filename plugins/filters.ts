import Vue from "vue";
Vue.filter("currency", (value: number) =>
  ((value || 0) / 100).toLocaleString()
);

Vue.filter("number", (value: number) =>
  ((value || 0)).toLocaleString()
);

Vue.filter("shortText", (value: string) =>
  (typeof value === "string" ? value : "").length > 20 ? `${(typeof value === "string" ? value : "").substring(0, 20)}...` : (typeof value === "string" ? value : "")
);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

Vue.filter("kebabSentence", (value: string) =>
  capitalizeFirstLetter((typeof value === "string" ? value : "").replace(/-/g, " "))
);
