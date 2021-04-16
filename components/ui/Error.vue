<template>
  <div
    class="flex mt-4 items-center bg-red-600 text-white text-sm font-bold px-4 py-3 text-base"
    role="alert"
  >
    <fa icon="exclamation-triangle" />
    <p class="pl-4">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: !String,
  },
};
</script>

<style lang="scss" scoped>
</style>