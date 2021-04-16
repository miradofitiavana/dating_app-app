<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Gestion des catégories"
      :breadcrumbs="breadcrumbs"
      :showBack="false"
      rightBtn="Nouveau"
      :rightBtnFunc="rightBtnFunc"
    />

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="mx-auto px-6 py-8">
        <Table
          :columns="columns"
          :datas="dataTable"
          :actions="actionsTable"
          @action="getAction"
        />
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
          Voulez-vous vraiment supprimer cette catégorie&nbsp;? Cette action est
          irreversible.
        </p>
      </Dialog>
    </template>
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
          link: "/admin/dashboard",
        },
        { anchor: "Gestion des catégories", link: "#" },
      ],
      // table
      columns: { title: "Catégorie" },
      dataTable: [],
      actionsTable: [
        {
          action: "edit",
          icon: "eye",
        },
        {
          action: "delete",
          icon: "trash-alt",
        },
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
          this.$router.push(`/admin/category/${payload.value}`);
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
        fetch(`${process.env.API_URL}/categorie/${this.currentId}`, {
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
            this.getCategories();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getCategories() {
      this.$get_categories()
        .then((res) => {
          this.dataTable = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    rightBtnFunc() {
      this.$router.push(`/admin/category/new`);
    },
  },

  beforeMount() {
    this.getCategories();
  },
};
</script>

<style lang="scss" scoped>
.dialog__container {
  width: 100%;
}
</style>