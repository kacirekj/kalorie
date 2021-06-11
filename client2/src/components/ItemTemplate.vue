<template>
  <div>
    <b>#{{item.id}}</b>
    <span>hhhh {{ item.name }}</span>
    <abbr>{{item.description}}</abbr>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>

<style>

</style>