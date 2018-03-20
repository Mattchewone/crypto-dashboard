<template>
  <tr>
    <td class="text-xs-left">{{ item.symbol }}</td>
    <td class="text-xs-left">{{ item.amount }}</td>
    <td class="text-xs-left">${{ total }}</td>
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
      return (coin.price_usd * item.amount).toFixed(2)
    }
  }
}
</script>
