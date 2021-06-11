<template>
  <div class="container" id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/">Zaznamy</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about">Potraviny</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
import foodConnector from "@/connector/FoodConnector";
import FoodEntryList from "@/domain/FoodEntryList";

export default {
  name: 'App',
  components: {},
  data: function () {
    return {
    }
  },
  methods: {
    fetch: function () {
      console.log(this.my++);
    },
    getLabel(item) {
      return item.name
    },
    updateItems() {
      this.items.push(this.item)
    }
  },
  async created() {
    if (!this.$root.my) {
      this.$root.my = 0;
    }
    console.log('root');
    this.$root.$data.foods = await foodConnector.getFoodByIdContaining('');
    this.$root.$data.foodEntries = await foodConnector.getFoodEntries();
    FoodEntryList.sortByDateDesc(this.$root.$data.foodEntries);
  }
}
</script>

<style>

body {
  min-height: 75rem;
  padding-top: 4.5rem;
}
</style>
