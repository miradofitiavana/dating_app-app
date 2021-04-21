<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-yellow-500"
  >
    <div class="flex items-center">
      <button
        @click="$store.commit('sidebar/openBackSidebar')"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative mx-4 lg:mx-0"></div>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
        >
          <img class="h-full w-full object-cover" :src="imageUrl" />
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
        >
          <span
            @click="$router.push('/login')"
            class="menu-dropdown block px-4 py-2 text-sm text-gray-700 hover:text-white cursor-pointer"
          >
            Se déconnecter
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      dropdownOpen: false,
    };
  },

  computed: {
    imageUrl() {
      if (this.$store.state.auth.user != null) {
        return `${process.env.API}/${this.$store.state.auth.user.photo[0]}`;
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-color: #1e2129;

  .menu-dropdown {
    &:hover {
      background-color: #d3156a;
    }
  }
}
</style>