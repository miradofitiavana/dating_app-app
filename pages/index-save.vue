<template>
  <div class="main-content flex-1 bg-transparent pb-0 order-1 md:order-2">
    <div class="content flex flex-wrap bg-indigo-100">
      <div class="swip__container">
        <div class="swip__content">
          <div
            v-if="current"
            class="card__container"
            style="z-index: 3"
            :class="{ transition: isVisible }"
          >
            <Vue2InteractDraggable
              v-if="isVisible"
              :interact-out-of-sight-x-coordinate="500"
              :interact-max-rotation="15"
              :interact-x-threshold="200"
              :interact-y-threshold="200"
              :interact-event-bus-events="interactEventBus"
              interact-block-drag-down
              interact-block-drag-up
              @draggedRight="matched"
              @draggedLeft="rejected"
              class="rounded-borders card card--one"
            >
              <div style="height: 100%" class="card__content bg-white relative">
                <div class="image">
                  <img
                    :src="`${URI}/${current.photo}`"
                    class="rounded-borders"
                  />
                  <div class="swip__footer fixed">
                    <div class="btn btn--decline" @click="reject">
                      <fa icon="times" />
                    </div>
                    <div class="btn btn--like" @click="match">
                      <fa icon="heart" />
                    </div>
                  </div>
                </div>
                <div class="text">
                  <h1 class="text__name">
                    {{ current.firstname }},
                    <span
                      >{{
                        $dateFns.differenceInYears(
                          new Date(),
                          new Date(current.birthday)
                        )
                      }}&nbsp;ans</span
                    >
                  </h1>
                  <h2>
                    Compatibilité&nbsp;:&nbsp;
                    <span>{{ current.compatibility }}%</span>
                  </h2>
                </div>
              </div>
            </Vue2InteractDraggable>
          </div>
          <div
            v-if="next"
            class="rounded-borders card card__container card--two"
            style="z-index: 2"
          >
            <div style="height: 100%" class="card__content bg-white relative">
              <div class="image">
                <img :src="`${URI}/${next.photo}`" class="rounded-borders" />
              </div>
              <div class="text">
                <h1 class="text__name">
                  {{ next.firstname }},
                  <span>
                    {{
                      $dateFns.differenceInYears(
                        new Date(),
                        new Date(next.birthday)
                      )
                    }}&nbsp;ans
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div
            v-if="index + 2 < suggestions.length"
            class="rounded-borders card card__container card--three"
            style="z-index: 1"
          >
            <div style="height: 100%" class="card__content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue2InteractDraggable, InteractEventBus } from "vue2-interact";

const EVENTS = {
  MATCH: "match",
  REJECT: "reject",
};

export default {
  middleware: ["auth", "process"],

  components: {
    Vue2InteractDraggable,
  },

  methods: {
    matched() {
      this.$match(this.current._id).then((res) => {
        setTimeout(() => (this.isVisible = false), 200);
        setTimeout(() => {
          this.index++;
          this.isVisible = true;
        }, 200);
      });
    },
    rejected() {
      this.$rejected(this.current._id).then((res) => {
        setTimeout(() => (this.isVisible = false), 200);
        setTimeout(() => {
          this.index++;
          this.isVisible = true;
        }, 200);
      });
    },

    match() {
      InteractEventBus.$emit(EVENTS.MATCH);
    },
    reject() {
      InteractEventBus.$emit(EVENTS.REJECT);
    },
  },

  data: function () {
    return {
      URI: process.env.API,

      suggestions: [],

      isVisible: true,
      index: 0,
      interactEventBus: {
        draggedRight: EVENTS.MATCH,
        draggedLeft: EVENTS.REJECT,
      },
    };
  },

  mounted() {
    const token = this.$cookies.get("token");
    fetch(`${process.env.API_URL}/user-suggestions`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.suggestions = res.data;
      });
  },

  computed: {
    current() {
      return this.suggestions[this.index];
    },
    next() {
      return this.suggestions[this.index + 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.swip__container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: auto;
  align-content: stretch;
  /* padding: 40px; */

  position: relative;
  > div {
    width: 100%;
    position: relative;
  }

  .swip__content {
    flex: 1 1 auto;
  }

  .swip__footer {
    flex: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: auto;
    align-content: flex-start;
    padding-bottom: 10px;
    font-size: 30px;
    padding-top: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
.btn {
  flex: 0 0 auto;
  margin: 10px 25px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  svg {
    font-size: 32px;
  }

  &--decline {
    background: #3a3a3a;
  }
  &--skip {
    background: #0a0a56;
  }
  &--like {
    background: #d00404;
  }
}

.card {
  color: white;
  max-width: 80vw;
  margin-left: auto;
  margin-right: auto;
  height: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  &__container {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    height: 100%;
  }

  &--one {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
  &--two {
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
    filter: blur(4px);
  }
  &--three {
    background: rgba(black, 0.8);
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
    filter: blur(4px);
  }

  @media (min-width: 768px) {
    /* width: 400px; */
    /* height: 660px; */
  }

  &__content {
    border-radius: 8px;
    display: flex;

    .image {
      position: relative;
      max-height: 100%;
      height: 100%;
      flex: 1;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),
        0 4px 6px -2px rgb(0 0 0 / 5%);
    }

    .text {
      flex: 0 0 40%;
      color: #414141;
      cursor: auto;
      padding: 32px 32px 0;

      &__name {
        font-size: 24px;
      }
      h2 {
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}

.transition {
  animation: appear 200ms ease-in;
}

@keyframes appear {
  from {
    transform: translate(-48%, -48%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  /* object-position: right; */
}
</style>

<style lang="scss" scoped>
.from-custom {
  --gradient-from-color: #3b1d3f;
}

.main-content {
  display: flex;
  flex-direction: column;

  .header {
    flex: 0;
  }

  .content {
    flex: 1;
    border-radius: 0px 8px 8px 0px;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 14%);
  }
}
</style>