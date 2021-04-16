<template>
  <div>
    <BackSubHeader
      :titleValue="titleValue"
      :subTitleValue="subTitleValue"
      :backFunc="backFunc"
      :rightBtn="rightBtn"
      :rightBtnFunc="rightBtnFunc"
      :showBack="true"
    />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
          <FormField
            inputType="text"
            inputName="category"
            inputLabel="Catégorie"
            :inputModel="category.title"
            :disableField="areFieldsDisabled"
            @valueChanged="(payload) => (category.title = payload.inputValue)"
          />
        </form>
      </div>
    </main>
    <!-- <Toast v-show="showToast" :showToast="showToast" /> -->
  </div>
</template>

<script>
export default {
  layout: "admin",

  data: function () {
    return {
      category: {},
      loading: 0,
      titleValue: "",
      subTitleValue: "Détails de la catégorie",
      rightBtn: "", //,

      showToast: false,

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      // console.log("backFunc");
      this.$router.push(`/admin/categories`);
    },

    rightBtnFunc() {
      if (this.areFieldsDisabled) {
        this.$store.commit("form/enableFields");
        this.rightBtn = "Enregistrer";
      } else {
        this.$store.commit("form/disableFields");
        this.rightBtn = "Modifier";
        fetch(`${process.env.API_URL}/categorie/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(this.category),
        })
          .then((res) => res.json())
          .then((res) => {
            this.category = res.data;
            this.titleValue = this.category.title;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },

  beforeMount() {
    this.$store.commit("form/disableFields");
    this.rightBtn = "Modifier";
    fetch(`${process.env.API_URL}/categorie/${this.$route.params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.category = res.data;
        this.titleValue = this.category.title;
        console.log(this.category.title);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  beforeDestroy() {
    this.$store.commit("form/enableFields");
  },

  computed: {
    areFieldsDisabled() {
      return this.$store.state.form.disableFields;
    },
  },

  watch: {
    loading() {
      console.log(this.loading);
      //   console.log(this.category);
    },
    category() {
      //   console.log(this.loading);
      return this.category;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>