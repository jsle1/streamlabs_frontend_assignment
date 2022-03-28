<template>
  <div>
    <img alt="melon logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'LivestreamMain',
  props: {
    msg: String
  }
}
</script>