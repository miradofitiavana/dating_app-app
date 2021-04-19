<template>
  <validation-provider
    :rules="inputValidator"
    :bails="false"
    tag="div"
    class="form-label-group"
    :name="inputLabel"
    v-slot="{ errors }"
  >
    <textarea
      v-if="inputType == 'textarea'"
      :id="inputName"
      :name="inputName"
      class="form-control"
      :class="[inputClass, errors.length ? 'error' : '']"
      autocomplete="off"
      :placeholder="inputPlaceholder ? inputPlaceholder : inputLabel"
      v-on:keyup="pushInputValue"
      v-model="dataInputModel"
      :disabled="disableField"
      rows="5"
    ></textarea>

    <multiselect
      :class="[inputClass, errors.length ? 'error' : '']"
      v-else-if="inputType == 'multiselect'"
      v-model="dataInputModel"
      :options="multiOptions"
      :multiple="isMulti"
      :trackBy="multiTrackBy"
      :name="inputName"
      :custom-label="multiCustomLabel"
      selectLabel=""
      deselectLabel=""
      :placeholder="inputLabel"
      selectedLabel=""
      @input="pushInputValue"
      :disabled="disableField"
    >
    </multiselect>

    <input
      v-else
      :type="inputType"
      :id="inputName"
      :name="inputName"
      class="form-control"
      :class="[inputClass, errors.length ? 'error' : '']"
      autocomplete="off"
      :placeholder="inputPlaceholder ? inputPlaceholder : inputLabel"
      v-on:keyup="pushInputValue"
      v-model="dataInputModel"
      :disabled="disableField"
    />

    <label v-if="inputType != 'multiselect'" :for="inputName">
      {{ inputLabel }}
    </label>

    <transition name="fade">
      <ul v-if="errors.length" class="error__list">
        <li v-for="(error, index) in errors" :key="index">
          <small>{{ error }}</small>
        </li>
      </ul>
    </transition>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
    ValidationProvider,
  },

  data: function () {
    return {
      dataInputModel: this.inputModel,
    };
  },

  props: {
    inputModel: String | Array,
    inputType: !String,
    inputName: !String,
    inputLabel: String,
    inputPlaceholder: String,
    inputClass: String,
    disableField: {
      type: Boolean,
      default: false,
    },

    inputValidator: String,

    multiOptions: Array,
    multiTrackBy: String,
    multiCustomLabel: Function,
    isMulti: Boolean,
  },

  methods: {
    pushInputValue: function () {
      this.$emit("valueChanged", { inputValue: this.dataInputModel });
    },
  },

  watch: {
    inputModel() {
      this.dataInputModel = this.inputModel;
    },
  },
};
</script>

<style lang="scss">
.form-v2 {
  .multiselect {
    &--disabled {
      opacity: 1;
      background: initial;
      .multiselect__tags {
        border-color: #1e2129;
        background: #f5f5f5;
      }
    }

    &__tags {
      border-color: #1e2129;
    }
  }
}

.multiselect {
  min-height: 60px;

  &--active {
    border-radius: 5px;
    box-shadow: 0 0 0 0.2rem #3b1d3fb8;
  }

  &__select,
  &__tags {
    min-height: 60px;
  }

  &__tags {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 1px solid;
    border-color: #fff;
    border-radius: 5px;
  }

  &__tag {
    margin-bottom: 0;
    background-color: #3b1d3f;
    border-radius: 0px;
    color: #fff;
    font-weight: 600;

    &-icon {
      background-color: #3b1d3f;
      color: #fff;

      &:focus,
      &:hover {
        background-color: var(--gris-8);
        border-radius: 0;
      }
    }
  }

  &__placeholder {
    margin-bottom: 0;
    color: #495057;
    font-size: 16px;
  }

  &.error {
    border-radius: 5px;
    box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 62%);
  }

  &__option {
    &--highlight {
      background: #3b1d3f;
      color: #fff;
      &:after {
        background: #3b1d3f;
        color: var(--gris-8);
        opacity: 0.7;
        font-weight: 700;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.error {
  &__list {
    margin-top: 5px;
    margin-bottom: 10px;

    li {
      color: #ec0000;
      list-style: square;
      list-style-position: inside;
      padding-left: 10px;
    }
  }
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
  width: 100%;

  &.no-margin {
    margin-bottom: 0;
  }

  &.form-v2 {
    textarea,
    input,
    label {
      border-color: #1e2129;
    }
  }

  textarea,
  input,
  label {
    width: 100%;
    height: 60px;
    padding: 0.75rem;
    box-shadow: none;
    transition: box-shadow 0.3s;
    border: 1px solid;
    border-color: #fff;
    border-radius: 5px;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem #3b1d3fb8;
    }

    &.error {
      box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 62%);
    }

    &:disabled {
      background: #f5f5f5;
    }
  }

  textarea {
    height: 5rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 2;
    color: #495057;
    pointer-events: none;
    cursor: text;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }
}

.form-label-group textarea::-webkit-input-placeholder,
.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group textarea::-moz-placeholder,
.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group textarea:-ms-input-placeholder,
.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group textarea::-ms-input-placeholder,
.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group textarea::placeholder,
.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group textarea:not(:-moz-placeholder-shown),
.form-label-group input:not(:-moz-placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group textarea:not(:-ms-input-placeholder),
.form-label-group input:not(:-ms-input-placeholder) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group textarea:not(:placeholder-shown),
.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group textarea:not(:-moz-placeholder-shown) ~ label,
.form-label-group input:not(:-moz-placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group textarea:not(:-ms-input-placeholder) ~ label,
.form-label-group input:not(:-ms-input-placeholder) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group textarea:not(:placeholder-shown) ~ label,
.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group textarea:-webkit-autofill ~ label,
.form-label-group input:-webkit-autofill ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .form-label-group label {
    position: static;
  }

  .form-label-group textarea::-ms-input-placeholder,
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/** transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>