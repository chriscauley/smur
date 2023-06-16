<template>
  <div>
    <sm-item-tracker
      format="pause"
      :inventory="inventory"
      :width="512"
      @add-item="addItem"
      @toggle-item="toggleItem"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { inventory: {} }
  },
  computed: {},
  methods: {
    addItem(slug, quantity) {
      this.inventory[slug] = (this.inventory[slug] || 0) + quantity
      this.inventory[slug] = Math.max(0, this.inventory[slug])
    },
    toggleItem(slug) {
      this.inventory[slug] = !this.inventory[slug]
    },
  },
}
</script>
