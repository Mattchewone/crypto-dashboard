<template>
  <main class="portfolios">
    <section>
      <span class="coin-heading">Current Prices:</span>
      <CoinList :items="currentPrices" />
    </section>

    <br>

    <section>
      <v-layout row wrap>
        <span class="portfolio-heading">Portfolios:</span>

        <PortfolioList :portfolios="portfolios">

          <PortfolioItem
            slot-scope="{ portfolio }"
            :item="portfolio"
            @remove="handleDelete"
            @edit="handleEdit"
            :currencies="currentPrices" />

        </PortfolioList>
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
          {{ currentPortfolio && currentPortfolio._id ? 'Edit' : 'Create' }} Portfolio
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="closeModal">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container card grid-list-md style="padding: 5px;">
        <PortfolioForm
          v-if="showModalForm"
          :copyOfItem="currentPortfolio"
          @save="handleSave">
        </PortfolioForm>
      </v-container>
    </v-dialog>
  </main>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import CoinList from '~/components/Coins/CoinList'
import PortfolioList from '~/components/Portfolio/PortfolioList'
import PortfolioItem from '~/components/Portfolio/PortfolioItem'
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
      findPortfoliosInStore: 'find',
      copyOfCurrent: 'getCopy'
    }),

    portfolios () {
      const response = this.findPortfoliosInStore({ query: {} })
      if (response.total > 0) {
        return response.data
      } else {
        return this.defaultPortfolio
      }
    },

    currentPortfolio () {
      return this.copyOfCurrent || {}
    }
  },
  methods: {
    ...mapActions('portfolios', {
      createPortfolio: 'create',
      patchPortfolio: 'patch',
      removePortfolio: 'remove'
    }),
    ...mapMutations('portfolios', {
      setCopy: 'setCurrent',
      clearCopy: 'clearCurrent'
    }),

    openModal () {
      this.isModalOpen = true
      this.showModalForm = true
    },

    handleSave (item) {
      if (item._id) {
        this.patchPortfolio([item._id, item, {}])
      } else {
        this.createPortfolio(item)
      }
      this.closeModal()
    },

    handleDelete (item) {
      if (item._id) {
        this.removePortfolio(item._id)
      }
    },

    handleEdit (item) {
      this.setCopy(item)
      setTimeout(() => {
        this.openModal()
      }, 200)
    },

    closeModal () {
      this.isModalOpen = false
      this.clearCopy()
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
    PortfolioItem,
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

  .portfolios {
    padding-bottom: 50px;
  }
</style>
