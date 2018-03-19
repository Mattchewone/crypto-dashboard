<template>
  <v-container fluid grid-list-sm>
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      hide-actions
      :items="items">

      <Coin slot="item" slot-scope="props" :item="props.item" />

    </v-data-iterator>
  </v-container>
</template>

<script>
import Coin from './Coin'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    Coin
  }
}
</script>
