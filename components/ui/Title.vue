<template>
  <h1
    :class="classValue"
    class="text-2xl lg:text-4xl font-bold"
  >
    {{ titleValue }}
  </h1>
</template>

<script>
export default {
  props: {
    titleValue: {
      type: String,
      required: true,
    },
    classValue: String,
  },
};
</script>

<style lang="scss" scoped>
</style>