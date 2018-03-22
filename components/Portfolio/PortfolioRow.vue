<template>
  <tr>
    <td class="text-xs-left">{{ item.symbol }}</td>
    <td class="text-xs-left">{{ item.amount }}</td>
    <td class="text-xs-left">${{ item.purchasePrice }}</td>
    <td class="text-xs-left">${{ total }}</td>
    <td class="text-xs-left">{{ pl }}%</td>
  </tr>
</template>

<script>
export default {
  name: 'portfolio-row',
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
  computed: {
    total () {
      const { currencies, item } = this

      const coin = currencies.find(currency => currency.symbol === item.symbol)
      if (coin) {
        return Math.abs((coin.price_usd * item.amount).toFixed(2))
      } else {
        return 0
      }
    },

    pl () {
      const { item, total } = this
      if (!item.purchasePrice) {
        return 0
      }
      const purchasedTotal = (item.amount * item.purchasePrice)
      const increase = (total - purchasedTotal)
      const percent = ((increase / purchasedTotal) * 100).toFixed(1)
      return parseFloat(percent)
    }
  }
}
</script>
