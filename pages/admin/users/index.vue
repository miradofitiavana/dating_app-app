<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Gestion des utilisateurs"
      :breadcrumbs="breadcrumbs"
      :showBack="false"
    />
    <!-- rightBtn="Nouveau"
      :rightBtnFunc="rightBtnFunc" -->

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="mx-auto px-6 py-8">
        <Table :columns="columns" :datas="dataTable" @action="getAction">
          <template v-slot:colValue="slotProps">
            <div v-if="['option1', 'option2'].includes(slotProps.item.key)">
              <span>
                {{ slotProps.item.data.answer }}
              </span>
            </div>
            <div v-else-if="['author'].includes(slotProps.item.key)">
              <span>
                {{ slotProps.item.data.firstname }}
              </span>
            </div>
            <div
              class="product__categories"
              v-else-if="slotProps.item.key === 'categories'"
            >
              <span
                v-for="(value, index) in slotProps.item.data"
                :key="index"
                class="py-1 px-3 text-xs font-bold"
              >
                {{ value.title }}
              </span>
            </div>
            <div
              v-else-if="['createdAt', 'birthday'].includes(slotProps.item.key)"
            >
              {{ $getFrenchDate(slotProps.item.data) }}
            </div>
            <span v-else>
              {{ slotProps.item.data }}
            </span>
          </template>
        </Table>
      </div>
    </main>

    <template v-if="showDialog">
      <Dialog
        v-if="typeAction == 'delete'"
        title="Confirmation"
        :class="showDialog ? 'fadeIn' : 'fadeOut'"
        :style="showDialog ? 'display: flex;' : ''"
        primeBtn="Annuler"
        secondBtn="Supprimer"
        @dialogAction="deleteDialog"
      >
        <p>
          Voulez-vous vraiment supprimer cette question&nbsp;? Cette action est
          irreversible.
        </p>
      </Dialog>
    </template>
  </div>
</template>

<script>
export default {
  layout: "admin",

  middleware: ["auth"],

  data: function () {
    return {
      // ariane
      breadcrumbs: [
        {
          icon: "tachometer-alt",
          anchor: "Tableau de bord",
          link: "/admin/dashboard",
        },
        { anchor: "Gestion des utilisateurs", link: "#" },
      ],
      // table
      columns: {
        firstname: "Prénom",
        birthday: "Date de naissance",
        createdAt: "Date d'inscription",
      },
      dataTable: [],
      actionsTable: [
        // {
        //   action: "edit",
        //   icon: "eye",
        // }
      ],
      // apollo
      loading: 0,
      // action modal
      typeAction: "",
      currentId: "",
      showDialog: false,
    };
  },

  methods: {
    getAction(payload) {
      console.log(payload);
      this.typeAction = payload.type;
      this.currentId = payload.value;
      switch (this.typeAction) {
        case "edit":
          this.$store.commit("form/disableFields");
          this.$router.push(`/admin/users/${payload.value}`);
          break;
        case "delete":
          break;
      }
      this.showDialog = true;
    },

    deleteDialog(payload) {
      console.log(payload);
      if (payload == "prime") {
        // ne pas supprimer
        this.showDialog = false;
      } else {
        // supprimer
        fetch(`${process.env.API_URL}/users/${this.currentId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "Application/json",
          },
        })
          .then((res) => {
            if (res.deleted) {
              console.log(res);
            }
            this.showDialog = false;
            this.getQuestions();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getQuestions() {
      fetch(`${process.env.API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.dataTable = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    rightBtnFunc() {
      this.$router.push(`/admin/users/new`);
    },
  },

  beforeMount() {
    this.getQuestions();
  },
};
</script>

<style lang="scss" scoped>
.dialog__container {
  width: 100%;
}

.product__categories {
  span {
    background-color: #d3156a;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
    margin-top: 2.5px;
    margin-bottom: 2.5px;

    + span {
      margin-left: 10px;
    }
  }
}
</style>