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
          <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            <div class="p-5 bg-white rounded shadow-sm">
              <div class="text-base text-gray-400">Total Sales</div>
              <div class="flex items-center pt-1">
                <div class="text-2xl font-bold text-gray-900">$9850.90</div>
                <span
                  class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>1.8%</span>
                </span>
              </div>
            </div>
            <div class="p-5 bg-white rounded shadow-sm">
              <div class="text-base text-gray-400">Net Revenue</div>
              <div class="flex items-center pt-1">
                <div class="text-2xl font-bold text-gray-900">$7520.50</div>
                <span
                  class="flex items-center px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>2.5%</span>
                </span>
              </div>
            </div>
            <div class="p-5 bg-white rounded shadow-sm">
              <div class="text-base text-gray-400">Customers</div>
              <div class="flex items-center pt-1">
                <div class="text-2xl font-bold text-gray-900">1375</div>
                <span
                  class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>5.2%</span>
                </span>
              </div>
            </div>
            <div class="p-5 bg-white rounded shadow-sm">
              <div class="text-base text-gray-400">MRR</div>
              <div class="flex items-center pt-1">
                <div class="text-2xl font-bold text-gray-900">$250.00</div>
                <span
                  class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>2.2%</span>
                </span>
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
    };
  },

  methods: {
    rightBtnFunc() {},
  },
};
</script>

<style lang="scss" scoped>
</style>