<template>
  <div id="wraper">
    <Header />
    <Home />
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script>
import Header from './components/Common/Header'; 
import Footer from './components/Common/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import '/src/assets/scss/common.scss';
@import '/src/assets/scss/layouts/header.scss';
@import '/src/assets/scss/layouts/footer.scss';
</style>
