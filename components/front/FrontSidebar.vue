<template>
  <div
    class="sidebar bg-transparent h-16 md:h-auto fixed bottom-0 md:relative z-10 w-full"
  >
    <div
      class="sidebar__container md:absolute md:left-0 md:top-0 content-center md:content-start text-left justify-between"
    >
      <div class="hidden md:block pl-4 pr-4">
        <div
          class="profile__card rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3"
        >
          <img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
          <div class="flex justify-center -mt-8">
            <img
              :src="imageUrl"
              class="h-24 w-24 object-cover rounded-full border-solid border-white border-2 -mt-3"
            />
          </div>
          <div class="text-center px-3 pb-6 pt-2">
            <h3 class="text-black text-xl font-bold">{{ firstname }}</h3>
          </div>
        </div>
      </div>
      <ul
        class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-4 text-center md:text-left"
      >
        <li class="mr-3 flex-1">
          <NuxtLink
            to="/"
            class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
          >
            <fa icon="clone" class="pr-0 md:pr-3" />
            <span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
              >Rencontres</span
            >
          </NuxtLink>
        </li>
        <li class="mr-3 flex-1">
          <NuxtLink
            to="/matches"
            class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
          >
            <fa icon="link" class="pr-0 md:pr-3" />
            <span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
              >Matchs</span
            >
          </NuxtLink>
        </li>
        <li class="mr-3 flex-1">
          <NuxtLink
            to="/likes"
            class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800"
          >
            <fa icon="heart" class="pr-0 md:pr-3" />
            <span
              class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block"
              >Likes</span
            >
          </NuxtLink>
        </li>
        <li class="mr-3 flex-1">
          <NuxtLink
            to="/questions"
            class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
          >
            <fa icon="question-circle" class="pr-0 md:pr-3" />
            <span
              class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
              >Questions</span
            >
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    imageUrl() {
      if (this.$store.state.auth.user != null) {
        return `${process.env.API}/${this.$store.state.auth.user.photo[0]}`;
      }
      return "";
    },
    firstname() {
      if (this.$store.state.auth.user != null) {
        return `${this.$store.state.auth.user.firstname}`;
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  left: 0;
  background: -webkit-linear-gradient(145deg, #3b1d3f 0%, #d3156a 100%);
  @media (min-width: 768px) {
    /* height: calc(calc(100vh - 48px) - 3rem); */
  }
}

.sidebar,
.sidebar__container {
  @media (min-width: 768px) {
    width: 310px;
  }
}

.nuxt-link-exact-active {
  border-color: #3182ce;
}

.profile__card {
  background: #ccc;
  color: #414141;
}
</style>