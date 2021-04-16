<template>
  <div
    class="main__container bg-transparent leading-normal tracking-normal"
  >
    <FrontHeader />
    <div class="container content__container flex flex-col md:flex-row">
      <FrontSidebar />
      <Nuxt />
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

main {
  flex: 1;
}

.main__container {
  padding-right: 0;
  padding-left: 0;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content__container {
  flex: 1;
}
</style>
