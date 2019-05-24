<template>
  <div id="app">
    <calendar />
  </div>
</template>

<script>
import calendar from "./components/calendar/calendar"
export default {
  name: 'app',
  components:{calendar}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@import url("./assets/base.less");
</style>
