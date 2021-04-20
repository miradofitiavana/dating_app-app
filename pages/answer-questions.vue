<template>
  <div class="flex-1 bg-transparent md:mt-2 md:pb-0 shadow-lg">
    <div class="content flex flex-wrap bg-indigo-100 h-full">
      <div class="lg:mb-10">
        <Logo class="lg:w-40 w-20" />
      </div>
      <div class="p-5" v-if="!showQuestions">
        <Title class="mb-6" titleValue="Presque..." />
        <p>
          Réponds à {{ 5 - resteQuestions }} questions pour qu'on puisse
          apprendre à te connaitre et te proposer des profils qui te
          correspondent.
        </p>
        <p>Tu peux passer si tu ne sais pas quoi répondre.</p>
        <Button class="btn-black mt-10" :btnFunc="() => answerQuestions()"
          >D'accord</Button
        >
      </div>
      <div class="pl-4 lg:pl-10 pr-4 lg:pr-10 pb-4 lg:pb-8" v-else>
        <template v-if="question != null">
          <Question :question="question" @answerChosen="chooseAnswer" />
        </template>
        <template v-else>
          <p class="text-center font-medium">
            Il semblerait qu'il n'y ait plus de questions disponibles...
          </p>
          <p class="text-center font-medium">Reviens plus tard.</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "no-sidebar",

  components: {},

  data() {
    return {
      question: {
        question: "Rouge ou noir?",
        option1: {
          answer: "Rouge",
        },
        option2: {
          answer: "Noir",
        },
      },
      showQuestions: false,
    };
  },

  methods: {
    chooseAnswer(payload) {
      const token = this.$cookies.get("token");
      fetch(`${process.env.API_URL}/question-update`, {
        method: "PUT",
        headers: {
          "Content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          answerChosen: payload.answerChosen,
          question: this.question._id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          let nbr = this.$store.state.auth.nbr_answered + 1;
          this.$store.commit("auth/setNbrAnswered", nbr);
          this.$cookies.set("pre-use-answered", nbr, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
          console.log(nbr);
          if (nbr < 5) {
            this.answerQuestions();
          } else {
            this.$router.push("/");
          }
        });
    },

    answerQuestions() {
      const token = this.$cookies.get("token");
      console.log();
      if (token == null) {
        this.$router.push("/login");
      }
      this.$question_random().then((res) => {
        this.showQuestions = true;
        this.question = res.data;
      });
    },

    nextStep(value) {
      //   this.steps = this.steps - 1;
      //   console.log(this.resteQuestions);
      //   this.$store.commit("auth/addNbrAnswered");
    },
  },

  mounted() {
    const token = this.$cookies.get("token");
    fetch(`${process.env.API_URL}/questions-count`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.$cookies.set("pre-use-answered", res.nombre, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        this.$store.commit("auth/setNbrAnswered", res.nombre);
      });
  },

  computed: {
    resteQuestions() {
      return this.$store.state.auth.nbr_answered;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: #000;
}

.content {
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
</style>