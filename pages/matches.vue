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
              <td
                class="pt-3 block md:table-cell px-2 md:px-5 md:border-b md:py-5 border-gray-200 bg-white text-sm"
              >
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
              <td
                class="block md:table-cell px-2 md:px-5 border-b md:py-5 py-2 border-gray-200 bg-white text-sm"
              >
                <div class="flex justify-between">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ fromNow(item.createdAt) }}
                  </p>
                  <span
                    @click="doAction('see', item.user._id)"
                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span class="relative cursor-pointer">
                      <fa icon="eye" />
                    </span>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template v-if="showDialog">
      <Dialog
        title="Détails de ton match"
        :class="showDialog ? 'fadeIn' : 'fadeOut'"
        :style="showDialog ? 'display: flex;' : 'display: none;'"
        secondBtn="Fermer"
        @dialogAction="hideDialog"
      >
        <div class="dialog w-full flex flex-col md:flex-row">
          <div class="dialog__image">
            <!-- <img class="ml-auto mr-auto w-32 h-32 md:w-40 md:h-40" src="https://fakeimg.pl/350x200/?text=Hello" /> -->
            <img
              class="ml-auto mr-auto w-32 h-32 md:w-40 md:h-40"
              :src="`${URI}/${detailsMatch.photo[0]}`"
            />
          </div>
          <div class="dialog__details px-0 md:px-4 py-6 md:py-0 flex-1">
            <ul>
              <li>
                <span class="font-medium">Prénom</span>&nbsp;:&nbsp;{{
                  detailsMatch.firstname
                }}
              </li>
              <li>
                <span class="font-medium">Age</span>&nbsp;:&nbsp;
                {{
                  $dateFns.differenceInYears(
                    new Date(),
                    new Date(detailsMatch.birthday)
                  )
                }}
                &nbsp;ans
              </li>
              <li>
                <span class="font-medium">Partage</span>&nbsp;:&nbsp;{{
                  detailsMatch.confidential
                }}
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </template>
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

    doAction(action, _id) {
      console.log(action);
      this.$getMatch(_id)
        .then((res) => {
          this.detailsMatch = res.data;
        })
        .catch((err) => console.log(err));

      setTimeout(() => {
        this.showDialog = true;
      }, 200);
    },

    hideDialog(payload) {
      if (payload == "second") {
        this.showDialog = false;
      }
    },
  },

  data: function () {
    return {
      URI: process.env.API,
      likemutual: [],

      detailsMatch: {},

      showDialog: false,
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

.dialog {
  &__image {
    img {
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>