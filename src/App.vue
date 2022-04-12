<template>
  <header>
    <h1>Number Base Converter</h1>
    <hr>
  </header>
  <AppConvertion />
</template>

<script>
import AppConvertion from './components/AppConvertion.vue';

export default {
  name: 'App',
  components: {
    AppConvertion
  }
}
</script>

<style>
  @import '../css/app.css';
</style>
