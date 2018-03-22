<template>
  <div class="base-delete-button">
    <v-btn color="error" small @click="handleFirstDelete"><slot></slot></v-btn>

    <v-dialog v-model="isDeleteConfirmationVisible" max-width="340">
      <v-card>
        <v-card-title class="headline"><h4>Delete portfolio?</h4></v-card-title>
        <v-card-text>Are you sure you wish to delete this portfolio. <br>This cannot be undone.</v-card-text>
        <v-card-actions>
          <v-btn small color="primary" @click="isDeleteConfirmationVisible = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn small color="error" @click="handleConfirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'base-delete-button',
    data () {
      return {
        isDeleteConfirmationVisible: false
      }
    },
    props: {
      itemType: {
        type: String,
        required: true
      }
    },
    methods: {
      handleFirstDelete () {
        this.isDeleteConfirmationVisible = true
      },
      handleConfirmDelete () {
        this.$emit('delete')
      }
    }
  }
</script>

<style>
.base-delete-button {
  display: inline-block;
}
</style>
