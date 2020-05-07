<template>
  <div>
    <p class="h2">Total time: <span class="h4 font-weight-normal">{{totalTime}}</span></p>
  </div>
</template>

<script>
export default {
  computed: {
    totalTime() {
      return this.$store.state.totalTime;
    }
  }
}
</script>
