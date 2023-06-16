<template>
  <div>
    <sm-item-tracker
      format="pause"
      :inventory="scaled_inventory"
      :width="512"
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
  data() {
    return {
      inventory: {},
      locations: {},
      locations_visited: {},
      sequence_break: {},
    }
  },
  computed: {
    location_groups() {
      const groups = {
        completed: [],
        available: [],
        unavailable: [],
      }
      Object.entries(this.locations).forEach(([location, available]) => {
        if (this.locations_visited[location]) {
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
      const inventory = { ...this.inventory }
      const packs = ['missile', 'super-missile', 'power-bombs']
      packs.forEach((slug) => (inventory[slug] = (inventory[slug] || 0) * 5))
      return inventory
    },
  },
  methods: {
    addItem(slug, quantity) {
      this.inventory[slug] = (this.inventory[slug] || 0) + quantity
      this.inventory[slug] = Math.max(0, this.inventory[slug])
      this.refetch()
    },
    toggleItem(slug) {
      this.inventory[slug] = !this.inventory[slug]
      this.refetch()
    },
    refetch() {
      const { inventory } = this
      axios.post('/api/solve/', { inventory }).then((r) => (this.locations = r.data.locations))
    },
    clickLocation(location) {
      this.locations_visited[location] = !this.locations_visited[location]
    },
  },
}
</script>
