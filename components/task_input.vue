<template>
  <div>
    <form class="d-flex" v-if="taskActive === false">
      <input class="w-100 m-2 p-2" v-model="inputValue" type="text" placeholder="Your task" />
      <input class="btn btn-primary m-2" type="button" value="Start Timer" @click="startTask()" />
    </form>
    <div class="d-flex justify-content-between align-items-center" v-if="taskActive === true">
      <p class="h4 mb-1 align-self-center">{{taskName}}</p>
      <div class="d-flex">
      <p class="h5 align-self-center m-1 mr-5 font-weight-bolder">{{timer}}</p>
      <button class="btn btn-danger m-1 j-pause" @click="pauseTask()">Pause</button>
      <button class="btn btn-primary m-1" @click="stopTask()">Stop</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      inputValue: "",
      taskActive: false,
      taskPaused: false
    };
  },
  computed: {
    timer() {
      return this.$store.state.currentTask.currentTimer;
    },
    taskName() {
      return this.$store.state.currentTask.taskName;
    }
  },
  methods: {
    startTask() {
      this.$store.dispatch("START_TASK", this.inputValue);
      this.$store.dispatch("START_TIMER");
      this.inputValue = "";
      this.taskActive = true;
    },
    stopTask() {
      this.$store.dispatch("STOP_TIMER");
      this.taskActive = false;
    },
    pauseTask() {
      if (this.taskPaused === false) {
        this.taskPaused = true;
        this.$store.dispatch("PAUSE_TIMER");
        document.getElementsByClassName("j-pause")[0].innerHTML = "Continue";
      } else {
        this.taskPaused = false;
        this.$store.dispatch("START_TIMER");
        document.getElementsByClassName("j-pause")[0].innerHTML = "Pause";
      }
    }
  }
};
</script>
