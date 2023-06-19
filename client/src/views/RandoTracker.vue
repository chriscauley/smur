<template>
  <div>
    <sm-item-tracker
      format="grid"
      :inventory="scaled_inventory"
      :width="400"
      @add-item="addItem"
      @toggle-item="toggleItem"
    />
    <div class="location-lists">
      <div v-for="(_locations, group) in location_groups" :key="group">
        <h2 class="h2">{{ group }}</h2>
        <div class="location-lists__list">
          <div
            v-for="location in _locations"
            :key="location"
            @click="clickLocation(location)"
            class="location-lists__item"
          >
            {{ location }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  __route: {
    path: '/rando/:world/:logic',
  },
  data() {
    return {
      locations: {},
      sequence_break: {},
    }
  },
  computed: {
    location_groups() {
      const groups = {
        available: [],
        completed: [],
        unavailable: [],
      }
      const { visited } = this.$store.local.state
      Object.entries(this.locations).forEach(([location, available]) => {
        if (visited[location]) {
          groups.completed.push(location)
        } else if (available) {
          groups.available.push(location)
        } else {
          groups.unavailable.push(location)
        }
      })
      return groups
    },
    scaled_inventory() {
      const inventory = { ...this.$store.local.state.inventory }
      const packs = ['missile', 'super-missile', 'power-bomb']
      packs.forEach((slug) => (inventory[slug] = (inventory[slug] || 0) * 5))
      return inventory
    },
  },
  mounted() {
    this.refetch()
  },
  methods: {
    addItem(slug, quantity) {
      const { inventory } = this.$store.local.state
      inventory[slug] = (inventory[slug] || 0) + quantity
      inventory[slug] = Math.max(0, inventory[slug])
      this.$store.local.save({ inventory })
      this.refetch()
    },
    toggleItem(slug) {
      const { inventory } = this.$store.local.state
      inventory[slug] = !inventory[slug]
      this.$store.local.save({ inventory })
      this.refetch()
    },
    refetch() {
      const { inventory } = this.$store.local.state
      const { world, logic } = this.$route.params
      const data = { inventory, logic, world }
      axios.post('/api/solve/', data).then((r) => (this.locations = r.data.locations))
    },
    clickLocation(location) {
      const { visited } = this.$store.local.state
      visited[location] = !visited[location]
      this.$store.local.save({ visited })
    },
  },
}
</script>
