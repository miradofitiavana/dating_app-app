<template>
  <div
    class="preferences flex-1 px-3 md:px-8 overflow-x-hidden overflow-y-auto"
  >
    <client-only>
      <div class="preferences__content max-w-screen-sm ml-auto mr-auto">
        <div class="text-center pb-5">
          <h1 class="text-lg font-semibold md:text-3xl">Préférences</h1>
        </div>
        <div class="pref__toshow">
          <h2 class="text-base font-medium mb-4">Montrez-moi</h2>
          <div class="flex justify-around flex-col md:flex-row">
            <RadioButton
              radio-title="Homme"
              :radioValue="1"
              v-model="dataPreferences.showMe"
            ></RadioButton>
            <RadioButton
              radio-title="Femme"
              :radioValue="-1"
              v-model="dataPreferences.showMe"
            ></RadioButton>
            <RadioButton
              radio-title="Les deux"
              :radioValue="0"
              v-model="dataPreferences.showMe"
            ></RadioButton>
          </div>
        </div>
        <div class="pref__age">
          <h2 class="text-base font-medium mb-4 mt-4">
            Tranche d'âge :
            <span
              >{{ dataPreferences.ageFrom }} à
              {{ dataPreferences.ageTo }} ans</span
            >
          </h2>
          <div class="mb-16">
            <veeno
              pipsy
              :handles="[dataPreferences.ageFrom, dataPreferences.ageTo]"
              :range="{
                min: 18,
                max: 99,
              }"
              :step="1"
              @update="sliderUpdate"
            />
          </div>
        </div>

        <div class="my-1 px-1 w-full text-right">
          <Button :btnFunc="submitForm" type="submit" class="btn-black block"
            >Enregistrer</Button
          >
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import veeno from "veeno";
// for default styles
import "nouislider/distribute/nouislider.min.css";

export default {
  components: {
    veeno,
  },

  props: {
    preferences: Object,
  },

  data() {
    return {
      dataPreferences: this.preferences,
    };
  },

  methods: {
    sliderUpdate(payload) {
      this.dataPreferences.ageFrom = Math.round(payload.unencoded[0]);
      this.dataPreferences.ageTo = Math.round(payload.unencoded[1]);
    },

    submitForm() {
      const token = this.$cookies.get("token");
      const decoded = this.$decodeJwt(token);
      this.$updatePrefs(decoded.id, token, this.dataPreferences)
        .then((response) => {})
        .catch((err) => console.log(err));
    },
  },

  watch: {
    preferences() {
      this.dataPreferences = this.preferences;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>