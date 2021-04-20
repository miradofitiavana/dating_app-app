<template>
  <div class="main-content flex-1 bg-transparent pb-0 order-1 md:order-2">
    <div class="content flex flex-wrap">
      <div class="p-4 flex-1">
        <Title class="text-center" titleValue="Tes matchs" />
        <div
          class="flex flex-1 justify-center"
          v-if="likemutual.length == 0 || likemutual == null"
        >
          <div
            class="text-center question__empty w-full h-full flex justify-center items-center font-semibold text-lg md:text-xl"
          >
            <div class="question__none">
              <p>Il semblerait que tu n'ais pas encore de match...</p>
              <p>Reviens plus tard ou aime d'autres profils.</p>
            </div>
          </div>
        </div>

        <table v-else class="mt-4 min-w-full leading-normal">
          <tbody>
            <tr v-for="item in likemutual" :key="item.user._id">
              <td class="pt-3 block md:table-cell px-2 md:px-5 md:border-b md:py-5 border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-16 h-16">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      :src="`${URI}/${item.user.photo[0]}`"
                    />
                  </div>
                  <div class="ml-5">
                    <p class="font-medium text-gray-900 whitespace-no-wrap">
                      {{ item.user.firstname }},
                      {{
                        $dateFns.differenceInYears(
                          new Date(),
                          new Date(item.user.birthday)
                        )
                      }}&nbsp;ans
                    </p>
                  </div>
                </div>
              </td>
              <td class="block md:table-cell px-2 md:px-5 border-b md:py-5 py-2 border-gray-200 bg-white text-sm">
                <div class="flex justify-between">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ fromNow(item.createdAt) }}
                  </p>
                  <span
                    @click="doAction('reject')"
                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span class="relative">
                      <fa icon="times" />
                    </span>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import fr from "date-fns/locale/fr";
export default {
  middleware: ["auth", "process"],

  methods: {
    fromNow(date) {
      return this.$dateFns.distanceInWords(new Date(), new Date(date), {
        locale: fr,
        addSuffix: true,
      });
    },

    doAction(action) {
      console.log(action);
    },
  },

  data: function () {
    return {
      URI: process.env.API,
      likemutual: [],
    };
  },

  beforeMount() {
    const token = this.$cookies.get("token");
    fetch(`${process.env.API_URL}/user-likemutual`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.likemutual = res.data;
      });
  },
};
</script>

<style lang="scss" scoped>
td {
  font-size: 18px;
}
</style>