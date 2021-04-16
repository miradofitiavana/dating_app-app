<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Nouvelle catégorie"
      :backFunc="backFunc"
      rightBtn="Enregistrer"
      :rightBtnFunc="rightBtnFunc"
      :showBack="true"
    />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
          <FormField
            class="no-margin"
            inputType="text"
            inputName="category"
            inputLabel="Nom de la catégorie"
            :inputModel="category.title"
            inputValidator="required"
            @valueChanged="(payload) => (category.title = payload.inputValue)"
          />
        </form>
        <!-- <div class="container__error mb-4" v-if="errorMessage"> -->
        <!-- <Error :errorMessage="errorMessage" /> -->
        <!-- </div> -->
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data: function () {
    return {
      category: {},

      errorMessage: "",

      loading: 0,
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
          this.backFunc();
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