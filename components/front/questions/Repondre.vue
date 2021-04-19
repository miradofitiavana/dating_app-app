<template>
  <div class="answer flex-1 px-3 md:px-8 overflow-x-hidden overflow-y-auto">
    <template v-if="dataQuestion">
      <Question :question="question" @answerChosen="chooseAnswer" />
    </template>

    <template v-else>
      <div class="answer__empty">
        <div class="answer__none">
          <p>Il semblerait qu'il n'y ait plus de question disponible...</p>
          <p>Reviens plus tard pour répondre à d'autres questions.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
  },

  data() {
    return {
      dataQuestion: this.question,
    };
  },

  methods: {
    refetchQuestion() {
      this.$emit("doRefetch", { value: true });
    },

    chooseAnswer(payload) {
      const token = this.$cookies.get("token");
      this.$question_answer(payload.answerChosen, this.question._id).then(
        (res) => {
          this.refetchQuestion();
        }
      );
    },
  },

  watch: {
    question() {
      this.dataQuestion = this.question;
    },
  },
};
</script>

<style lang="scss" scoped>
.answer {
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
      font-weight: 600;
    }
  }
}
</style>