<template>
  <h2>{{user.name}}</h2>
  <h3>ASD</h3>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
}
</script>

<style>

</style>