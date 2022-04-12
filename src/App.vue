<template>
  <div :class="info.dark && 'darkTheme'">
    <header>
      <h1>Number Base Converter</h1>
      <fa class="moon" icon="moon" @click="darkTheme"/>
    </header>
    <hr>
    <AppConvertion />
    <AppFooter />
  </div>
</template>

<script>
import AppConvertion from './components/AppConvertion.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppConvertion,
    AppFooter
  },
  data() {
    return{
      info: {
        dark: JSON.parse(localStorage.getItem('dark'))
      }
    }
  },
  methods: {
    darkTheme(e) {
      e.preventDefault();
      if(this.info.dark == true) {
        localStorage.setItem('dark', !this.info.dark);
        this.info.dark = JSON.parse(localStorage.getItem('dark'));
      } else {
        this.info.dark = true;
        localStorage.setItem('dark', true);
      }
      console.log(this.info.dark)
    }
  }
}
</script>

<style>
  @import '../css/app.css';
</style>