<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner />

    <div class="middle-container full">
      <div class="box-container bshadow">
        <h4 class="fw-600 color-01">Edit Profile</h4>
        <form @submit.prevent="onClickSubmitEditProfile">
          <div class="grids">
          <div class="grid sm-50">
          <input 
              type="file" id="avatarUpload" name="filefield" accept="image/*"  
              @change="onPhotoSelected" hidden>
            <Button
              text="Change Profile Avatar" classer="btn-color-02"
              iconPrepend="camera.png" @click="onClickAddfiles"
            />
            {{uploadPercentage}} %
            </div>
          
            <div class="grid sm-50">
          <input 
              type="file" id="backgroundUpload" name="filefield" accept="image/*"  
              @change="onBGPhotoSelected" hidden>
            <Button
              text="Change Profile Background" classer="btn-color-02"
              iconPrepend="camera.png" @click="onClickAddBGfiles"
            />
            </div>
            
            <div class="grid sm-50">

              <FormGroup 
                type="text" label="First name" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.firstname" @input="dataset.firstname = $event" 
              />
            </div>
            <div class="grid sm-50">
              <FormGroup 
                type="text" label="Last name" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.lastname" @input="dataset.lastname = $event" 
              />
            </div>
            
            <div class="grid sm-50">
              <FormGroup 
                type="text" label="Username" :required="true" :disabled = "true" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.username" @input="dataset.username = $event" 
              />
            
            </div>
            <div class="grid sm-50">
              <FormGroup 
                type="email" label="Email" :required="true" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.email" @input="dataset.email = $event" 
              />
            </div>
            <div class="grid sm-50">
              <FormGroup 
                type="text" label="Organization" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.organization" @input="dataset.organization = $event" 
              />
            </div>
            <div class="grid sm-50">
                  <FormGroup 
                    type="select" label="Where do you live?" :required="true" placeholder="Select Here" 
                    :value="dataset.state" 
                    @input="dataset.state = $event"
                    :options="states"
                  />
                </div>
             
            <div class="grid sm-100">
              <SelectTag 
                label="What are you interested in?" classer="label-sm" wrapperClass="fgray" 
                :value="dataset.interests" 
                :options="[ 'Choice 1', 'Choice 2', 'Choice 3', 'Choice 4' ]" 
              />
            </div>
          </div>
          <div class="btns">
            <Button 
              type="submit" text="SAVE INFORMATION" 
              classer="d-block btn-color-03 w-full mt-2" 
            />
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import Banner from '../../components/Banner';
import {mapGetters, mapActions, mapState, mapMutations} from "vuex";
import json from '../../assets/state.json'
import onlystate from '../../assets/onlystate.json'
import axios from 'axios'

export default {
  name: 'UserProfileUpdatePage',
  components: {
    TopNav,
    LeftNav,
    Banner
  },
  data() {
    return {
      dataset: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        organization: '',
        state: '',
        interests: [],
        avatar: "",
        background: "",
      },
      states : [],
      uploadPercentage: 0,
    };
  },
  created(){
    this.states = json
    this.dataset.firstname = this.user.firstname;
    this.dataset.lastname = this.user.lastname;
    this.dataset.email = this.user.email;
    if(this.user.organization){
      this.dataset.organization = this.user.organization[0].name;
    }
    this.dataset.state = this.user.state_id;
    this.dataset.interests = this.user.interests;
    this.dataset.avatar = this.user.avatar;
    this.dataset.background = this.user.background;
  }
  ,
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  methods: {
    ...mapActions({
      editProfile: 'authentication/editProfile',
      editProfileImage: 'authentication/editProfileImage',
      editProfileBackground: 'authentication/editProfileBackground',
    }),
    onPhotoSelected(event) {  
      this.dataset.avatar  = event.target.files
      var formData1 = new FormData();
      formData1.append("media", this.dataset.avatar[0])
      // this.editProfileImage(formData1)
      axios.post( 'user/edit_profile_image',
        formData1,
        {
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
          }.bind(this)
        }
      ).then(response => {
        console.log('SUCCESS!!');
        this.editProfileImage(response.data).then(this.uploadPercentage = 0)
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
      
    },
    onBGPhotoSelected(event) {  
      this.dataset.background  = event.target.files
      var formData2 = new FormData();
      console.log(this.dataset.background[0])
      formData2.append("media", this.dataset.background[0])
      //this.editProfileBackground(formData2)
      axios.post( `user/edit_background_image`,
        formData2,
        {
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
          }.bind(this)
        }
      ).then(response => {
        console.log('SUCCESS!!');
        this.editProfileBackground(response.data).then(this.uploadPercentage = 0)
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    },
    onClickAddfiles() {
      document.getElementById('avatarUpload').click()
      console.log(JSON.stringify(this.dataset.avatar[0]))
    },
    onClickAddBGfiles() {
      document.getElementById('backgroundUpload').click()
      console.log(JSON.stringify(this.dataset.background[0]))
    },
    onClickSubmitEditProfile(){
      var formData = new FormData();
      formData.append("firstname", this.dataset.firstname);
      formData.append("lastname", this.dataset.lastname);
      formData.append("state_id", this.dataset.state);
      formData.append("organization", this.dataset.organization);
      this.editProfile(formData)
    }
  }
}
</script>
