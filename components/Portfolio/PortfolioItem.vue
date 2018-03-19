<template>
  <v-expansion-panel-content>
    <div slot="header">{{ item.name }} <span class="portfolio-total">{{ total }}</span></div>
    <v-card>
      <v-data-table
        :headers="headers"
        disable-initial-sort
        :items="item.currencies"
        hide-actions>
        <template slot="items" slot-scope="props">
          <PortfolioRow :item="props.item" :currencies="currencies" />
        </template>
      </v-data-table>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import PortfolioRow from './PortfolioRow'

export default {
  name: 'portfolio-item',
  props: {
    item: {
      type: Object,
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
        { text: 'Total', value: 'total', sortable: false }
      ]
    }
  },
  computed: {
    total () {
      const { currencies } = this
      return this.item.currencies.reduce((total, item) => {
        const currentCurrency = currencies.find(cur => cur.symbol === item.currency)
        total += (currentCurrency.price_usd * item.amount)
        return total
      }, 0).toFixed(2)
    }
  },
  components: {
    PortfolioRow
  }
}
</script>


<style>
  .portfolio-total {
    float: right;
    padding-right: 20px;
  }
</style>
