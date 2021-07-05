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
            Your account is Active now!
          </h4>
          <h6 class="fw-600 text-center pt-4 mt-6">
            ยินดีด้วย บัญชีของคุณสามารถใช้งานได้แล้ว
          </h6>
          <div class="fw-500 text-center mt-6">
              <router-link to="/auth/signin" class="h7 xs color-01 h-color-black">
                Go To Sign in
              </router-link>
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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthForgetPasswordPage',
  components: {
    Button,
    FormGroup,
    CheckBoxSmall
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    this.verifyEmailRegister(this.$route.params.token)
  },
  methods:{
    ...mapActions({
      verifyEmailRegister: 'authentication/verifyEmailRegister',
      
    }),
  },
}
</script>
