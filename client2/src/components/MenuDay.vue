<template>
  <div v-frag>
    <tr @click="toggleExpand()">
      <td>{{ date }}</td>
      <td></td>
      <td></td>
      <td>{{ totalCalories }}</td>
      <td></td>
    </tr>
    <template v-if="expand">
      <tr v-for="foodEntry in foodEntriesFiltered" :key="foodEntry.id">
        <template>
          <td><input class="form-control form-control-sm" type="date" v-model="foodEntry.date"/></td>
          <td><Searchbox :initial-item="foodEntry.food"/></td>
          <td><input class="form-control form-control-sm" type="number" v-model="foodEntry.amount"></td>
          <td>{{ foodEntry.getTotalCalories() }}</td>
          <td><input class="btn  btn-outline-primary btn-sm" type="button" value="-" @click="removeFoodEntry(foodEntry)"></td>

        </template>


      </tr>
    </template>
  </div>
</template>

<script>
import Searchbox from "@/components/Searchbox";
import foodConnector from "@/connector/FoodConnector";

export default {
  components: {Searchbox},
  props: {
    foodEntries: null,
    date: null,
  },
  data: function () {
    return {
      expand: false,
      edit: false,
    }
  },
  computed: {
    foodEntriesFiltered: function () {
      console.log('foodEntriesCopy');
      return this.foodEntries.filter(foodEntry => foodEntry.date === this.date);
    },
    totalCalories: function () {
      console.log('totalCalories');
      let total = 0;
      this.foodEntriesFiltered.forEach(f => total += f.getTotalCalories());
      return total;
    },
  },
  methods: {
    toggleExpand() {
      console.log('toggleExpand', this.expand)
      this.expand = !this.expand;
    },
    removeFoodEntry(foodEntry) {
      console.log('removeFoodEntry', foodEntry)
      const index = this.$root.$data.foodEntries.indexOf(foodEntry);
      if (index > -1) {
        this.$root.$data.foodEntries.splice(index, 1);
      }
      foodConnector.removeFoodEntry(foodEntry);
    },
  }
}
</script>

<style>

</style>