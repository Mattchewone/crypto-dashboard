<template>
  <main>
    <section>
      Current Prices:
      <CoinList :items="currentPrices" />
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import CoinList from '~/components/Coins/CoinList'

export default {
  data () {
    return {
      currentPrices: []
    }
  },
  components: {
    CoinList
  },
  asyncData () {
    return axios.get('https://api.coinmarketcap.com/v1/ticker?limit=4').then(res => {
      return { currentPrices: res.data }
    })
  }
}
</script>
