<template>
  <div>
    <table class="table table-sm table-light table-hover">
      <thead>
      <tr>
        <th class="table-date">Datum</th>
        <th>Potravina</th>
        <th class="table-amount">Mnozstvi</th>
        <th class="table-calories">Energie</th>
        <th class="table-calories">Akce</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input class="form-control form-control-sm" type="date" v-model="$root.$data.newFoodEntry.date"/></td>
        <td>
          <Searchbox :initial-item="$root.$data.newFoodEntry.food" :items="$root.$data.foods"
                     @itemSelected="newFoodSelected"></Searchbox>
        </td>
        <td><input class="form-control form-control-sm" type="number" step="20"
                   v-model="$root.$data.newFoodEntry.amount"/></td>
        <td>{{ $root.$data.newFoodEntry.getTotalCalories() }}</td>
        <td><input v-if="this.$root.$data.newFoodEntry.food.id" type="button" class="btn  btn-outline-primary btn-sm"
                   @click="addFoodEntry" value="+"/></td>
      </tr>

      <FoodEntryDay v-for="(foodEntries, date) in foodEntriesGroupedByDate" :key="date" :foodEntries="foodEntries"
                    :date="date"></FoodEntryDay>
      </tbody>
    </table>
  </div>
</template>

<script>

import Searchbox from "@/components/Searchbox";
import FoodEntryList from "@/domain/FoodEntryList";
import FoodEntry from "@/domain/FoodEntry";
import foodConnector from "@/connector/FoodConnector";
import FoodEntryDay from "@/components/MenuDay";

let previousFoodEntryDate = '1000-01-01';

export default {
  name: 'Menu',
  components: {FoodEntryDay, Searchbox},
  data: function () {
    return {
      editFoodEntriesDate: null,

    }
  },
  computed: {
    foodEntriesGroupedByDate: function () {
      return this.$root.$data.foodEntries.reduce((days, foodEntry) => {
            if(!days[foodEntry.date]) {
              days[foodEntry.date] = [];
            }
            days[foodEntry.date].push(foodEntry);
            return days;
          },
          {}
      )
    },
    allDate: function () {
      const dates = new Set()
      this.$root.$data.foodEntries.forEach(f => dates.add(f.date));
      return dates;
    },
    called: function () {
      console.log('Called!')
      return this.$root.$data.foodEntries[2].amount;
    },
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
      this.sortFoodEntries();
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
    editFoodEntry(foodEntry) {
      console.log('editFoodEntry', foodEntry)
      foodEntry.isEdit = true;
      this.sortFoodEntries()
    },
    saveFoodEntry(foodEntry) {
      console.log('saveFoodEntry', foodEntry)
      foodConnector.postFoodEntry(foodEntry);
      foodEntry.isEdit = false;
      this.sortFoodEntries()
    },
    editFoodEntryByDate(date) {
      console.log('editFoodEntryByDate', date)
      this.$root.$data.foodEntries
          .filter(foodEntry => foodEntry.date === date)
          .forEach(foodEntry => foodEntry.isEdit = true);
      this.sortFoodEntries();
    },
    saveFoodEntryByDate(date) {
      console.log('saveFoodEntryByDate', date)
      this.$root.$data.foodEntries
          .filter(foodEntry => foodEntry.date === date)
          .forEach(foodEntry => {
            foodConnector.postFoodEntry(foodEntry);
            foodEntry.isEdit = false
          })
      this.sortFoodEntries()
    },
    isEditForAtLeastOneByDate(date) {
      console.log('isEditForAtLeastOneByDate', date)
      for (let foodEntry of this.$root.$data.foodEntries) {
        if (foodEntry.date === date && foodEntry.isEdit) {
          return true;
        }
      }
      return false;
    },
    isSameFoodEntryDate(foodEntry) {
      let isSameFoodEntryDate = previousFoodEntryDate === foodEntry.date;
      previousFoodEntryDate = foodEntry.date;
      return isSameFoodEntryDate;
    },
    sortFoodEntries() {
      FoodEntryList.sortByDateDesc(this.$root.$data.foodEntries);
    },
    calculateFoodEntryCaloriesByDate: function (date) {
      let sum = 0;
      this.$root.$data.foodEntries
          .forEach(foodEntry => {
            if (foodEntry.date === date) {
              sum += foodEntry.getTotalCalories()
            }
          });
      return sum;
    }
  },
  mounted() {
    setInterval(() => {
      console.log(this.$root.$data.foodEntries[1].amount++);
    }, 4000);
  }
}
</script>

<style>

.table-date {
  width: 12em;
}

.table-food {
  width: 20em;
}

.table-amount {
  width: 6em;
}

.table-calories {
  width: 6em;
}

.table-buttons {
  width: 5em;
}


</style>