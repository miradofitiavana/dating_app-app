<template>
  <div class="questions overflow-x-hidden overflow-y-auto">
    <div class="px-3 md:px-8 h-full flex flex-col" v-if="!showForm">
      <template>
        <Button
          class="mt-10 ml-auto mr-auto btn-black btn-full btn-h-80 btn-no-mt"
          :btnFunc="() => open()"
          >Créer une question</Button
        >

        <div v-if="questions.length == 0" class="questions__empty">
          <div class="questions__none">
            <p>Aucune question créée.</p>
          </div>
        </div>
        <div v-else class="questions__container">
          <div class="questions__list">
            <div
              class="questions__item"
              v-for="item in questions"
              :key="item._id"
            >
              <div class="item__content">
                <div class="item__content--left">
                  <div class="question">
                    <p>{{ item.question }}</p>
                  </div>
                  <div
                    class="action"
                    v-if="item.like.length == 0 && item.like.length == 0"
                  >
                    <button>
                      <fa icon="times" />
                    </button>
                  </div>
                </div>
                <div class="item__content--right">
                  <div class="note">
                    <!-- si pas encore voté -->
                    <template
                      v-if="item.like.length == 0 && item.like.length == 0"
                    >
                      <Badge>En attente de validation</Badge>
                    </template>
                    <!-- si voté -->
                    <template v-else> aa </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <form
      class="shadow-md bg-white p-3 md:p-8"
      @submit.prevent="rightBtnFunc"
      v-else
    >
      <FormField
        class="form-v2"
        inputType="text"
        inputName="question"
        inputLabel="Question"
        :inputModel="question.question"
        inputValidator="required"
        @valueChanged="(payload) => (question.question = payload.inputValue)"
      />
      <FormField
        class="mb-2 form-v2"
        inputType="multiselect"
        inputName="categories"
        :inputModel="question.categories"
        inputValidator="required"
        @valueChanged="(payload) => (question.categories = payload.inputValue)"
        inputLabel="Catégories du produit"
        :isMulti="true"
        :multiCustomLabel="multiCustomLabel"
        :multiOptions="categories"
        multiTrackBy="_id"
      />
      <FormField
        class="form-v2"
        inputType="text"
        inputName="option1"
        inputLabel="Option 1"
        :inputModel="question.option1"
        inputValidator="required"
        @valueChanged="(payload) => (question.option1 = payload.inputValue)"
      />
      <FormField
        class="form-v2"
        inputType="text"
        inputName="option2"
        inputLabel="Option 2"
        :inputModel="question.option2"
        inputValidator="required"
        @valueChanged="(payload) => (question.option2 = payload.inputValue)"
      />
      <Button class="btn-black" :btnFunc="rightBtnFunc">Enregistrer</Button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
    },
  },
  data() {
    return {
      categories: [],

      showForm: false,
      question: {},
    };
  },

  methods: {
    open() {
      this.$get_categories()
        .then((res) => {
          this.categories = res.data;
          this.showForm = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    multiCustomLabel(option) {
      return `${option.title}`;
    },

    rightBtnFunc() {
      const token = this.$cookies.get("token");
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

      fetch(`${process.env.API_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(inputQuestion),
      })
        .then((res) => res.json())
        .then((res) => {
          this.showForm = false;
          this.$emit("updateQuestions", { data: true });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.questions {
  display: flex;
  flex-direction: column;
  &__empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__none {
    p {
      text-align: center;
      font-size: 20px;
      margin-bottom: 25px;
      font-weight: 600;
    }
  }

  //

  &__container {
  }

  &__list {
  }

  &__item {
    min-height: 100px;
    min-width: 200px;
    padding: 10px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    background: rgba(204, 204, 204, 0.41961);
    border-radius: $border-radius;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: auto;
    align-content: stretch;
  }

  .item {
    &__content {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;

      &--left {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .question {
          flex: 1;
        }

        .action {
          flex: 0;
        }
      }

      &--right {
        flex: 0;

        .note {
        }
      }
    }
  }
}
</style>