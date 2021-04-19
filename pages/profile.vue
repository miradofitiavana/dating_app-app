<template>
  <div class="main-content flex-1 bg-transparent pb-0 order-1 md:order-2">
    <div class="content flex flex-wrap">
      <div class="p-4 flex-1">
        <section class="p-4">
          <div class="flex flex-wrap -mx-4">
            <div class="hidden md:block md:w-1/2 px-4">
              <div
                class="h-full w-full bg-cover rounded shadow-md"
                style="
                  background-image: url('https://source.unsplash.com/random/1280x720');
                "
              ></div>
            </div>
            <div class="md:w-1/2 h-auto px-4">
              <div class="mb-8">
                <img
                  class="rounded shadow-md"
                  src="https://source.unsplash.com/random/1280x720"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="rounded shadow-md"
                  src="https://source.unsplash.com/random/1280x720"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import fr from "date-fns/locale/fr";
export default {
  middleware: ["auth", "process"],

  methods: {},

  data: function () {
    return {
      data: {},
    };
  },

  beforeMount() {
    const token = this.$cookies.get("token");
    fetch(`${process.env.API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 14%);
    height: 100%;
    color: #414141;
  }
}
</style>