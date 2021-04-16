<template>
  <div class="question">
    <div class="question__container">
      <p>{{ question.question }}</p>
    </div>
    <div class="answer__container">
      <label>
        <input
          type="radio"
          name="radio"
          @change="
            $emit('answerChosen', {
              answerChosen: 1,
            })
          "
        />
        <div class="front-end box">
          <span>
            <fa icon="check" />
            {{ question.option1.answer }}
          </span>
        </div>
      </label>

      <label>
        <input
          type="radio"
          name="radio"
          @change="
            $emit('answerChosen', {
              answerChosen: -1,
            })
          "
        />
        <div class="back-end box">
          <span>
            <fa icon="times" />
            {{ question.option2.answer }}
          </span>
        </div>
      </label>
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
}
</style>