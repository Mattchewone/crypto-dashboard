<template>
  <v-flex xs12>
    <v-expansion-panel popout expand>
      <v-expansion-panel-content v-for="portfolio in portfolios" :key="portfolio.name">
        <div slot="header">{{ portfolio.name }}</div>
        <v-card>
          <v-data-table
            :headers="headers"
            disable-initial-sort
            :items="portfolio.currencies"
            hide-actions>
            <template slot="items" slot-scope="props">
              <PortfolioItem :item="props.item" :currencies="currencies" />
            </template>
          </v-data-table>
        </v-card>
      </v-expansion-panel-content>
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
