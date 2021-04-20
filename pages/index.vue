<template>
  <div class="main-content flex-1 bg-transparent pb-0 order-1 md:order-2">
    <div class="content flex flex-wrap bg-indigo-100">
      <div class="swip__container">
        <div v-if="current" class="card__container">
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
            class="card__item card__item--one"
          >
            <Card
              :current="current"
              @event="
                (payload) => (payload.action == 'reject' ? reject() : match())
              "
            />
          </Vue2InteractDraggable>
        </div>
        <div v-if="next" class="card__item card__item--two">
          <Card :current="next" />
        </div>
        <div
          v-if="index + 2 < suggestions.length"
          class="card__item card__item--three"
        >
          <Card :current="null" />
        </div>
        <div
          class="flex flex-1 justify-center"
          v-if="suggestions.length == 0 || suggestions == null"
        >
          <div
            class="text-center question__empty w-full h-full flex justify-center items-center font-semibold text-lg md:text-xl"
          >
            <div class="question__none">
              <p>Il semblerait qu'il n'y ait plus de profils à te suggerer...</p>
              <p>Reviens plus tard ou continue à répondre à d'autres questions.</p>
            </div>
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
      this.$reject(this.current._id).then((res) => {
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
    this.$suggestions().then((res) => {
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
  position: relative;
  background: #fff;

  @media (min-width: 768px) {
    border-radius: 8px;
  }
}

.card__container {
  position: relative;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  height: 100%;
}

.card__item {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  height: 100%;
  background-color: #fff;

  @media (max-width: 767px) {
    padding: 20px;
  }

  &--one {
    z-index: 3;
  }

  &--two {
    z-index: 2;
    filter: blur(8px);
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
  }

  &--three {
    z-index: 1;
    filter: blur(8px);
    /* background: rgba(black, 0.8); */
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
  }
}
</style>