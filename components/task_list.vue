<template>
  <div>
    <ul class="p-0">
      <li class="d-flex w-100 justify-content-between" v-for="task in tasksOrder" :key="task.index">
        <p class="m-2 align-self-center">{{task.taskName}}</p>
        <div class="d-flex">
          <p class="m-2 align-self-center">{{task.currentTimer}}</p>
          <button class="m-2 btn btn-outline-primary" @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
    <hr>
  </div>
</template>

<script>
export default {
  computed: {
    tasksOrder() {
      return this.$store.getters.tasksOrder;
    }
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch("DELETE_TASK", id);
    }
  }
};
</script>
