<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <validation-observer v-slot="{ invalid }" slim>
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
              class="form-v2 no-margin error-black"
              inputType="text"
              inputName="category"
              inputLabel="Catégorie"
              :inputModel="category.title"
              :disableField="areFieldsDisabled"
              inputValidator="required"
              @valueChanged="(payload) => (category.title = payload.inputValue)"
            />
          </form>
          <div class="container__error mb-4" v-if="errorMessage">
            <Error :errorMessage="errorMessage" />
          </div>
        </div>
      </main>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      category: {
        title: "",
      },
      titleValue: "",
      subTitleValue: "Détails de la catégorie",
      rightBtn: "",

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
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
            if (res.message && res.message.code == 11000) {
              this.errorMessage =
                "Une erreur s'est produite : cette nom de catégorie existe déjà.";
            } else {
              this.category = res.data;
              this.titleValue = this.category.title;
            }
          })
          .catch((err) => {
            this.errorMessage = "Une erreur venant du serveur s'est produite.";
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
      })
      .catch((err) => {
        this.errorMessage = "Une erreur venant du serveur s'est produite.";
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
    category() {
      return this.category;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>