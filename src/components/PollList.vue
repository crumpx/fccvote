<template lang="html">
    <div class="polls-list-container">
      <div class="popular">
        <h2>Most Popular</h2>
        <div class="item" v-for="item in lists.popular">
          <router-link v-bind:to="'/poll/'+item.shorturl">
            <div class="poll-img">
              <span>{{item.count?item.count:0}}</span>

            </div>
            <div class="poll-title">
              <h4>{{item.title}}</h4>
            </div>
          </router-link>
        </div>
      </div>

      <div class="latest">
        <h2>The Lastest</h2>
        <div class="item" v-for="item in lists.lastest">
          <router-link v-bind:to="'/poll/'+item.shorturl">
            <div class="poll-img">
              <span>{{item.count?item.count:0}}</span>
            </div>
            <div class="poll-title">
              <h4>{{item.title}}</h4>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'polllist',
  props: ['lists'],
  data() {
    return {

    }
  },
  methods: {
  },

  created: function(){

  }

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

  .polls-list-container
    font-family: 'Open Sans', sans-serif
    max-width: 790px
    width: 90%
    border: 0
    margin: 0 auto
    display: flex
    flex-direction: column

    justify-content: space-between
    @media screen and (min-width: 768px)
      flex-direction: row
    .popular,.latest
      h2
        color: $black
        text-align: center
      width: 90%
      margin: 0 auto
      box-sizing: border-box
      border: 0
      @media screen and (min-width: 768px)
        width: 48%

      .item
        border-radius: 5px
        padding: 10px
        margin: 10px auto
        width: 95%

        background: $white
        box-shadow: $shadow-down
        transition: all 0.4s ease
        &:hover
          box-shadow: $shadow-up
        a
          display: flex
          text-decoration: none
          color: $black
          .poll-img
            min-width: 80px
            height: 80px
            background: $blue
            border-radius: 100%
            position: relative
            span
              position: absolute
              left: 50%
              top: 50%
              transform: translate(-50%, -50%)
              color: $white
            img
              border-radius: 100%

          .poll-title
            width: 70
            overflow: hidden


            h4
              word-break: break-all
              padding-left: 20px
              margin: 0

</style>
