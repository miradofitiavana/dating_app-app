<template>
  <div class="me flex-1 px-3 md:px-8 overflow-x-hidden overflow-y-auto">
    <div
      class="me__content max-w-screen-sm ml-auto mr-auto"
      v-if="dataUser.firstname"
    >
      <div class="text-center pb-5">
        <h1 class="text-lg font-semibold md:text-3xl">
          Bienvenue sur ton profil
        </h1>
      </div>
      <div class="text-center me__images">
        <img
          class="ml-auto mr-auto"
          :src="`${URI}/${dataUser.photo[0]}`"
          alt=""
        />
      </div>
      <div>
        <validation-observer
          v-slot="{ invalid }"
          ref="subscribe"
          tag="form"
          autocomplete="off"
          @submit.prevent="!invalid && submitForm()"
        >
          <div class="flex flex-wrap mt-4 mb-4 -mx-1">
            <div class="my-1 px-1 w-full">
              <FormField
                class="no-margin form-v2"
                inputType="text"
                inputName="user_firstname"
                inputLabel="Votre prénom"
                :inputModel="dataUser.firstname"
                inputValidator="required"
                @valueChanged="
                  (payload) => (dataUser.firstname = payload.inputValue)
                "
              />
            </div>

            <div class="my-1 px-1 w-full">
              <FormField
                class="no-margin form-v2"
                inputType="date"
                inputName="user_birthday"
                inputLabel="Date de naissance"
                :inputModel="dataUser.birthday"
                inputValidator="required"
                @valueChanged="
                  (payload) => (dataUser.birthday = payload.inputValue)
                "
              />
            </div>

            <div class="my-1 px-1 w-full">
              <FormField
                class="no-margin form-v2"
                inputType="email"
                inputName="user_email"
                inputLabel="Votre email"
                :inputModel="dataUser.email"
                inputValidator="required|email"
                @valueChanged="
                  (payload) => (dataUser.email = payload.inputValue)
                "
              />
            </div>

            <div class="my-1 px-1 w-full">
              <FormField
                class="no-margin form-v2"
                inputType="text"
                inputName="user_city"
                inputLabel="Ville"
                :inputModel="dataUser.location"
                inputValidator="required"
                @valueChanged="
                  (payload) => (dataUser.location = payload.inputValue)
                "
              />
            </div>

            <div class="my-1 px-1 w-full">
              <FormField
                class="no-margin form-v2"
                inputType="textarea"
                inputName="user_confidential"
                inputLabel="Informations au Match"
                :inputModel="dataUser.confidential"
                @valueChanged="
                  (payload) => (dataUser.confidential = payload.inputValue)
                "
              />
            </div>

            <div class="my-1 px-1 w-full">
              <Button
                :disabled="invalid"
                :btnFunc="submitForm"
                type="submit"
                class="btn-black block"
                >Enregistrer</Button
              >
            </div>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
  },

  props: {
    user: Object,
  },

  data() {
    return {
      URI: process.env.API,
      dataUser: this.user,
    };
  },

  methods: {
    submitForm() {
      const token = this.$cookies.get("token");
      const decoded = this.$decodeJwt(token);
      let body = {
        firstname: this.dataUser.firstname,
        birthday: this.dataUser.birthday,
        location: this.dataUser.location,
        email: this.dataUser.email,
        isAdmin: this.dataUser.isAdmin,
        confidential: this.dataUser.confidential,
      };
      this.$updateMe(decoded.id, token, body)
        .then((response) => {
          this.dataUser = response.data;
          this.dataUser.birthday = new Date(this.dataUser.birthday)
            .toISOString()
            .slice(0, 10);
          this.$cookies.set(
            "user",
            JSON.stringify({
              firstname: response.data.firstname,
              isAdmin: response.data.isAdmin,
              photo: response.data.photo,
            }),
            {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            }
          );
          this.$store.commit("auth/setUser", this.$cookies.get("user"));
        })
        .catch((err) => console.log(err));
    },
  },

  watch: {
    user() {
      this.dataUser = this.user;
      this.dataUser.birthday = new Date(this.dataUser.birthday.slice(0, 10))
        .toISOString()
        .slice(0, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
.me {
  &__images {
    img {
      &:first-child {
        height: 150px;
        border-radius: 50%;
        width: 150px;
        object-fit: cover;
      }
    }
  }
}
</style>