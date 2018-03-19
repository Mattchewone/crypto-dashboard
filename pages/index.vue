<template>
  <main>
    <section>
      <span class="coin-heading">Current Prices:</span>
      <CoinList :items="currentPrices" />
    </section>

    <br>

    <section>
      <v-layout row wrap>
        <span class="portfolio-heading">Portfolios:</span>
        <PortfolioList :portfolios="portfolios" :currencies="currentPrices" />
      </v-layout>
    </section>

    <v-fab-transition>
      <v-btn fixed fab bottom right v-show="isCreateButtonVisible">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </main>
</template>

<script>
import axios from 'axios'
import CoinList from '~/components/Coins/CoinList'
import PortfolioList from '~/components/Portfolio/PortfolioList'

export default {
  name: 'dashboard-page',
  data () {
    return {
      currentPrices: [],
      isCreateButtonVisible: false,
      portfolios: [
        {
          name: 'Example',
          currencies: [
            { currency: 'BTC', amount: 1 },
            { currency: 'ETH', amount: 1.25 }
          ]
        }
      ]
    }
  },
  components: {
    CoinList,
    PortfolioList
  },
  asyncData () {
    return axios.get('https://api.coinmarketcap.com/v1/ticker?limit=4').then(res => {
      return { currentPrices: res.data }
    })
  },
  created () {
    setTimeout(() => {
      this.isCreateButtonVisible = true
    }, 250)
  },
}
</script>

<style>
  .portfolio-heading {
    padding-bottom: 10px;
  }

  .coin-heading {
    padding-bottom: 10px;
  }
</style>
