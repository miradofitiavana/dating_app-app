<template>
  <div class="main__container bg-transparent leading-normal tracking-normal">
    <FrontHeader />
    <div class="container content__container flex flex-col md:flex-row">
      <FrontSidebar />
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
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
  cursor: default;
}

main {
  flex: 1;
}

.main__container {
  padding-right: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  cursor: default;

  .content__container {
    flex: 1;
    overflow: hidden;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: default;

  .content {
    flex: 1;
    border-radius: 0px;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 14%);
    height: 100%;
    color: #414141;
    cursor: default;

    @media (min-width: 768px) {
      border-radius: 8px;
    }

    > div {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    nav {
      flex: 0;

      + div {
        height: 100%;
      }
    }

    .questions,
    .votes {
      flex: 1;
    }
  }
}
</style>
