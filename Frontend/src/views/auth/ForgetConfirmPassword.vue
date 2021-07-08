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
            Reset Password
          </h4>
          <form  @submit.prevent="handleSentMail">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  type="password" label="New Password" :required="true" 
                  classer="label-sm" wrapperClass="fgray" 
                  :value="dataset.password" @input="dataset.password = $event" 
                />
              </div>
              <div class="grid sm-100">
                <FormGroup 
                  type="password" label="Confirm Password" :required="true" 
                  classer="label-sm" wrapperClass="fgray" 
                  :value="dataset.confirmPassword" @input="dataset.confirmPassword = $event" 
                />
              </div>
              <div class="grid sm-100">
                <Button 
                  type="submit" text="FORGET PASSWORD" 
                  classer="d-block btn-color-03 w-full mt-2" 
                />
              </div>
              
            </div>
          </form>
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
        password: '',
        confirmPassword: '',
      }
    }
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    this.checkPassword(this.$route.params.token).then(
            response => {
              console.log("check token succesful")
            },
            error => {
              console.log(error)
            }
          );
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert'
    })
  },
  methods:{
    ...mapActions({
      checkPassword: 'authentication/checkPassword',
      resetPassword: 'authentication/resetPassword',
      assign: 'alert/assign',
    }),
    handleSentMail(e) {
        if (this.dataset.password && (this.dataset.password == this.dataset.confirmPassword)) {
          console.log("password2"+this.dataset.password)
          this.resetPassword({
          token: this.$route.params.token,
          password: this.dataset.password
        }).then(
            response => {
              this.$router.push('/');
            },
            error => {
              console.log(error)
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.dataset.password = "";
              this.dataset.confirmPassword = "";
              
            }
          );
        }
        else{
          this.assign({ type: 'Warning', message: "Your Password Do Not Match." })
        }
        this.isValidated = true;
    },
  },
}
</script>
