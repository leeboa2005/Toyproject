<template>
  <div id="wraper">
    <Header />
    <Home />
    <router-view></router-view>
    <Footer />
  </div>
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

<style lang="scss" scoped>
@import '/src/assets/scss/common.scss';
</style>
