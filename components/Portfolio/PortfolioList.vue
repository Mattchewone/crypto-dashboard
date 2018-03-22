<template>
  <v-flex xs12>
    <v-expansion-panel popout expand>
      <slot v-for="portfolio in portfolios" :portfolio="portfolio"></slot>
    </v-expansion-panel>
  </v-flex>
</template>

<script>
export default {
  name: 'portfolio-list',
  props: {
    portfolios: {
      type: Array,
      required: true
    }
  }
}
</script>
