<template>
  <h2 :class="classValue" class="text-md uppercase font-medium text-gray-600">
    {{ titleValue }}
  </h2>
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