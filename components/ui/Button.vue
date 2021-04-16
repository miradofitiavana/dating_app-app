<template>
  <button class="btn" @click.prevent="btnFunc">
    <slot>bouton</slot>
  </button>
</template>

<script>
export default {
  props: {
    btnFunc: Function,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  font-size: 14px;
  line-height: 58px;
  text-align: center !important;
  letter-spacing: 1.4px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  width: 220px;
  height: 60px;
  display: inline-block;
  text-transform: uppercase;
  border-radius: $border-radius;
  border: 2px solid transparent;
  transition: all 0.5s linear;
  border-color: #fff;
  color: #fff;
  text-decoration: none;
  outline: none;

  &:hover {
    background: #fff;
    color: #414141;
    border-color: #414141;
  }

  &:disabled {
    background-color: #828282;
    color: #414141;
    border-color: #414141;
    cursor: not-allowed;
  }

  &-white {
    background: #fff;
    color: #414141;

    &:hover {
      background: transparent;
      color: #fff;
      border-color: #fff;
    }
  }

  &-full {
    width: 100%;
  }

  &-block {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  &-selected {
    background: #fff;
    color: #414141;
  }

  &-black {
    background-color: #414141;
    color: #fff;
    border-color: #fff;

    &:hover {
      border-color: #414141;
      color: #414141;
    }
  }

  &-h-auto {
    height: auto;
  }

  &-w-auto {
    width: auto;
  }

  &-no-border {
    width: auto;
    font-size: 20px;
    border: none;
  }

  &-h-80 {
    height: 80px;
  }

  &-no-mt {
    margin-top: 0px;
  }
}
</style>