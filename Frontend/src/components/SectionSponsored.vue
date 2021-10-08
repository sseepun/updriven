<template>
  <h6 class="fw-600 color-01">Sponsored</h6>
  <div class="grids">
    <div v-for="(card, i) in sponsored" :key="i" class="grid sm-100">
      <SpecialCard01
        @on-edit="handleEdit(i)"
        :link="card.link"
        :image="card.image"
        :btnText="card.btnText"
        editable
      />
    </div>
  </div>

  <!-- Popup Edit -->
  <div
    class="popup-container pos-absolute"
    :class="{ active: isActivePopupEdit }"
  >
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupEdit = false"></div>
      <div class="popup-box md bg-white">
        <SpecialCard01
          :link="newSponsor.link"
          :image="newSponsor.image"
          :btnText="newSponsor.btnText"
        />
        <form class="w-full" @submit.prevent="onClickEdit">
          <h6 class="h5 fw-600 text-center lh-xs">Edit Sponsor</h6>
          <div class="grids">
            <div class="grid sm-100">
              <FormGroup
                type="text"
                label="link"
                classer="label-sm"
                wrapperClass="fgray"
                :value="newSponsor.link"
                :required="true"
                @input="(event) => (newSponsor.link = event)"
              />
            </div>
            <div class="grid sm-100 m-0">
              <FormGroup
                type="text"
                label="btnText"
                classer="label-sm"
                wrapperClass="fgray"
                :value="newSponsor.btnText"
                :required="true"
                @input="(event) => (newSponsor.btnText = event)"
              />
            </div>
            <div class="grid sm-100">
              <input
                type="file"
                id="photoUpload"
                name="filefield"
                accept="image/*"
                @change="onPhotoSelected"
                hidden
              />
              <Button
                text="Add photo"
                classer="btn-color-02 w-full"
                iconPrepend="camera.png"
                @click="onClickAddfiles('photoUpload')"
              />
            </div>
          </div>
          <div class="d-flex ai-center jc-center mt-4 pt-2">
            <Button type="submit" text="Edit" classer="btn-color-06 mr-3" />
            <a
              href="javascript:"
              class="btn btn-action btn-color-05"
              @click="isActivePopupEdit = false"
            >
              CANCEL
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SpecialCard01 from "./SpecialCard01";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "SectionSponsored",
  components: {
    SpecialCard01,
  },
  data() {
    return {
      isActivePopupEdit: false,
      currentSponsor: null,
      // user: this.$store.getters.user,
    };
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
      sponsored: "sponsor/sponsored",
      newSponsor: "sponsor/tempSponsor",
    }),
  },
  methods: {
    ...mapActions({
      onEdit: "sponsor/onEdit",
      submitEdit: "sponsor/submitEdit",
    }),
    handleEdit(index) {
      this.currentSponsor = index;
      this.onEdit(index);
      this.isActivePopupEdit = !this.isActivePopupEdit;
    },
    onClickAddfiles(target) {
      document.getElementById(target).click();
    },
    onPhotoSelected(event) {
      this.newSponsor.image = URL.createObjectURL(event.target.files[0]);
      this.newSponsor.file = event.target.files[0];
    },
    async onClickEdit() {
      if (this.currentSponsor != null) {
        await this.submitEdit(this.currentSponsor);
      }
      this.isActivePopupEdit = !this.isActivePopupEdit;
    },
  },
};
</script>
