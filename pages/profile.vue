<template>
  <div class="main-content flex-1 bg-transparent pb-0 order-1 md:order-2">
    <div class="content flex flex-wrap bg-indigo-100">
      <div class="p-0 md:pb-4 flex-1">
        <AboutNavTabs
          @currentActive="(payload) => (active = payload.data)"
          :active="active"
        />

        <AboutMe :user="user" v-if="show == 1" />
        <AboutPreferences :preferences="preferences" v-if="show == 2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth", "process"],

  methods: {
    getUser() {
      const token = this.$cookies.get("token");
      const decoded = this.$decodeJwt(token);
      this.$getMe(decoded.id, token).then((res) => {
        this.user = res.data;
        this.user.birthday = this.user.birthday.slice(0, 10);
        this.preferences = {
          ageFrom: res.data.ageFrom,
          ageTo: res.data.ageTo,
          showMe: res.data.showMe,
        };
      });
    },
  },

  data: function () {
    return {
      active: 1,
      show: 1,

      user: {},
      preferences: {},
      handlesValue: [],
    };
  },

  beforeMount() {
    this.getUser();
  },

  watch: {
    active: function (nouveau, ancien) {
      switch (nouveau) {
        case 1:
          this.getUser();
          break;
        case 2:
          this.getUser();
          break;
      }

      setTimeout(() => (this.show = nouveau), 200);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>