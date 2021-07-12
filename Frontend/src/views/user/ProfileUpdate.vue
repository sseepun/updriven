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
        <form action="">
          <div class="grids">
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
                type="text" label="Username" :required="true" 
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
                type="text" label="School" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.school" @input="dataset.school = $event" 
              />
            </div>
            <div class="grid sm-50">
              <FormGroup 
                type="text" label="Where do you live?" 
                classer="label-sm" wrapperClass="fgray" 
                :value="dataset.state" @input="dataset.state = $event" 
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
import {mapGetters, mapActions, mapState, mapMutations} from "vuex"

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
        school: '',
        state: '',
        interests: []
      }
    };
  },
  mounted() { onMounted(); }
}
</script>
