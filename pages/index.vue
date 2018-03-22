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
      <v-btn fixed fab bottom right v-show="isCreateButtonVisible" @click="openModal">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="isModalOpen" persistent max-width="800">
      <v-toolbar color="grey" dark>
        <v-toolbar-title>
          Create Portfolio
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="closeModal">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container card grid-list-md style="padding: 5px;">
        <PortfolioForm
          v-if="showModalForm"
          @save="handleSave">
        </PortfolioForm>
      </v-container>
    </v-dialog>
  </main>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import CoinList from '~/components/Coins/CoinList'
import PortfolioList from '~/components/Portfolio/PortfolioList'
import PortfolioForm from '~/components/Portfolio/PortfolioForm'

export default {
  name: 'dashboard-page',
  data () {
    return {
      currentPrices: [],
      isCreateButtonVisible: false,
      isModalOpen: false,
      showModalForm: false,
      defaultPortfolio: [
        {
          name: 'Example',
          currencies: [
            { symbol: 'BTC', amount: 1, purchasePrice: 8000.51 },
            { symbol: 'ETH', amount: 1.25, purchasePrice: 800.64 }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('portfolios', {
      findPortfoliosInStore: 'find'
    }),

    portfolios () {
      const response = this.findPortfoliosInStore({ query: {} })
      if (response.total > 0) {
        return response.data
      } else {
        return this.defaultPortfolio
      }
    }
  },
  methods: {
    ...mapActions('portfolios', {
      createPortfolio: 'create'
    }),

    openModal () {
      this.isModalOpen = true
      this.showModalForm = true
    },

    handleSave (item) {
      this.createPortfolio(item)
      this.closeModal()
    },

    closeModal () {
      this.isModalOpen = false
      setTimeout(() => {
        this.showModalForm = false
      }, 500)
    }
  },
  asyncData () {
    return axios.get('https://api.coinmarketcap.com/v1/ticker?limit=4').then(res => {
      return { currentPrices: res.data }
    })
  },
  fetch ({ store, params }) {
    return store.dispatch('portfolios/find', { query: {} })
  },
  components: {
    CoinList,
    PortfolioList,
    PortfolioForm
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
