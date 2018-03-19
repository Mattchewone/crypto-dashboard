<template>
  <v-flex
    xs12
    sm6
    md4
    lg3>

    <v-card>
      <v-card-title><h4>{{ item.name }}</h4></v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Price:</v-list-tile-content>
          <v-list-tile-content class="align-end">${{ parseFloat(item.price_usd).toFixed(2) }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>24hr Volume:</v-list-tile-content>
          <v-list-tile-content class="align-end">${{ parseFloat(item['24h_volume_usd']).toFixed(2) }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

  </v-flex>
</template>

<script>
export default {
  name: 'coin-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
