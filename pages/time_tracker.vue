<template>
  <div class="c-app-container d-flex w-100 justify-content-center align-items-center">
    <div class="w-50 p-5">
      <taskInput></taskInput>
      <taskList v-if="tasks[0] !== undefined"></taskList>
      <counter></counter>
    </div>
  </div>
</template>

<script>
import taskInput from "~/components/task_input.vue";
import taskList from "~/components/task_list.vue";
import counter from "~/components/counter.vue";

export default {
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    taskInput,
    taskList,
    counter
  }
};
</script>

<style lang="css" scoped>
.c-app-container {
  min-height: 100vh;
}
</style>
