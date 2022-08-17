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
    },
  },
  mounted() {
    this.$axios.get('https://geoapi.pt/distritos/municipios?json=1')
    .then((response) => {
      console.log(response.data)
    })
    .catch(() => {
    })
  },
}
</script>

<style>

</style>