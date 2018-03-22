<template>
  <v-form v-model="valid" ref="form" lazy-validation>

  <v-layout pa-2 row wrap>
    <v-flex xs12>
      <v-text-field
        label="Name"
        v-model="currentItem.name"
        :rules="nameRules"
        required>
      </v-text-field>
    </v-flex>

    <v-flex d-flex xs12 v-for="(i, key) in currentItem.currencies" :key="key">
      <v-layout row wrap>
        <v-flex d-flex xs4>
          <v-select
            :items="items"
            v-model="currentItem.currencies[key].symbol"
            label="Select a currency"
            single-line
            :rules="currencyRules"
            required>
          </v-select>
        </v-flex>

        <v-flex d-flex xs4>
          <v-text-field
            label="Currency"
            v-model="currentItem.currencies[key].amount"
            type="number"
            :rules="amountRules"
            required>
          </v-text-field>
        </v-flex>

        <v-flex d-flex xs4>
          <v-text-field
            label="Purchase Price"
            v-model="currentItem.currencies[key].purchasePrice"
            type="number">
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>

  </v-layout>
  <v-layout>
    <v-btn
      color="pink"
      dark
      small
      absolute
      right
      fab
      @click="addCurrency">
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
  <v-layout pa-4 row wrap>
    <v-flex xs12>
      <v-btn @click.stop.prevent="handleSave" type="submit" dark color="blue" depressed class="btn-right">Save</v-btn>
    </v-flex>
  </v-layout>

  </v-form>
</template>

<script>
export default {
  name: 'portfolio-form',
  data () {
    return {
      valid: true,
      currentItem: {
        name: '',
        currencies: [
          { symbol: '', amount: undefined }
        ]
      },
      nameRules: [
        v => !!v || 'Name is required'
      ],
      amountRules: [
        v => !!v || 'Amount is required'
      ],
      currencyRules: [
        v => Object.keys(v).length !== 0 || 'Currency is required'
      ],
      items: [
        'BTC',
        'ETH',
        'XRP',
        'BCH'
      ]
    }
  },
  methods: {
    handleSave () {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.currentItem)
      }
    },

    addCurrency () {
      this.currentItem.currencies.push({ symbol: '', amount: undefined })
    }
  }
}
</script>
