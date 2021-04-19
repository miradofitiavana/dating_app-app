<template>
  <div class="question">
    <div class="question__container">
      <div class="question__categories py-3 md:py-8">
        <Badge v-for="category in question.categories" :key="category._id">
          {{ category.title }}
        </Badge>
      </div>
      <div class="question__question">
        <p class="text-lg md:text-3xl">{{ question.question }}</p>
      </div>
    </div>
    <div class="answer__container">
      <div class="vote__reponses">
        <button
          @click="() => $emit('answerChosen', { answerChosen: 1 })"
          class="vote__reponses__item vote__reponses__item--1 text-base md:text-xl p-3 md:py-8 md:px-6"
        >
          {{ question.option1.answer }}
        </button>
        <button
          @click="() => $emit('answerChosen', { answerChosen: -1 })"
          class="vote__reponses__item vote__reponses__item--2 text-base md:text-xl p-3 md:py-8 md:px-6"
        >
          {{ question.option2.answer }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.question {
  &__container {
    /* padding-top: 10px;
    padding-bottom: 10px; */

    p {
      font-weight: 700;
    }
  }

  &__categories {
  }

  &__question {
  }
}

.vote {
  &__reponses {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;

    &__item {
      background-color: #cccccc6b;
      min-height: 100px;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
      font-weight: 600;
      flex: 1;
      transition: all 0.3s;
      color: #424242;
      outline: none;

      &:active {
        background-color: #d3156a;
        color: #fff;
      }

      &--1 {
        @media (max-width: 1023.9px) {
          border-top-left-radius: $border-radius;
          border-top-right-radius: $border-radius;
          border-bottom: 2px solid #d3156a;
        }

        @media (min-width: 1024px) {
          border-top-left-radius: $border-radius;
          border-bottom-left-radius: $border-radius;
          border-right: 2px solid #d3156a;
        }
      }

      &--2 {
        @media (max-width: 1023.9px) {
          border-bottom-left-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
          border-top: 2px solid #d3156a;
        }

        @media (min-width: 1024px) {
          border-top-right-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
          border-left: 2px solid #d3156a;
        }
      }
    }
  }
}
/* .question {
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

  &__container {
    p {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
    }
  }
}

.answer {
  &__container {
    text-align: center;
    padding-top: 30px;
  }
}

input[type="radio"] {
  display: none;
  &:checked {
    + .box {
      background: -webkit-linear-gradient(145deg, #3b1d3f 0%, #d3156a 100%);
      span {
        color: white;
        transform: translateY(70px);
        &:before {
          transform: translateY(0px);
          opacity: 1;
        }
      }
    }
  }
}
.box {
  width: 200px;
  min-height: 200px;
  background: #fff;
  transition: all 250ms ease;
  will-change: transition;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-weight: 900;
  &:active {
    transform: translateY(10px);
  }
  span {
    position: absolute;
    transform: translate(0, 60px);
    left: 0;
    right: 0;
    transition: all 300ms ease;
    font-size: 1.5em;
    user-select: none;
    color: #3b1d3f;
    &:before {
      font-size: 1.2em;
      font-family: FontAwesome;
      display: block;
      transform: translateY(-80px);
      opacity: 0;
      transition: all 300ms ease-in-out;
      font-weight: normal;
      color: white;
    }

    svg {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      font-size: 26px;
    }
  }
} */
</style>