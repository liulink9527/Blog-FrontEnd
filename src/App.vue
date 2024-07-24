<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { generateMenu } from './assets/js/menu'
export default {
  created() {
    if (this.$store.state.userId != null) {
      generateMenu()
    }
    // 上传访客信息
    this.axios.post('/api/report')
  },

  methods: {},
}
</script>

<style></style>
