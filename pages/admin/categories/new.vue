<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <validation-observer v-slot="{ invalid }" slim>
      <BackSubHeader
        titleValue="Nouvelle catégorie"
        :backFunc="backFunc"
        rightBtn="Enregistrer"
        :rightBtnFunc="rightBtnFunc"
        :disableButton="invalid"
        :showBack="true"
      />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <form
            class="shadow-md bg-white p-8"
            @submit.prevent="!invalid && rightBtnFunc"
          >
            <FormField
              class="no-margin form-v2"
              inputType="text"
              inputName="category"
              inputLabel="Nom de la catégorie"
              :inputModel="category.title"
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
      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/categories`);
    },

    rightBtnFunc() {
      fetch(`${process.env.API_URL}/categories`, {
        method: "POST",
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
            this.backFunc();
          }
        })
        .catch((err) => {
          this.errorMessage = "Une erreur venant du serveur s'est produite.";
        });
    },
  },
};
</script>