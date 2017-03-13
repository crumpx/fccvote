<template lang="html">
  <content><h2>Create a Poll</h2>
    <div class="poll-container">
      <transition name="fade">
      <div class="add-poll"  v-show="!submited" >

      <input type="text" name='tltle' v-model="newPoll.title" placeholder="Question">
      <div class="spacer"></div>

      <div v-for='option, index in newPoll.options'>
        <input type="text" placeholder="Option" v-model="option.text" v-if="index == 0">
        <input type="text" placeholder="Option" v-model="option.text" v-if="index >0"  v-on:click.once="dupInput(index)">
      </div>
      </div>
  </transition>
  <transition name="fade">
  <div class="submitAction" v-if="checkForm()">
    <div class="left">
      <label for="dateCheck">Expire?</label>
      <input class='dateToggle' v-model='expirationChecked' type="checkbox" id='dateCheck'>
      <input class='expDate' type="date" v-model='newPoll.expiration'>
    </div>
    <div class="right"><button v-on:click="getData" >Submit</button></div>
  </div>
   </transition>
    </div>

    <polllist v-bind:lists='pollList'></polllist>

  </content>

</template>

<script>
var crypto = require('crypto')

import polllist from './PollList.vue'

 export default {
  name: 'poll',
  components: {
      polllist
    },
  data() {
    return {
      submited: false,
      expirationChecked: false,
      newPoll: {
        title: '',
        options: [{text: ''},{text: ''}],
      },
      pollList: {},
    }
  },
  methods: {
    checkForm: function(){
      if (this.newPoll.title == '' || this.newPoll.title == 'New Poll') return false
      if (this.submited) return false
      if (this.newPoll.options[0].text.length <1 || this.newPoll.options[1].text.length <1 ) return false
      return true
    },

    dupInput: function(index){
      this.newPoll.options.push({text: ''})
    },

    getRandom: function(length=5){
      return crypto.randomBytes(length).toString('hex')
    },

    fetchPolls: function(){
      this.$http.get('https://radiant-tor-19365.herokuapp.com/poll').then(
        function(response){
          this.pollList = response.data
        }
      )
    },

    getData: function(){
      let poll = JSON.parse(JSON.stringify(this.newPoll))
      poll.credential = this.getRandom(5).toLowerCase()
      poll.shorturl = this.getRandom(5)
      poll.options = poll.options.map(function(item){
        return item.text
      }).filter(function(item){
        return item.length
      })

      if (this.expirationChecked == false) {
        delete poll.expiration
      }

      this.$http.post('https://radiant-tor-19365.herokuapp.com/poll/new',poll).then(
        function(response){
          this.pollList.lastest.unshift(response.body)
          this.newPoll = {
                  title: '',
                  // description: '',
                  options: [{text: ''},{text: ''}],
                }
          // this.$router.push('poll/'+response.body.shorturl)

        }, function(response){
          console.log('something wrong')
        })
    },
  }, //methods ended

  created: function(){
    this.fetchPolls();
  },
}
</script>

<style lang="sass" scoped>
  $green: #34bf49
  $red: #ff4c4c
  $blue: #0099e5
  $white: #fff
  $black: #050f2c
  $shadow-down: 0px 0px 10px 0px $black
  $shadow-up: 2px 2px 20px 0px $black

  label
    font-size: 1.2em
    color: $black
  button
    border: 0
    outline: 0
    padding: 15px
    color: #fff
    background: $green
  h2
    font-size: 1.5em
    text-align: center
  input
    margin: 10px auto 10px auto
    box-sizing: border-box
    display: block
    width: 90%
    border: 0
    outline: 0
    padding: 12px
    color: $black
    background: $blue

  .spacer
    height: 10px

  .poll-container
    font-family: 'Open Sans', sans-serif
    background: $white
    border: 1px solid $black
    max-width: 790px
    padding: 30px 0
    margin: 20px auto
    width: 90%
    height: 100%
    box-shadow: $shadow-down

  .submitAction
    height: 40px
    margin: 20px auto
    display: flex
    width: 90%
    justify-content: space-between
    align-items: center
    .left
      label
        color: $black
      input
        display: inline
        width: initial
        margin: 0
        color: $red
      .expDate
        display: none
      .dateToggle:checked +.expDate
        display: inline-block


  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
    opacity: 0

</style>
