<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Nouvelle question"
      :backFunc="backFunc"
      rightBtn="Enregistrer"
      :rightBtnFunc="rightBtnFunc"
      :showBack="true"
    />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
          <FormField
            inputType="text"
            inputName="question"
            inputLabel="Question"
            :inputModel="question.question"
            inputValidator="required"
            @valueChanged="
              (payload) => (question.question = payload.inputValue)
            "
          />
          <FormField
            class="mb-2"
            inputType="multiselect"
            inputName="categories"
            :inputModel="question.categories"
            inputValidator="required"
            @valueChanged="
              (payload) => (question.categories = payload.inputValue)
            "
            inputLabel="Catégories du produit"
            :isMulti="true"
            :multiCustomLabel="multiCustomLabel"
            :multiOptions="categories"
            multiTrackBy="_id"
          />
          <FormField
            inputType="text"
            inputName="option1"
            inputLabel="Option 1"
            :inputModel="question.option1"
            inputValidator="required"
            @valueChanged="(payload) => (question.option1 = payload.inputValue)"
          />
          <FormField
            inputType="text"
            inputName="option2"
            inputLabel="Option 2"
            :inputModel="question.option2"
            inputValidator="required"
            @valueChanged="(payload) => (question.option2 = payload.inputValue)"
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
      categories: [],
      question: {
        question: "",
        categories: null,
        option1: "",
        option2: "",
      },

      errorMessage: "",

      loading: 0,
    };
  },

  methods: {
    multiCustomLabel(option) {
      return `${option.title}`;
    },

    backFunc() {
      this.$router.push(`/admin/questions`);
    },

    rightBtnFunc() {
      const token = this.$cookies.get("token");
      console.log();
      if (token == null) {
        this.$router.push("/login");
      }
      const tokenDecode = this.$decodeJwt(token);
      const id = tokenDecode.id;
      let inputQuestion = {
        question: this.question.question,
        categories: this.question.categories.map((a) => a._id),
        option1: {
          answer: this.question.option1,
          users: [],
        },
        option2: {
          answer: this.question.option2,
          users: [],
        },
        author: id,
      };
      console.log(inputQuestion);
      fetch(`${process.env.API_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(inputQuestion),
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

  beforeMount() {
    this.$get_categories()
      .then((res) => {
        this.categories = res.data;
        console.log(this.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>