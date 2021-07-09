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
              <Button href="#" classer="btn-color-02 btn-sm btn-mw fw-600" text="LEARN MORE" />
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
            Forget Password
          </h4>
          <form  @submit.prevent="handleSentMail">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  type="text" label="Email Address" :required="true" 
                  classer="label-sm" wrapperClass="fgray" 
                  :value="dataset.email" @input="dataset.email = $event" 
                />
              </div>
              <div class="grid sm-100">
                <Button 
                  type="submit" text="FORGET PASSWORD" 
                  classer="d-block btn-color-03 w-full mt-2" 
                />
              </div>
              <div class="grid sm-100">
                <router-link to="/auth/signin" class="p xs color-01 h-color-black">
                  Already a member? Sign in
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import CheckBoxSmall from '../../components/CheckBoxSmall';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthForgetPasswordPage',
  components: {
    Button,
    FormGroup,
    CheckBoxSmall
  },
  data() {
    return {
      step: 0,
      dataset: {
        email: '',
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
  methods:{
    ...mapActions({
      forgetPasswordSentEmail: 'authentication/forgetPasswordSentEmail',
    }),
    handleSentMail(e) {
        if (this.dataset.email) {
          this.forgetPasswordSentEmail(this.dataset.email).then(
            response => {
              this.dataset.email = "";
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.dataset.email = "";
            }
          );
        }
        this.isValidated = true;
    },
  },
}
</script>
