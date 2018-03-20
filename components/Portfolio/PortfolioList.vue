<template>
  <v-flex xs12>
    <v-expansion-panel popout expand>
      <PortfolioItem
        v-for="portfolio in portfolios"
        :key="portfolio.name"
        :item="portfolio"
        :currencies="currencies" />
    </v-expansion-panel>
  </v-flex>
</template>

<script>
import PortfolioItem from './PortfolioItem'

export default {
  name: 'portfolio-list',
  props: {
    portfolios: {
      type: Array,
      required: true
    },
    currencies: {
      type: Array,
      required: true
    }
  },
  components: {
    PortfolioItem
  }
}
</script>
