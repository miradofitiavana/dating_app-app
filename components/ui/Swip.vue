<template>
  <div class="swip">
    <div class="swip__photo">
      <div class="swip__photo--image">
        <img
          :src="`${URI}/${suggestion.photo ? suggestion.photo[0] : ''}`"
          class="rounded-borders"
        />
      </div>
    </div>
    <div class="swip__info">
      <div class="swip__info--content">
        <h1 class="text-lg font-medium text-3xl">
          {{ suggestion.firstname }},
          <span>
            {{
              $dateFns.differenceInYears(
                new Date(),
                new Date(suggestion.birthday)
              )
            }}
            &nbsp;ans
          </span>
        </h1>
      </div>

      <div class="swip__info--footer">
        <div class="btn btn--decline" @click="reject">
          <fa icon="times" />
        </div>
        <div class="btn btn--like" @click="match">
          <fa icon="heart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    suggestion: Object,
  },

  data: function () {
    return {
      URI: process.env.API,
    };
  },
};
</script>

<style lang="scss" scoped>
.swip {
  flex-direction: row !important;
  width: 100%;
  height: 100%;

  &__photo {
    flex: 1 0 60%;

    &--image {
      height: 100%;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
    }
  }

  &__info {
    position: relative;
    flex: 1 0 40%;
    padding: 1rem;

    &--content {
    }

    &--footer {
      align-items: center;
      align-self: center;
      justify-content: center;
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;

      .btn {
        flex: 0 0 auto;
        margin: 10px 25px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 90px;
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
    }
  }
}
</style>