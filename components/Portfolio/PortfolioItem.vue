<template>
  <v-expansion-panel-content>
    <div slot="header">{{ item.name }} <span class="portfolio-total">${{ total }} ({{ pl }}%)</span></div>
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
        { text: 'Currency', value: 'symbol' },
        { text: 'Amount', value: 'amount' },
        { text: 'Purchase Price', value: 'purchasePrice' },
        { text: 'Current Value', value: 'total', sortable: false },
        { text: 'P/L', value: 'pl', sortable: false }
      ]
    }
  },
  computed: {
    total () {
      const { currencies } = this
      return this.item.currencies.reduce((total, item) => {
        const currentCurrency = currencies.find(cur => cur.symbol === item.symbol)
        if (currentCurrency) {
          total += (currentCurrency.price_usd * item.amount)
        }
        return total
      }, 0).toFixed(2)
    },

    totalPurchase () {
      const { currencies } = this
      return this.item.currencies.reduce((total, item) => {
        if (item.purchasePrice) {
          total += (item.amount * item.purchasePrice)
        }
        return total
      }, 0)
    },

    pl () {
      const { total, totalPurchase } = this
      if (totalPurchase) {
        const increase = (total - totalPurchase)
        const percent = ((increase / totalPurchase) * 100).toFixed(1)
        return parseFloat(percent)
      }
      return 0
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
