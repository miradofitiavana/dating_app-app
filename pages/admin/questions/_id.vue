<template>
  <div>
    <BackSubHeader
      :titleValue="titleValue"
      subTitleValue="Détails de la question"
      :backFunc="backFunc"
      :rightBtn="rightBtn"
      :rightBtnFunc="rightBtnFunc"
      :showBack="true"
    />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
          <div class="details">
            <ul>
              <li>
                <span>Auteur</span>&nbsp;:&nbsp;
                <span> {{ question.author.firstname }}</span>
              </li>
              <li>
                <span>Date de création</span>&nbsp;:&nbsp;
                <span> {{ $getFrenchDate(question.createdAt, true) }}</span>
              </li>
              <li>
                <span>Dernière modification</span>&nbsp;:&nbsp;
                <span> {{ $getFrenchDate(question.updatedAt, true) }}</span>
              </li>
            </ul>
          </div>
          <FormField
            class="form-v2"
            inputType="text"
            inputName="question"
            inputLabel="Question"
            :inputModel="question.question"
            :disableField="areFieldsDisabled"
            @valueChanged="
              (payload) => (question.question = payload.inputValue)
            "
          />
          <FormField
            class="mb-2 form-v2"
            inputType="multiselect"
            inputName="categories"
            :inputModel="question.categories"
            inputValidator="required"
            @valueChanged="
              (payload) => (question.categories = payload.inputValue)
            "
            inputLabel="Catégories"
            :isMulti="true"
            :multiCustomLabel="(option) => `${option.title}`"
            :multiOptions="categories"
            :disableField="areFieldsDisabled"
            multiTrackBy="_id"
          />

          <FormField
            class="form-v2"
            inputType="text"
            inputName="option1"
            inputLabel="Réponse 1"
            :inputModel="question.option1.answer"
            :disableField="areFieldsDisabled"
            @valueChanged="
              (payload) => (question.option1.answer = payload.inputValue)
            "
          />
          <FormField
            class="form-v2"
            inputType="text"
            inputName="option2"
            inputLabel="Réponse 2"
            :inputModel="question.option2.answer"
            :disableField="areFieldsDisabled"
            @valueChanged="
              (payload) => (question.option2.answer = payload.inputValue)
            "
          />
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: "admin",

  middleware: ["auth"],

  data: function () {
    return {
      categories: [],
      question: {
        question: "",
        categories: null,
        option1: {
          answer: "",
        },
        option2: {
          answer: "",
        },
        createdAt: null,
        updatedAt: null,
        author: {
          firstname: "",
        },
      },
      titleValue: "",
      rightBtn: "",

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/questions`);
    },

    rightBtnFunc() {
      if (this.areFieldsDisabled) {
        this.$store.commit("form/enableFields");
        this.rightBtn = "Enregistrer";
      } else {
        this.$store.commit("form/disableFields");
        this.rightBtn = "Modifier";
        fetch(`${process.env.API_URL}/question/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(this.question),
        })
          .then((res) => res.json())
          .then((res) => {
            this.question = res.data;
            this.titleValue = this.question.question;
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
    fetch(`${process.env.API_URL}/question/${this.$route.params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.question = res.data;
        this.titleValue = this.question.question;
        // console.log(this.question.title);
      })
      .catch((err) => {
        console.log(err);
      });

    this.$get_categories()
      .then((res) => {
        this.categories = res.data;
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
};
</script>

<style lang="scss" scoped>
.details {
  margin-bottom: 20px;
  ul {
    li {
      color: #424242;

      span {
        &:first-child {
          font-weight: 700;
        }
      }
    }
  }
}
</style>