<template>
  <nav
    class="bg-transparent container h-auto md:pt-4 mt-0 pb-1 pt-4 px-1 top-0 w-full z-20 mb-3 md:mb-0"
  >
    <div class="flex flex-wrap items-center pl-4 pr-4">
      <div
        class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white"
      >
        <NuxtLink to="/">
          <div class="cursor-pointer flex items-center">
            <div>
              <Logo class="w-8 lg:w-10" />
            </div>
            <div class="logo__text text-2xl tracking-wide ml-2 font-semibold">
              AskMe
            </div>
          </div>
        </NuxtLink>
      </div>

      <div
        class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"
      ></div>

      <div class="flex content-center justify-between md:w-1/3 md:justify-end">
        <ul
          class="list-reset flex justify-between flex-1 md:flex-none items-center"
        >
          <li class="flex-1 md:flex-none mr-6">
            <NuxtLink class="link__top" to="/profile">
              <fa icon="user" />
            </NuxtLink>
          </li>
          <li class="flex-1 md:flex-none">
            <span class="link__top" @click="logout">
              <fa icon="sign-out-alt" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("login");
    },
  },

  computed: {
    user() {
      if (this.$store.state.auth.user != null) {
        return this.$store.state.auth.user;
      }
      return { firstname: "" };
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  flex: 0;
}

.logo__text {
  color: #dcdcdc;
}

.link__top {
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #dcdcdc;
  }
}
</style>