<template>
  <div class="vote sm:p-5">
    <template v-if="dataQuestion">
      <div class="vote__categories">
        <Badge>Personnalité</Badge>
        <Badge>Séduction</Badge>
      </div>
      <div class="vote__question">
        <h2>{{ dataQuestion.question }}</h2>
      </div>
      <div class="vote__auteur">
        <p class="vote__auteur--auteur">
          Créée par
          <span class="vote__auteur--name">
            {{ dataQuestion.author.firstname }}
          </span>
        </p>
        <img
          :src="`${URI}/${dataQuestion.author.photo[0]}`"
          class="vote__auteur--image"
        />
      </div>
      <div class="vote__reponses">
        <div class="vote__reponses__item vote__reponses__item--1">
          <p>{{ dataQuestion.option1.answer }}</p>
        </div>
        <div class="vote__reponses__item vote__reponses__item--2">
          <p>{{ dataQuestion.option2.answer }}</p>
        </div>
      </div>
      <div class="vote__container">
        <Button
          :btnFunc="() => vote('D')"
          class="btn-black btn-h-auto btn-w-auto vote__container__item vote__container__item--dislike"
        >
          <fa icon="thumbs-down" />
          <span class="ml-3">{{ dataQuestion.dislike.length }}</span>
        </Button>
        <Button
          :btnFunc="() => vote('L')"
          class="btn-black btn-h-auto btn-w-auto vote__container__item vote__container__item--like"
        >
          <span class="mr-3">{{ dataQuestion.dislike.length }}</span>
          <fa icon="thumbs-up" />
        </Button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      URI: process.env.API,
      dataQuestion: this.question,
    };
  },

  props: {
    question: Object,
  },

  methods: {
    vote(value) {
      let data = {
        question: this.question._id,
        vote: value,
      };
      this.$vote(data)
        .then((v) => {
          this.dataQuestion = v.data;
        })
        .catch((ev) => console.log(ev));
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
.vote {
  &__categories {
    margin-bottom: 10px;
  }

  &__question {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }

  &__auteur {
    text-align: right;
    font-size: 14px;
    font-style: italic;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    &--auteur {
      padding-right: 10px;
    }

    &--name {
      font-weight: 500;
    }

    &--image {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__reponses {
    margin-top: 10px;
    margin-bottom: 10px;
    background: #cccccc6b;
    border-radius: $border-radius;

    &__item {
      min-height: 100px;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
      font-weight: 600;

      &--1 {
        border-bottom: 2px solid #d3156a;
      }
    }
  }

  &__container {
    display: flex;
    justify-content: space-around;

    &__item {
      flex: 1;
      text-align: center;
      padding: 15px 10px;
      border: 1px solid #414141;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        font-size: 40px;
      }

      &--dislike {
        margin-right: 5px;
      }

      &--like {
        margin-left: 5px;
      }
    }
  }
}
</style>