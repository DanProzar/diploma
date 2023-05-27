<script lang="ts">
export default {
  data () {
    return {
      count: 0,
    }
  },
  computed: {
    divided () {
      return 25 - this.count
    },
  },
  mounted () {
    console.log('Компонент успішно відренедився!')
  },
  methods: {
    addCount () {
      this.count += 1
    },
  },
}
</script>

<template>
  <div class="app">
    <h2>25 - {{ count }} = {{ divided }}</h2>
    <button @click="addCount">
      Кількість натискань: {{ count }}
    </button>
  </div>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
