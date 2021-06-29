<template>
  <section class="auth-01 bg-left wrapper-box">
    <div class="wrapper">

      <div class="bg-container bg-signin">
        <div class="wrapper">
          <div class="hide-mobile">
            <div class="logo" data-aos="fade-up" data-aos-delay="150">
              <img src="/assets/img/logo.png" alt="Image Logo" />
            </div>
            <h4 class="fw-600 lh-2xs mt-3" data-aos="fade-up" data-aos-delay="300">
              Discover The Leading <br>
              Career Exploration
            </h4>
          </div>
          <div class="hero-container" data-aos="fade-left" data-aos-delay="600">
            <img class="hero" src="/assets/img/hero/01.png" alt="Image Hero" />
          </div>
        </div>
      </div>

      <div class="auth-container" data-aos="fade-up" data-aos-delay="0">
        <div class="auth-wrapper">
          <h4 class="fw-600 mb-4">
            Forget Password
          </h4>
          <form action="/user/dashboard" method="GET">
            <div class="grids">
              <div class="grid sm-100">
                <FormGroup 
                  type="text" label="Email Address" :required="true" 
                  classer="label-sm" wrapperClass="fgray" 
                />
              </div>
              <div class="grid sm-100">
                <Button 
                  type="submit" text="Forget Password" 
                  classer="d-block btn-color-03 w-full mt-3" 
                />
              </div>
              <div class="grid sm-100">
                <div class="text-center mt-2">
                  <router-link to="/auth/signin" class="d-block p xs color-01 h-color-black">
                    Already a member? Sign in
                  </router-link>
                </div>
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

export default {
  name: 'AuthForgetPasswordPage',
  components: {
    Button,
    FormGroup,
    CheckBoxSmall
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  }
}
</script>
