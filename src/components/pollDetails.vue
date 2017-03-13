<template lang="html">
  <content>
    <div class="container">
      <template v-if="toShow() == 'showPoll'">
      <div class="poll">
      <h1 v-text="poll.title"></h1>
      <h3>Created at: {{poll.createdAt | formatDate}}</h3>
      <div class="options" v-for="option, index in poll.options">
          <label v-bind:for="option._id" >
            <div class="poll-item" v-on:click="picked = option._id" :class="{active: picked == option._id }">
              <div class="color-box" :style="{background: option.color, borderRadius: '100%'}"></div>
            {{option.text}}
            </div>
          </label>
          <input v-bind:style='{display: "none"}' type="radio"  v-bind:value="option._id" v-bind:id="option._id">
      </div>
      <div class="right"><button v-on:click.once="getData" >Submit</button></div>
      </div>
    </template>
    <template v-if="toShow() == 'showResult'">
      <div class="result" >
        <h1>{{poll.title}}</h1>
        <h3>Created at: {{poll.createdAt | formatDate}}</h3>
        <h3 v-if="expired" v-bind:style="{color: 'red'}">This poll had expired</h3>
          <div class="result-container">
            <div class="result-options">
              <template v-for='(option, index) of poll.options'>
                <div class="poll-option">
                  <div class="color-box" :style="{background: option.color, borderRadius: '100%'}">
                  </div>
                  <p>{{option.text}}</p>
                </div>
              </template>
            </div>
              <div class="result-chart">
            <div class="result-bar">
              <template v-for='(option, index) of poll.options'>
                <div class="poll-bar" v-bind:style="{height: option.count+'%', width: '20px', background: option.color}"></div>
              </template>
          </div>
          <div class="result-count">
            <template v-for='(option, index) of poll.options'>
              <div class="poll-bar">{{option.count}}</div>
            </template>
        </div>
        </div>
          </div>
      </div>
    </template>
    </div>

    <div class="container center">
      <h2>Share this poll</h2>
      <div class="utility addthis_inline_share_toolbox">
      </div>
    </div>
  </content>

</template>

<script>
export default {
  name: 'polldetails',
  data(){
    return {
      poll: {
          title: '',
          createdAt: '',
          options: {},
          count: '',
          expiration:'',
      },
      picked: "",
      cookie: null,
      expired: false,
    }
  },
  filters: {
    formatDate: function(date) {
      console.log(date)
      return date.split('T')[0]
    }
  },
  methods: {
    fetchPoll: function(id) {
      this.$http.get('https://radiant-tor-19365.herokuapp.com/poll/'+id).then(
        function(response){
          this.poll = response.body
          this.cookie = this.$cookie.get(this.poll._id)
          if (this.poll.expiration) {
            let created = new Date(this.poll.createdAt)
            let expired = new Date(this.poll.expiration)
            // console.log( parseInt( (expired.getTime() - created.getTime() )/1000/60/60/24) )
            if ( parseInt( (expired.getTime() - created.getTime() )/1000/60/60/24) <= 0) {
              this.expired = true
            }
          }
          console.log(this.poll)
          }, function(response){
          console.log('something wrong')
        })
      },
    toShow: function(){
      return this.cookie === null ? 'showPoll' : 'show'
    },

    getData: function() {
      this.$http.put('https://radiant-tor-19365.herokuapp.com/poll/'+this.poll._id, {optionId: this.picked}).then(function(response){
        this.poll = response.body
        this.$cookie.set(response.body._id, 'voted', 9999)
        this.cookie = 'voted'
      }, function(response){
        console.log('something wrong')
      })
    }
  },
    created: function(){
        this.fetchPoll(this.$route.params.id)
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
  $shadow-up: 0px 0px 4px 0px $black

  h1
    text-align: center
    word-break: break-all
  h3
    text-align: right

  button
    border: 0
    outline: 0
    margin: 0
    padding: 20px
    color: #fff
    background: $green
  .active
    font-size: 20px
    font-weight: bold
    box-shadow: $shadow-up
  .center
    text-align: center
  .utility
    padding: 20px 0
  .container
    font-family: 'Open Sans', sans-serif
    max-width: 790px
    width: 90%
    margin: 30px auto
    border: 1px solid $black
    box-shadow: $shadow-up

    .poll, .result
      width: 80%
      margin: 0 auto
      .poll-item
        border: 1px solid $black
        margin: 2px auto
        display: flex
        align-items: center
        padding: 20px
        transition: all 0.3s ease-in
        &:hover
          box-shadow: $shadow-up
          cursor: pointer



  .color-box
    min-width: 20px
    min-height: 20px
    margin-right: 10px
  .result-container
    font-family: 'Open Sans', sans-serif
    display: flex
    flex-direction: column
    align-items: flex-end
    margin: 30px auto
    @media screen and (min-width: 768px)
      flex-direction: row
    .poll-option
      display: flex
      align-items: center
      width: 100%
      p
        margin: 10px 10px 5px
    .result-options
      width: 100%
      @media screen and (min-width: 768px)
        width: 50%
    .result-chart
      width: 100%
      @media screen and (min-width: 768px)
        width: 50%
    .result-bar, .result-count
      display: flex
      justify-content: space-around
      width: 100%
      margin-bottom: 10px
      align-items: flex-end
    .result-bar
      height: 200px
  .right
    text-align: right
    max-width: 790px
    width: 100%
    padding: 20px 0
    margin: 0 auto






</style>
