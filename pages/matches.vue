<template>
  <div class="main-content flex-1 bg-transparent pb-24 md:pb-0">
    <div class="content flex flex-wrap">
      <div class="p-4 flex-1">
        <Title titleValue="Ces personnes ont aimé ton profil" />
        <table class="mt-4 min-w-full leading-normal">
          <tbody>
            <tr v-for="item in likemutual" :key="item.user._id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-16 h-16">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      :src="`http://localhost:3300/${item.user.photo[0]}`"
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
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ fromNow(item.createdAt) }}
                </p>
              </td>
              <td
                class="text-right px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
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
.main-content {
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 14%);
    height: 100%;
    color: #414141;
  }
}

td {
  font-size: 18px;
}
</style>