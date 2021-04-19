<template>
  <div class="main-content flex-1 bg-transparent pb-0 order-1 md:order-2">
    <div class="content flex flex-wrap bg-indigo-100">
      <div class="p-0 md:pb-4 flex-1">
        <QuestionsNavTabs
          @currentActive="(payload) => (active = payload.data)"
          :active="active"
        />

        <QuestionsRepondre
          :question="question"
          @doRefetch="(payload) => answerQuestions()"
          v-if="show == 0"
        />
        <QuestionsMine
          :questions="myquestions"
          @updateQuestions="(payload) => getQuestions()"
          v-if="show == 1"
        />
        <QuestionsVote :question="votes" v-if="show == 2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth", "process"],

  methods: {
    answerQuestions() {
      this.$question_random()
        .then((res) => {
          this.question = res.data;
        })
        .catch((err) => console.log(err));
    },

    getQuestionsAVoter() {
      this.$question_to_vote()
        .then((res) => {
          this.votes = res.data;
        })
        .catch((err) => console.log(err));
    },

    getQuestions() {
      const token = this.$cookies.get("token");
      fetch(`${process.env.API_URL}/user-questions`, {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.myquestions = res.data;
        });
    },
  },

  data: function () {
    return {
      active: 1,
      show: 1,

      myquestions: [],
      votes: {},

      question: {},
    };
  },

  beforeMount() {
    this.getQuestions();
  },

  watch: {
    active: function (nouveau, ancien) {
      switch (nouveau) {
        case 0:
          this.answerQuestions();
          break;
        case 1:
          this.getQuestions();
          break;
        case 2:
          this.getQuestionsAVoter();
          break;
      }
      setTimeout(() => (this.show = nouveau), 200);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>