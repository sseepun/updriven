<template>
  <section class="auth-01">
    <div class="wrapper">
      <div class="left-container">
        <div class="auth-container">
          <div class="logo" data-aos="fade-up" data-aos-delay="0">
            <img src="/assets/img/logo-02.png" alt="Image Logo" />
          </div>
          <form action="/user/dashboard" method="GET">
            <div data-aos="fade-up" data-aos-delay="150">
              <div class="grids">
                <div class="grid sm-50 xs-50">
                  <FormGroup type="text" label="First Name" :required="true" />
                </div>
                <div class="grid sm-50 xs-50">
                  <FormGroup type="text" label="Last Name" :required="true" />
                </div>
                <div class="grid sm-100">
                  <FormGroup type="email" label="Email" :required="true" />
                </div>
              </div>
              <div class="btns">
                <Button type="submit" text="CREATE ACCOUNT" classer="btn-color-01 w-full" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="right-container">
        <div class="wrapper">
          <h6 data-aos="fade-up" data-aos-delay="300">
            Discover The Leading <br>
            Career Exploration
          </h6>
          <div class="btns" data-aos="fade-up" data-aos-delay="450">
            <Button href="#" classer="btn-color-02" text="LEARN MORE" />
          </div>
          <div class="hero-container" data-aos="fade-left" data-aos-delay="600">
            <img class="hero" src="/assets/img/hero/01.png" alt="Image Hero" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';

export default {
  name: 'AuthSignInPage',
  components: {
    Button,
    FormGroup
  },
  created() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  }
}
</script>
