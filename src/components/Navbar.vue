<template>
  <header>
    <nav>
     <div class='navbar'>
      <div class="brand">
        <h1><router-link to="/">Simple Poll</router-link></h1>
      </div>
        <i class="fa fa-bars" aria-hidden="true" v-on:click="openMenu()"></i>
      <div v-bind:class="[ isOpen ? 'open' : 'close', 'nav-menu']">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
        </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'navbar',
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    openMenu: function(){
      this.isOpen = !this.isOpen
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  $green: #34bf49
  $red: #ff4c4c
  $blue: #0099e5
  $white: #fff
  $black: #050f2c
  $shadow-down: 0px 0px 10px 0px $black
  $shadow-up: 2px 2px 20px 0px $black
  nav
    width: 100%
    background: $black
  a
    text-decoration: none
    margin-right: 10px
    font-family: 'Open Sans', sans-serif
    font-weight: 700
    color: $white

  .open
    opacity: 1
    transition: opacity 0.4s linear
  .close
    opacity: 0
    transition: opacity 0.4s linear
    @media screen and (min-width: 760px)
      opacity: 1

  .navbar
    margin: 0 auto
    width: 100%
    height: 60px
    max-width: 960px
    display: flex
    align-items: center
    flex-wrap: wrap
    box-sizing: border-box
    justify-content: space-between
    padding: 12px 10px
    color: $white
    position: relative
    transition: all 0.5s ease-in-out
    @media screen and (min-width: 760px)
      flex-direction: row
    i
      @media screen and (min-width: 760px)
         display: none
    .nav-menu
      width: 100%
      position: absolute
      background: $black
      left: 0
      top: 60px
      border-top: 1px solid $white
      a
        display: block
        padding: 20px 10px
        text-align: center
        @media screen and (min-width: 760px)
          display: inline-block
          padding: 0
      @media screen and (min-width: 760px)
        border: none
        display: block
        width: initial
        position: static

    h1
      text-decoration: none
      font-family: 'Open Sans', sans-serif
      margin: 0
      display: inline-block




</style>
