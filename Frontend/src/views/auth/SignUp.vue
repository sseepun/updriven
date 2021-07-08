<template>
  <section class="auth-01">
    <div class="wrapper">

      <div class="bg-container">
        <div class="wrapper">
          <div class="hide-mobile">
            <h2 class="fw-500 color-white lh-2xs" data-aos="fade-up" data-aos-delay="300">
              Find the Path to <br>
              Your Dream Job
            </h2>
            <div class="btns mt-4" data-aos="fade-up" data-aos-delay="450">
              <Button href="#" classer="btn-color-02 btn-sm btn-mw fw-600" text="LEARN MORE" />
            </div>
          </div>
          <div class="hero-container" data-aos="fade-left" data-aos-delay="600">
            <img class="hero" src="/assets/img/hero/01.png" alt="Image Hero" />
          </div>
        </div>
      </div>

      <div class="auth-container">
        <div class="auth-wrapper">

          <div v-if="step == 0" data-aos="fade-up" data-aos-delay="0">
            <div class="logo">
              <img src="/assets/img/logo.png" alt="Image Logo" />
            </div>
            <h4 class="fw-600 text-center pt-4 mt-6">
              Sign Up
            </h4>
            <form @submit.prevent="handleRegister">
              <div class="grids">
                <div class="grid sm-50">
                  <FormGroup 
                    type="text" label="First Name" :required="true" 
                    classer="label-sm" wrapperClass="fgray" 
                    :value="dataset.firstname" @input="dataset.firstname = $event" 
                  />
                </div>
                <div class="grid sm-50">
                  <FormGroup 
                    type="text" label="Last Name" :required="true" 
                    classer="label-sm" wrapperClass="fgray" 
                    :value="dataset.lastname" @input="dataset.lastname = $event" 
                  />
                </div>
                <div class="grid sm-100">
                  <FormGroup 
                    type="email" label="Email" :required="true" 
                    classer="label-sm" wrapperClass="fgray" 
                    :value="dataset.email" @input="dataset.email = $event" 
                    
                  />
                </div>
                <div class="grid sm-100">
                  <FormGroup 
                    type="password" label="Password" :required="true" 
                    classer="label-sm" wrapperClass="fgray" 
                    :value="dataset.password" @input="dataset.password = $event" 
                  />
                </div>
                <div class="grid sm-100">
                  <CheckBoxSmall
                    text="Creating an account means you’re okay with our 
                      <a class='color-01 h-color-black' href='#'>Terms of Service</a>, 
                      <a class='color-01 h-color-black' href='#'>Privacy Policy</a>, and our default 
                      <a class='color-01 h-color-black' href='#'>Notification Settings</a>."
                    :required="true"
                  />
                </div>
                <div class="grid sm-100">
                  <Button 
                    type="submit" text="CREATE ACCOUNT" 
                    classer="d-block btn-color-03 w-full" 
                  
                  />
                </div>
              </div>
            </form>
            <div class="ss-sep pt-2 mt-6">
              <p class="xs fw-400">Or</p>
            </div>
            <div class="grids mt-4">
              <div class="grid sm-100">
                <Button 
                  type="Social Google" text="Continue with Google" 
                  classer="d-block btn-color-04 w-full" href="/user/dashboard" 
                />
              </div>
              <div class="grid sm-100">
                <Button 
                  type="Social Facebook" text="Continue with Facebook" 
                  classer="d-block btn-color-04 w-full" href="/user/dashboard" 
                />
              </div>
              <div class="grid sm-100">
                <router-link to="/auth/signin" class="p xs color-01 h-color-black">
                  Already a member? Sign in
                </router-link>
              </div>
            </div>
          </div>
          
          <div v-if="step == 1" data-aos="fade-up" data-aos-delay="0">
            <div class="logo">
              <img src="/assets/img/logo.png" alt="Image Logo" />
            </div>
            <h4 class="fw-600 text-center pt-4 mt-4">
              Sign Up Successful
            </h4>
            <p class="lg text-center mt-2">
              Please check your email and follow our verification process. Thank you!
            </p>
          </div>

        </div>
      </div>

    </div>
  </section>
  <AlertPopup :alert="alert" />
</template>

<script>
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import CheckBoxSmall from '../../components/CheckBoxSmall';
import RegisUser from '../../models/regis_user.js';
import { mapState, mapGetters, mapActions } from 'vuex'


export default {
  name: 'AuthSignUpPage',
  components: {
    Button,
    FormGroup,
    CheckBoxSmall
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  data() {
    return {
      step: 0,
      alert: {},
      dataset: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      }
    }
  },
  methods:{
    ...mapActions({
      register: 'authentication/register',
      
    }),
    handleRegister(e) {
        let regisUser = new RegisUser(
          this.dataset.password,
          this.dataset.email,
          this.dataset.firstname,
          this.dataset.lastname
        )
        if (this.dataset.firstname && this.dataset.email && this.dataset.lastname && this.dataset.password) {
          this.register(regisUser).then(
            response => {
              this.step = 1;
              // this.$router.push('/');
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.alert = { type: 'Warning', message: this.message };
            }
          );
        }
        this.isValidated = true;
    }
  }
}
</script>
