<template>
  <tr>
    <td class="text-xs-left">{{ item.currency }}</td>
    <td class="text-xs-left">{{ item.amount }}</td>
    <td class="text-xs-left">${{ value }}</td>
  </tr>
</template>

<script>
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
  computed: {
    value () {
      const currency = this.currencies.find(currency => currency.symbol === this.item.currency)
      return (currency.price_usd * this.item.amount).toFixed(2)
    }
  }
}
</script>
