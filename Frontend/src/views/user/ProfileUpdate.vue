<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner :activeIndex="bannerActiveIndex" />

    <div class="middle-container full">
      <div class="box-container bshadow">
        <h4 class="fw-600 color-01">Edit Profile</h4>
        <form @submit.prevent="onClickSubmitEditProfile">
          <div class="grids">

            <div class="grid sm-50">
              <input 
                type="file" id="avatarUpload" name="filefield" accept="image/*"  
                @change="onPhotoSelected" hidden
              >
              <Button
                text="Change Profile Avatar" classer="d-block btn-color-02"
                iconPrepend="camera.png" @click="onClickAddfiles"
              />
              <div v-if="avatarUploadProgress > 0" class="mt-1">
                <div class="progress-status">
                  <div class="progress">
                    <div class="bar" :style="'--percent:'+avatarUploadProgress+'%;'"></div>
                  </div>
                  <div class="text">{{avatarUploadProgress}}%</div>
                </div>
              </div>
            </div>
            <div class="grid sm-50">
              <input 
                type="file" id="backgroundUpload" name="filefield" accept="image/*"  
                @change="onBGPhotoSelected" hidden
              >
              <Button
                text="Change Profile Background" classer="d-block btn-color-02"
                iconPrepend="camera.png" @click="onClickAddBGfiles"
              />
              <div v-if="bgUploadProgress > 0" class="mt-1">
                <div class="progress-status">
                  <div class="progress">
                    <div class="bar" :style="'--percent:'+bgUploadProgress+'%;'"></div>
                  </div>
                  <div class="text">{{bgUploadProgress}}%</div>
                </div>
              </div>
            </div>
            <div class="sep"></div>

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
            <div class="sep"></div>
            
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
            <div class="sep"></div>

            <div class="grid sm-50">
              <FormGroup 
                type="country" label="what is your country?" :required="true" 
                placeholder="Select One" wrapperClass="fgray" 
                :value="dataset.country" @input="dataset.country = $event" 
                :options="countryStore"
                v-on:change.enter="FilterCountry(dataset.country)"
              />
            </div>
            <div class="grid sm-50" v-if="(stateStore.length != 0)? true: false">
              <FormGroup
                type="state" label="what is your state?" :required="true" 
                placeholder="Select One" wrapperClass="fgray" 
                :value="(stateStore.length != 0)? dataset.state: '-'" @input="dataset.state = $event" 
                :options="stateStore"
                v-on:change.enter="FilterState(dataset.state)"
              />
            </div>
            
            <div class="grid sm-100">
              <div class="form-group label-sm">
                <label class="p">What are you interested in?</label>
                <div class="fgray">
                  <Multiselect 
                    v-model="dataset.interests" :options="keywords" 
                    @change="(value) => dataset.interests = value" 
                    :searchable="true" mode="tags" :createTag="false" 
                  />
                </div>
              </div>
            </div>
            
            <div class="grid sm-100">
              <FormGroup 
                type="textarea" label="Tell us about yourself" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.about? dataset.about: ''"
                @input="dataset.about = $event"
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

<style src="@vueform/multiselect/themes/default.css"></style>

<script>
import { categoryService } from '../../services'
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import Banner from '../../components/Banner';
import Multiselect from '@vueform/multiselect';
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex';
// import json from '../../assets/state.json';
// import onlystate from '../../assets/onlystate.json';
// import csc from '../../assets/country-state-city';
import axios from 'axios';

export default {
  name: 'UserProfileUpdatePage',
  components: {
    TopNav,
    LeftNav,
    Banner,
    Multiselect
  },
  data() {
    return {
      bannerActiveIndex: 99,
      dataset: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        organization: '',
        country: '',
        state: '',
        city: '',
        interests: [],
        avatar: '',
        background: '',
        about: ''
      },
      states: [],
      country: [],
      keywords: [],
      avatarUploadProgress: 0,
      bgUploadProgress: 0
    };
  },
  created(){
    this.dataset.firstname = this.user.firstname;
    this.dataset.lastname = this.user.lastname;
    this.dataset.email = this.user.email;
    if(this.user.organization[0]){
      this.dataset.organization = this.user.organization[0].name;
    }
    this.dataset.state = this.user.state_id;
    this.dataset.interests = this.user.interests;
    this.dataset.avatar = this.user.avatar;
    this.dataset.background = this.user.background;
    this.dataset.country = this.user.country_id;
    this.dataset.about = this.user.about;
    if(this.dataset.country){
      this.assignCountry(this.dataset.country)
    }
    
    var that = this;
    categoryService._list().then(data => {
      data.map(d => {
        that.keywords = [...that.keywords, ...d.keyword];
      });
      that.keywords = that.keywords.filter((val, index, self) => {
        return self.indexOf(val) == index;
      });
    });
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      countryStore: 'csc/countrys',
      stateStore: 'csc/states',
      cityStore: 'csc/citys',
    }),
  },
  methods: {
    ...mapActions({
      editProfile: 'authentication/editProfile',
      editProfileImage: 'authentication/editProfileImage',
      editProfileBackground: 'authentication/editProfileBackground',
      assign: 'alert/assign',
      assignCountry: 'csc/assignCountry',
    }),

    onPhotoSelected(event) {  
      this.dataset.avatar  = event.target.files
      var formData1 = new FormData();
      formData1.append("media", this.dataset.avatar[0])
      var sizeInMB = (this.dataset.avatar[0].size / (1024*1024)).toFixed(2);
      if(sizeInMB < 5) {
        axios.post('user/edit_profile_image',
          formData1, {
            onUploadProgress: function (progressEvent) {
              this.avatarUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
            }.bind(this)
          }
        ).then(response => {
          this.editProfileImage(response.data).then(this.avatarUploadProgress = 0)
        });
      }
      else{
        this.assign({ type: 'Warning', message: "You cannot upload files exceeding 5mbs" }, { root: true })
      }
    },
    onBGPhotoSelected(event) {  
      this.dataset.background  = event.target.files
      var formData2 = new FormData();
      
      formData2.append("media", this.dataset.background[0])
      var sizeInMB = (this.dataset.background[0].size / (1024*1024)).toFixed(2);
      if(sizeInMB < 5) {
        axios.post(`user/edit_background_image`,
          formData2, {
            onUploadProgress: function (progressEvent) {
              this.bgUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
            }.bind(this)
          }
        ).then(response => {
          this.editProfileBackground(response.data).then(this.bgUploadProgress = 0)
        });
      }
      else{
        this.assign({ type: 'Warning', message: "You cannot upload files exceeding 5mbs" }, { root: true })
      }
    },
    onClickAddfiles() {
      document.getElementById('avatarUpload').click()
    },
    onClickAddBGfiles() {
      document.getElementById('backgroundUpload').click()
    },

    onClickSubmitEditProfile(e){
      var formData = new FormData();
      formData.append("firstname", this.dataset.firstname);
      formData.append("lastname", this.dataset.lastname);
      formData.append("state_id", this.dataset.state);
      formData.append("organization", this.dataset.organization);
      formData.append("country_id", this.dataset.country);
      formData.append("interests", this.dataset.interests);
      formData.append("about", this.dataset.about);
      this.editProfile(formData)
    },
    FilterCountry(country){
      this.assignCountry(country).then(response => {
         if(this.stateStore.length == 0){
          this.dataset.state = "-"
        }
      });
      console.log(country);
    },
    FilterState(state){
      console.log(state);
    }
  }
}
</script>
