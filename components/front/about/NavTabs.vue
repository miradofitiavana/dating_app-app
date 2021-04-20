<template>
  <nav class="flex flex-row shadow-sm mb-3 md:mb-4">
    <button
      class="btn__tabs w-1/2 text-gray-600 py-4 md:px-6 block focus:outline-none"
      @click="() => $emit('currentActive', { data: 1 })"
      :class="active == 1 ? 'btn__tabs--active' : ''"
    >
      Mon profile
    </button>
    <button
      class="btn__tabs w-1/2 text-gray-600 py-4 md:px-6 block focus:outline-none"
      @click="() => $emit('currentActive', { data: 2 })"
      :class="active == 2 ? 'btn__tabs--active' : ''"
    >
      Mes préférences
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    active: Number,
  },
};
</script>

<style lang="scss" scoped>
.btn__tabs {
  @media (max-width: 767px) {
    font-size: 14px;
  }

  &--active {
    border-bottom-width: 2px;
    color: #3b1d3f;
    font-weight: 700;
    border-bottom-color: #d3156a;
  }
}
</style>