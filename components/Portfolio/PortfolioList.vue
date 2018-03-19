<template>
  <v-flex xs12>
    <v-expansion-panel popout expand>
      <PortfolioItem v-for="portfolio in portfolios" :key="portfolio.name" :item="portfolio" :currencies="currencies">
      </PortfolioItem>
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
  data () {
    return {
      headers: [
        { text: 'Currency', value: 'currency' },
        { text: 'Amount', value: 'amount' },
        { text: 'Current Value', value: 'value', sortable: false }
      ]
    }
  },
  components: {
    PortfolioItem
  }
}
</script>
