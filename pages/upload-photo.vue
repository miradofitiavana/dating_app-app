<template>
  <div
    class="main-content flex-1 bg-transparent md:mt-2 pb-24 md:pb-0 shadow-lg"
  >
    <div class="content flex flex-wrap bg-indigo-100 h-full">
      <Title class="mb-6" titleValue="Ajoute ta meilleure photo" />
      <p class="text-teal-300">
        C'est encore le meilleur moyen d'en dévoiler un peu plus sur toi&nbsp;!
      </p>

      <img v-if="url" :src="url" />
      <div class="photo__container">
        <div class="photo__uploader">
          <label v-if="url">Tu veux modifier ta photo ?</label>
          <label v-else>Choisis ta plus belle photo...</label>
          <input type="file" @change="uploadFile" />
        </div>
      </div>
      <p class="text-sm font-semibold">
        Nous acceptons les fichiers JPEG ou PNG de 128M max.
      </p>
      <Button
        :btnFunc="handleSubmit"
        class="btn-black mt-10"
        :disabled="files == null ? true : false"
      >
        Suivant
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "no-sidebar",

  components: {},

  data() {
    return {
      files: null,
      url: "",
    };
  },

  methods: {
    uploadFile(event) {
      this.files = event.target.files;

      /** preview */
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    handleSubmit() {
      const token = this.$cookies.get("token");
      if (token == null) {
        this.$router.push("/login");
        return;
      }
      const tokenDecode = this.$decodeJwt(token);
      const id = tokenDecode.id;

      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append("files", this.files[i]);
      }
      formData.append("id", id);
      //  fetch(`${process.env.API_URL}/user-upload`, formData, {})
      fetch(`${process.env.API_URL}/upload-photo`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.photo) {
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
        });
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
* {
  color: #000;
}

.content {
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
}

img {
  max-width: 150px;
  margin-top: 20px;
}

.photo {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  &__uploader {
    min-height: 200px;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    border-width: 3px;
    flex-wrap: wrap;
    align-content: center;
    padding: 15px;
    position: relative;

    label,
    input {
      flex: 1 1 100%;
    }

    label {
      text-align: center;
    }

    input {
      opacity: 0;
      position: absolute;
      cursor: pointer;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
    }
  }
}
</style>