<template>
  <div class="searchbox">
    <input type="text"
           class="form-control form-control-sm"
           v-model="text"
           @click="set('isFocusOnInput', true)"
           @blur="delayedSet('isFocusOnInput', false)"
           @keydown="onKaydown"/>
    <div class="card card-body searchbox-items" tabindex="0"
         @click="set('isFocusOnBox', true)"
         @blur="delayedSet('isFocusOnBox', false)"
         v-if="isFocusOnInput || isFocusOnBox">
      <table class="table">
        <tr v-for="item in items" :key="item.id">
          <td @click="onRowClick(item)">{{ item.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialItem: null,
    items: []
  },
  data: function () {
    return {
      text: 'A',
      isFocusOnInput: false,
      isFocusOnBox: false,
    }
  },
  methods: {
    onKaydown: function (text) {
      console.log('test', text)
    },
    onRowClick: function (item) {
      this.text = item.name;
      this.$emit('itemSelected', item)
    },
    set: function (property, value) {
        console.log('Set ' + property + ' to ' + value)
        this[property] = value;
    },
    delayedSet: function (property, value) {
      setTimeout(() => {
        console.log('Delayed V')
        this.set(property, value)
      }, 180)
    },
  },
  created() {
    if(this.initialItem) {
      this.text = this.initialItem.name;
    }
  }
}
</script>

<style>
.searchbox {
  /*width: 100%;*/
  position: relative;
  /*display: inline-block;*/
  /*background-color: blue;*/
  /*z-index: 100;*/
}

.searchbox-items {
  position: absolute;
  width: 100%;
  /*border-bottom: none;*/
  /*border-top: none;*/
  background-color: white;
  z-index: 100;
  /*position the autocomplete items to be the same width as the container:*/
  /*top: 100%;*/
  /*left: 0;*/
  /*right: 0;*/
}

</style>