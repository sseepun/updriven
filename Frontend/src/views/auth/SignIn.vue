<template>
  <section class="auth-01">
    <div class="wrapper">

      <div class="bg-container">
        <div class="wrapper">
          <div class="hide-mobile">
            <h2 class="fw-500 color-white lh-2xs" data-aos="fade-up" data-aos-delay="300">
              Discover The Leading <br>
              Career Exploration
            </h2>
            <div class="btns mt-4" data-aos="fade-up" data-aos-delay="450">
              <a 
                href="https://updriven.com/learner-overview" target="_blank" 
                class="btn btn-action btn-color-02 btn-sm btn-mw fw-600"
              >
                LEARN MORE
              </a>
            </div>
          </div>
          <div class="hero-container bottom-right" data-aos="fade-left" data-aos-delay="600">
            <img class="hero hero-lg" src="/assets/img/hero/02.png" alt="Image Hero" />
          </div>
        </div>
      </div>

      <div class="auth-container" data-aos="fade-up" data-aos-delay="0">
        <div class="auth-wrapper">
          <div class="logo">
            <img src="/assets/img/logo.png" alt="Image Logo" />
          </div>
          <h4 class="fw-600 text-center pt-4 mt-6">
            Sign In
          </h4>
          <p class="color-gray mt-3 text-center">We're so excited to see you again!</p>
          <form @submit.prevent="handleSubmit">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  type="text" label="Email Address" :required="true" 
                  classer="label-sm" wrapperClass="fgray" 
                  :value="user.authen" @input="user.authen = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  type="password" label="Password" :required="true" 
                  classer="label-sm" wrapperClass="fgray" 
                  sublabel="Forgot password?" sublabelLink="/auth/forget-password" 
                  :value="user.password" @input="user.password = $event" 
                />
              </div>
              <div class="grid sm-100">
                <Button 
                  type="submit" text="SIGN IN" 
                  classer="d-block btn-color-03 w-full mt-2" 
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
                classer="d-block btn-color-04 w-full"  @click.prevent="onClickGoogle" href="/user/dashboard" 
              />
            </div>
            <div class="grid sm-100">
              <Button 
                type="Social Facebook" text="Continue with Facebook" 
                classer="d-block btn-color-04 w-full" @click.prevent="onClickFacebook" href="/user/dashboard"
              />
            </div>
            <div class="grid sm-100">
              <router-link to="/auth/signup" class="p xs color-01 h-color-black">
                Not a member? Sign up now
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import CheckBoxSmall from '../../components/CheckBoxSmall';
import {mapGetters, mapActions, mapState} from "vuex"
import { authenService } from '../../services'

export default {
  name: 'AuthSignInPage',
  components: {
    Button,
    FormGroup,
    CheckBoxSmall
  },
  data() {
    return {
      //alert: {},
      user: {
        authen: '',
        password: '',
        isValidated: false
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert'
    })
  },
  methods: {
    ...mapActions({
      signin: 'authentication/signin',
      signFacebook: 'authentication/signFacebook',
      signGoogle: 'authentication/signGoogle',
      assignAlert: 'alert/assign'
    }),

    handleSubmit(e) {
      if (true) {
        this.signin({
          authen: this.user.authen,
          password: this.user.password
        }).then( () => {
          this.$router.push({ 
            name: 'UserDashboardPage'
          });
          this.assignAlert({ type: 'Success', message: 'Signed in successfully.' })
        }).catch( err => {
          this.user.password = '';
        });
      }
      this.isValidated = true;
    },
    onClickFacebook() {
      window.location = `${process.env.VUE_APP_API_URL}/apis/auth/facebook`;
    },
    onClickGoogle() {
      window.location = `${process.env.VUE_APP_API_URL}/apis/auth/google`;
    }
  },
}
</script>
