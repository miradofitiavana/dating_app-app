<template>
  <div class="main-content flex-1 bg-transparent pb-24 md:pb-0">
    <div class="content flex flex-wrap bg-indigo-100">
      <div class="p-4 flex-1">
        <QuestionsNavTabs
          class="mb-4"
          @currentActive="(payload) => (active = payload.data)"
          :active="active"
        />

        <QuestionsRepondre v-if="show == 0" />
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
    getQuestionsAVoter() {
      this.$question_to_vote()
        .then((res) => {
          this.votes = res.data;
        })
        .catch((err) => console.log(err));
    },

    rightBtnFunc() {
      console.log(this.question);
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

      question: {},
      categories: [],
      myquestions: [],
      votes: {},
    };
  },

  beforeMount() {
    this.getQuestions();
  },

  computed: {},

  watch: {
    active: function (nouveau, ancien) {
      switch (nouveau) {
        case 0:
          break;
        case 1:
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
.main-content {
  display: flex;
  flex-direction: column;
  /* padding-bottom: 64px; */

  .content {
    flex: 1;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 14%);
    height: 100%;
    color: #414141;

    > div {
      display: flex;
      flex-direction: column;
    }

    nav {
      flex: 0;
    }

    .questions,
    .votes {
      flex: 1;
    }
  }
}
</style>