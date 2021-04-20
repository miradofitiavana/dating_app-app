<template>
  <div class="swip" v-if="current">
    <div class="swip__image">
      <img :src="`${URI}/${current.photo}`" class="rounded-borders" />
    </div>
    <div class="swip__container">
      <div class="swip__text">
        <h1 class="swip__text--name font-medium text-lg md:text-3xl">
          {{ dataSuggestion.firstname }},
          <span>
            {{
              $dateFns.differenceInYears(
                new Date(),
                new Date(dataSuggestion.birthday)
              )
            }}
            &nbsp;ans
          </span>
        </h1>
        <h2 class="swip__text--compatibility font-bold text-sm md:text-xl">
          Compatibilité&nbsp;:&nbsp;
          <span class="text-2xl">{{ dataSuggestion.compatibility }}%</span>
        </h2>
      </div>
      <div class="swip__footer">
        <div
          class="btn btn--decline"
          @click="$emit('event', { action: 'reject' })"
        >
          <fa icon="times" />
        </div>
        <div class="btn btn--like" @click="$emit('event', { action: 'match' })">
          <fa icon="heart" />
        </div>
      </div>
    </div>
  </div>
  <div class="swip" v-else></div>
</template>

<script>
export default {
  props: {
    current: Object,
  },

  data: function () {
    return {
      URI: process.env.API,
      dataSuggestion: this.current,
    };
  },

  watch: {
    current() {
      this.dataSuggestion = this.current;
    },
  },
};
</script>

<style lang="scss" scoped>
.swip {
  height: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);

  &__image {
    flex: 1 0 60%;
    position: relative;
    z-index: 97;

    @media (max-width: 767px) {
      flex: 1 0 100%;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;

      @media (max-width: 767px) {
        filter: brightness(0.6);
      }
    }
  }

  &__container {
    flex: 1 0 40%;
    position: relative;
    padding: 1rem;
    z-index: 99;

    @media (max-width: 767px) {
      flex: 1;
      position: absolute;
      left: 5px;
      right: 5px;
      bottom: 5px;
      padding: 20px;
      display: flex;
      flex-direction: row;
    }
  }

  &__text {
    &--name {
    }

    &--compatibility {
    }

    @media (max-width: 767px) {
      flex: 1;
      display: flex;
      align-items: flex-end;
      padding: 10px;
      flex-direction: column;
      justify-content: flex-end;

      h1,
      h2 {
        width: 100%;
        color: #ececec;
      }
    }
  }

  &__footer {
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
    left: 0;
    right: 0;
    color: #ececec;

    @media (max-width: 767px) {
      position: relative;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: flex-end;
    }
  }
}

.btn {
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 50%;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &--like {
    background: #e80000;
    &:hover {
      background: #9c0303;
    }
  }

  &--decline {
    background: #5a5a5a;
    &:hover {
      background: #252525;
    }
  }

  @media (max-width: 767px) {
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
}
</style>