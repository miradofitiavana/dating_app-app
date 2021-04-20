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
        class="mt-6 px-6 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
        :class="gender === 999 ? '' : 'mb-10 lg:mb-auto'"
      >
        <Title
          class="text-2xl xl:text-3xl xl:text-bold"
          titleValue="Inscris-toi en répondant à quelques questions"
        />
        <div
          class="mt-6 lg:mt-12"
          :class="gender === 999 ? '' : 'hidden lg:flex'"
        >
          <div class="step__one w-full">
            <p class="text-center text-xl">tu es...</p>
            <Button
              class="btn-block btn-full mt-4"
              :btnFunc="() => setGender(1)"
              :class="gender == 1 ? 'btn-selected' : ''"
              >un homme</Button
            >
            <Button
              class="btn-block btn-full mt-4"
              :btnFunc="() => setGender(-1)"
              :class="gender == -1 ? 'btn-selected' : ''"
              >une femme</Button
            >
            <Button
              class="btn-block btn-full mt-4"
              :btnFunc="() => setGender(0)"
              :class="gender == 0 ? 'btn-selected' : ''"
              >autres identités</Button
            >
          </div>
        </div>
        <div class="mt-4 font-semibold">
          <p class="text-sm">
            Tu as déjà un compte ?
            <NuxtLink class="underline" to="/login">Connecte-toi</NuxtLink>
            directement.
          </p>
        </div>
      </div>
    </div>
    <div
      class="lg:flex items-center justify-center bg-indigo-100 flex-1 lg:h-screen"
      :class="gender === 999 ? 'hidden' : 'flex'"
    >
      <div
        v-if="gender == 999"
        class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"
      >
        <Logo class="w-11/12 mx-auto" />
      </div>
      <div class="container signup__form mt-2 mb-2 lg:mt-0 lg:mb-0" v-else>
        <Title
          class="text-center text-2xl xl:text-3xl xl:text-bold mb-3"
          titleValue="Presque..."
        />

        <validation-observer
          v-slot="{ invalid }"
          ref="subscribe"
          tag="form"
          class="ml-auto mr-auto w-full max-w-lg pr-4 pl-4 md:pr-0 md:pl-0"
          autocomplete="off"
          @submit.prevent="!invalid && submitForm()"
        >
          <div class="container__input">
            <FormField
              inputType="text"
              inputName="user_firstname"
              inputLabel="Prénom"
              :inputModel="user.firstname"
              inputValidator="required"
              @valueChanged="(payload) => (user.firstname = payload.inputValue)"
              class="error-black"
            />

            <FormField
              inputType="date"
              inputName="user_birthday"
              inputLabel="Date de naissance"
              :inputModel="user.birthday"
              inputValidator="required"
              @valueChanged="(payload) => (user.birthday = payload.inputValue)"
              class="error-black"
            />

            <FormField
              inputType="text"
              inputName="user_location"
              inputLabel="Saisis ton emplacement"
              :inputModel="user.location"
              inputValidator="required"
              @valueChanged="(payload) => (user.location = payload.inputValue)"
              class="error-black"
            />

            <FormField
              inputType="email"
              inputName="user_email"
              inputLabel="Votre email"
              :inputModel="user.email"
              inputValidator="required|email"
              @valueChanged="(payload) => (user.email = payload.inputValue)"
              class="error-black"
            />

            <FormField
              inputType="password"
              inputName="user_password"
              inputLabel="Votre mot de passe"
              :inputModel="user.password"
              inputValidator="required"
              @valueChanged="(payload) => (user.password = payload.inputValue)"
              class="error-black"
            />
          </div>
          <div>
            <Button class="btn-black btn-full" :btnFunc="doSignup">
              S'inscrire
            </Button>
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
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  layout: "simple",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      gender: 999,
      user: {
        // location: "Paris",
        // password: "Rmira00.",
        // firstname: "Mirado",
        // birthday: "1998-07-06",
        // email: "miradofitiavana@gmail.com",
        location: "",
        password: "",
        firstname: "",
        birthday: "",
        email: "",
        isAdmin: 0,
      },
      errorMessage: "",
    };
  },
  methods: {
    setGender(value) {
      console.log(value);
      this.gender = value;
    },

    doSignup() {
      this.user.gender = this.gender;
      console.log(this.user);
      this.$register(this.user)
        .then((data) => {
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
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  &__form {
    color: #414141;
  }
}
</style>