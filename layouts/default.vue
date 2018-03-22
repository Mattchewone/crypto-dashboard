<template>
  <v-app dark>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'default-layout',
    data() {
      return {
        title: 'Crypto Dashboard'
      }
    }
  }
</script>
