<template lang="html">
  <div class="container">
    <h1>This is a Vue frontend</h1>
    <p v-html='message'></p>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      message: `<p>A simple frontend project for Free Code Camp Poll project
      Backend is Node.js, Express and Mongoose(mongodb). There are alot of
      functionalities such as user authentication, poll modification, delete,
      etc. not yet implemented.</p>

      <p>The bar chart is done with simple CSS, one day when this site gets famous and popular, I will
      figure out a way to generate real charts. Currently each option will only
      take 100 votes before the chart displaying funny...</p>`,
    }
  },
}
</script>

<style lang="sass" scoped>
  .container
    font-family: 'Open Sans', sans-serif
    width: 100%
    max-width: 790px
    margin: 0 auto
    h1
      text-align: center
    p
      padding: 0 10px
      font-size: 120%
      &::first-letter
        text-transform: uppercase
        font-size: 140%
        font-weight: 700

</style>
