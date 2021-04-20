<template>
  <div
    class="border-2 w-full md:w-48 bg-white rounded-lg  mb-2 shadow-sm md:shadow-md p-2 md:p-6 hover:cursor-pointer md:mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
    :class="{
      'bg-green-lightest shadow-outline-green':
        this.activeRadio === this.radioValue,
    }"
    tabindex="0"
    @click="updateActiveRadio"
    @keydown.space="updateActiveRadio"
  >
    <div class="flex justify-between items-center md:mb-3">
      <h3 class="uppercase text-base tracking-wide text-blue-darker md:my-2">
        {{ this.radioTitle }}
      </h3>
      <div v-if="this.activeRadio === this.radioValue">
        <svg
          class="w-6 h-6"
          width="200px"
          height="200px"
          viewBox="0 0 200 200"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="checkmark-outline" fill-rule="nonzero">
              <path
                d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z"
                id="Shape"
                fill="#d3156a"
              ></path>
              <polygon
                id="Path"
                fill="#fff"
                points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"
              ></polygon>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "activeRadio",
    event: "onUpdateRadio",
  },
  props: ["radioTitle", "radioValue", "activeRadio"],
  methods: {
    updateActiveRadio() {
      this.$emit("onUpdateRadio", this.radioValue);
    },
  },
};
</script>

