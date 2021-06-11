<template>
  <div class="">

    <!--   Header   -->

    <table class="table-sm">
      <thead>
      <tr>
        <th>Datum</th>
        <th>Potravina</th>
        <th>Mnozstvi</th>
        <th>Energie</th>
        <th class="button-smybol"></th>
        <th class="button-smybol"></th>
      </tr>
      </thead>
      <tbody>

      <!--   Add food entry   -->

      <tr>
        <td><input type="date" v-model="$root.$data.newFoodEntry.date"/></td>
        <td>
          <Searchbox :initial-item="$root.$data.newFoodEntry.food" :items="$root.$data.foods"
                     @itemSelected="newFoodSelected"></Searchbox>
        </td>
        <td><input type="number" v-model="$root.$data.newFoodEntry.amount"/></td>
        <td>{{ $root.$data.newFoodEntry.getTotalCalories() }}</td>
        <td><input type="button" class="btn btn-outline-primary" @click="addFoodEntry" value="+"/></td>
      </tr>

      <template v-for="foodEntry in this.$root.$data.foodEntries">

      <!--        New day -->

        <tr v-if="!isSameFoodEntryDate(foodEntry)" :key="foodEntry.date">
          <td colspan="4">
            Novy den
          </td>
        </tr>

        <!--        Food entry -->

        <tr v-if="!foodEntry.isEdit" :key="foodEntry.id">
          <td>{{foodEntry.date}}</td>
          <td>{{foodEntry.food.name}}</td>
          <td>{{foodEntry.amount}}</td>
          <td>{{foodEntry.getTotalCalories()}}</td>
          <td>
            <input type="button" class="btn btn-outline-primary" @click="foodEntry.isEdit = true" value="E"/>
          </td>
        </tr>
        <tr v-else :key="foodEntry.id">
          <td><input type="date" v-model="foodEntry.date"/></td>
          <td>
            <Searchbox :initial-item="foodEntry.food" :items="$root.$data.foods"
                       @itemSelected="existingFoodChanged(foodEntry, $event)"></Searchbox>
          </td>
          <td><input type="number" v-model="foodEntry.amount"/></td>
          <td>{{ foodEntry.getTotalCalories() }}</td>
          <td>
            <input type="button" class="btn btn-outline-primary" @click="saveFoodEntry(foodEntry)" value="S"/>
          </td>
          <td>
            <input type="button" class="btn btn-outline-primary" @click="removeFoodEntry(foodEntry)" value="-"/>
          </td>
        </tr>
      </template>

      </tbody>
    </table>


  </div>
</template>

<script>

import ItemTemplate from "@/components/ItemTemplate";
import Searchbox from "@/components/Searchbox";
import FoodEntryList from "@/domain/FoodEntryList";
import FoodEntry from "@/domain/FoodEntry";
import foodConnector from "@/connector/FoodConnector";

export default {
  name: 'Menu',
  components: {Searchbox},
  data: function () {
    return {
      editFoodEntriesDate: null,
    }
  },
  methods: {
    newFoodSelected(food) {
      console.log('newFoodSelected', food)
      this.$root.$data.newFoodEntry.food = food;
    },
    existingFoodChanged(foodEntry, food) {
      foodEntry.food = food;
    },
    async addFoodEntry() {
      console.log('addFoodEntry')
      const foodEntry = new FoodEntry();
      Object.assign(foodEntry, this.$root.$data.newFoodEntry)
      this.$root.$data.foodEntries.push(foodEntry);
      FoodEntryList.sortByDateDesc(this.$root.$data.foodEntries);
      foodEntry.id = await foodConnector.postFoodEntry(foodEntry);
    },
    removeFoodEntry(foodEntry) {
      console.log('removeFoodEntry', foodEntry)
      const index = this.$root.$data.foodEntries.indexOf(foodEntry);
      if (index > -1) {
        this.$root.$data.foodEntries.splice(index, 1);
      }
      foodConnector.removeFoodEntry(foodEntry);
    },

    saveFoodEntry(foodEntry) {
      console.log('saveFoodEntry', foodEntry)
      foodConnector.postFoodEntry(foodEntry);
      foodEntry.isEdit = false;
    },
    isSameFoodEntryDate(foodEntry) {
      const index = this.$root.$data.foodEntries.indexOf(foodEntry);
      if (index === 0) {
        return false;
      } else {
        return this.$root.$data.foodEntries[index - 1].date === foodEntry.date;
      }
    }
  },
  mounted() {
    console.log(this.$root.$data.test)

    console.log(this.$root.$data.my++)
  }
}
</script>

<style>
.button-smybol {
  width: 2em;
}
</style>