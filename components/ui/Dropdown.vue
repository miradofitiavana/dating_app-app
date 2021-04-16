<template>
  <div class="dropdown" @mouseenter="show = !show" @mouseleave="show = false">
    <button
      class="btn btn-success dropdown-toggle"
      type="button"
      @click="show = !show"
    >
      Dropdown button
    </button>
    <transition name="fade">
      <div class="dropdown-menu" v-if="show">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
}
.dropdown-menu {
  display: block !important;
  position: absolute;
  z-index: 999;
  background: #d3156a ;
  padding: 10px;
  color: #fff;
  margin-top: 10px;

  a {
    font-size: 16px;
    display: block;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>