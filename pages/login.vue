<template>
  <div class="lg:flex">
    <div class="lg:w-1/2 xl:max-w-screen-sm">
      <div
        class="py-6 lg:py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12"
      >
        <div class="cursor-pointer flex items-center">
          <div>
            <Logo class="w-16 lg:w-10" />
          </div>
          <div
            class="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
          >
            AskMe
          </div>
        </div>
      </div>
      <div
        class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
      >
        <Title
          class="text-4xl xl:text-5xl xl:text-bold"
          titleValue="Se connecter"
        />
        <div class="mt-12">
          <validation-observer
            v-slot="{ invalid }"
            ref="subscribe"
            tag="form"
            class="w-full max-w-lg"
            autocomplete="off"
            @submit.prevent="!invalid && submitForm()"
          >
            <div class="container__input">
              <FormField
                inputType="email"
                inputName="user_email"
                inputLabel="Votre email"
                :inputModel="user.email"
                inputValidator="required|email"
                @valueChanged="(payload) => (user.email = payload.inputValue)"
              />
              <FormField
                inputType="password"
                inputName="user_password"
                inputLabel="Votre mot de passe"
                :inputModel="user.password"
                inputValidator="required"
                @valueChanged="
                  (payload) => (user.password = payload.inputValue)
                "
              />
            </div>
            <div>
              <p class="text-sm mb-4">Mot de passe oublié ?</p>
              <Button class="btn-white btn-full" :btnFunc="doLogin">
                Se connecter
              </Button>
            </div>
            <div class="mt-4 font-semibold">
              <p class="text-sm">
                Vous n'avez pas encore de compte ?
                <NuxtLink class="underline" to="/signup"
                  >Inscrivez-vous</NuxtLink
                >
                gratuitement.
              </p>
            </div>
            <transition name="fade">
              <div class="container__error mb-4" v-if="errorMessage">
                <Error :errorMessage="errorMessage" />
              </div>
            </transition>
          </validation-observer>
        </div>
      </div>
    </div>
    <div
      class="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen"
    >
      <div
        class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"
      >
        <Logo class="w-11/12 mx-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  layout: "simple",
  middleware: "auth",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMessage: "",

      /**
       * action modal
       */
      showDialog: false,
    };
  },
  methods: {
    doLogin() {
      this.errorMessage = "";
      this.$login(this.user)
        .then((data) => {
          if (!data.auth) {
            this.errorMessage = data.display;
          } else {
            this.$cookies.set("token", data.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            this.$cookies.set(
              "user",
              JSON.stringify({
                firstname: data.user.firstname,
                isAdmin: data.user.isAdmin,
                photo: data.user.photo,
              }),
              {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
              }
            );
            this.$cookies.set("pre-use-answered", data.user.nbr_answered, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            this.$cookies.set("pre-use-photos", data.user.nbr_photos, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            this.$router.push("/");
          }
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.$cookies.removeAll();
    localStorage.clear();
  },
};
</script>

<style lang="scss" scoped>
.forgot-password {
  font-size: 12px;
  margin-bottom: 10px;
}
</style>