<template>
  <div>
    <taskInput></taskInput>
    <taskList></taskList>
    <counter></counter>
  </div>
</template>

<script>
import taskInput from "~/components/task_input.vue";
import taskList from "~/components/task_list.vue";
import counter from "~/components/counter.vue";

export default {
  components: {
    taskInput,
    taskList,
    counter
  }
};
</script>
