<template>
  <div class="navbar">
    <div class="flex gap-4">
      <div>SMUR</div>
      /
      <div>Nature</div>
      /
      <unrest-dropdown :items="logic_items">
        <div class="link">{{ logic_text }}</div>
      </unrest-dropdown>
    </div>
    <div class="flex-grow" />
  </div>
</template>

<script>
import { startCase } from 'lodash'

export default {
  computed: {
    logic_text() {
      return startCase(this.$route.params.logic)
    },
    logic_items() {
      const { world } = this.$route.params
      return ['expert', 'casual'].map((logic) => ({
        text: startCase(logic),
        to: `/rando/${world}/${logic}/`,
      }))
    },
  },
}
</script>
