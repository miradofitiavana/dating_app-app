<template>
  <span><slot></slot></span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
span {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  padding: 5px 10px;
  background-color: #fff;
  border-color: #d3156a;
  border-width: 1px;
  border-radius: $border-radius;
  color: #414141;
  font-size: 14px;
  box-sizing: border-box;
}
</style>