<template>
  <div id="app">
  <navbar></navbar>
  <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import pollDetails from './components/pollDetails.vue'
export default {
  components: {
    Navbar,
    pollDetails,
  },
  name: 'app',
}
</script>

<style lang='sass' >
  $green: #34bf49
  $red: #ff4c4c
  $blue: #0099e5
  $white: #d0d2d3
  $whiter: #f2f6fa
  $purewhite: #fff
  $black: #000000
  $lightblack: #333333
  $shadow-down: 2px 2px 10px 0px $lightblack
  $shadow-up: 4px 4px 20px 0px $lightblack

  body
    height: 100%
    width: 100%
    background: $purewhite
    font-family: 'Open Sans', sans-serif

  #app
    // font-family:  Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
    margin-top: 0px


</style>
