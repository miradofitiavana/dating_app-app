<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Tableau de bord"
      :breadcrumbs="breadcrumbs"
      :showBack="false"
    />

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="mx-auto px-6 py-8">
        <div class="flex items-center justify-center">
          <div class="flex flex-wrap -mx-1 overflow-hidden w-full">
            <div class="my-1 px-1 w-full overflow-hidden lg:w-1/3">
              <div
                class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400"
                  >
                    Utilisateurs
                  </p>
                  <p
                    class="text-3xl font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {{ countUser }}
                  </p>
                </div>
              </div>
            </div>

            <div class="my-1 px-1 w-full overflow-hidden lg:w-1/3">
              <div
                class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400"
                  >
                    Questions
                  </p>
                  <p
                    class="text-3xl font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {{ countQuestion }}
                  </p>
                </div>
              </div>
            </div>

            <div class="my-1 px-1 w-full overflow-hidden lg:w-1/3">
              <div
                class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400"
                  >
                    Matchs
                  </p>
                  <p
                    class="text-3xl font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {{ countMatch }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data: function () {
    return {
      // ariane
      breadcrumbs: [
        {
          icon: "tachometer-alt",
          anchor: "Tableau de bord",
          link: "#",
        },
      ],

      //
      countUser: 0,
      countMatch: 0,
      countQuestion: 0,
    };
  },

  methods: {
    getCount() {
      fetch(`${process.env.API_URL}/admin-count`, {
        headers: {
          "Content-type": "Application/json",
        },
      })
        .then((res) => {
          this.countUser = res.countUser;
          this.countMatch = res.countMatch;
          this.countQuestion = res.countQuestion;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>