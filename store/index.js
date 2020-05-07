export const state = () => ({
  currentTask: {
    id: 0,
    taskName: "",
    currentTimer: "00:00:00"
  },
  tasks: [],
  timeInterval: "", //for resetting timer;
  totalTime: "00:00:00",
  s: 0,
  m: 0,
  h: 0
});
export const getters = {
  tasksOrder: state => {
    return state.tasks.slice().reverse();
  }
};
// MUTATIONS
export const mutations = {
  SET_NAME(state, name) {
    state.currentTask.taskName = name;
  },
  SET_TIMER(state, timer) {
    //for resetting timer
    state.timeInterval = timer;
  },
  INCREMENT_ID(state) {
    state.currentTask.id++;
  },
  START_TIMER(state) {
    state.s++;
    if (state.m === 60) {
      state.h++;
      state.m = 0;
    }
    if (state.s === 60) {
      state.m++;
      state.s = 0;
    }
    state.currentTask.currentTimer =
      String(state.h).padStart(2, "0") +
      ":" +
      String(state.m).padStart(2, "0") +
      ":" +
      String(state.s).padStart(2, "0");
  },
  STOP_TIMER(state) {
    clearInterval(state.timeInterval);
  },
  RESET_TIMER(state) {
    state.s = 0;
    state.m = 0;
    state.h = 0;
    state.currentTask.currentTimer = "00:00:00";
  },
  SAVE_TIME(state) {
    let archiveTask = {};
    state.tasks = [
      ...state.tasks,
      Object.assign(archiveTask, state.currentTask)
    ];
  },
  DELETE_TASK(state, id) {
    let taskIndex = state.tasks.findIndex(obj => obj.id === id);
    state.tasks.splice(taskIndex, 1);
  },
  TOTAL_TIME(state, id) {
    let timeSplit = state.totalTime.split(":");
    let s = Number(timeSplit[2]);
    let m = Number(timeSplit[1]);
    let h = Number(timeSplit[0]);
    if (id === undefined) {
      //conditional for when id is not passed (update after adding tasks)
      s = s + state.s;
      m = m + state.m;
      h = h + state.h;
      if (s >= 60) {
        s = s - 60;
        m = m + 1;
      }
      if (m >= 60) {
        m = m - 60;
        h = h + 1;
      }
    } else {
      let taskSplit = state.tasks
        .find(obj => obj.id === id)
        .currentTimer.split(":");
      s = s - Number(taskSplit[2]);
      m = m - Number(taskSplit[1]);
      h = h - Number(taskSplit[0]);
      if (s < 0) {
        s = Math.abs(s);
        m = m - 1;
      }
      if (m < 0) {
        m = Math.abs(m);
        h = h - 1;
      }
    }
    state.totalTime =
      String(h).padStart(2, "0") +
      ":" +
      String(m).padStart(2, "0") +
      ":" +
      String(s).padStart(2, "0");
  }
};
// ACTIONS
export const actions = {
  START_TASK(context, name) {
    context.commit("SET_NAME", name);
    context.commit("INCREMENT_ID");
  },
  START_TIMER(context, timer) {
    timer = setInterval(function() {
      context.commit("START_TIMER");
    }, 1000);
    context.commit("SET_TIMER", timer);
  },
  STOP_TIMER(context) {
    context.commit("STOP_TIMER");
    context.commit("SAVE_TIME");
    context.commit("TOTAL_TIME");
    context.commit("RESET_TIMER");
  },
  PAUSE_TIMER(context) {
    context.commit("STOP_TIMER");
  },
  DELETE_TASK(context, id) {
    context.commit("TOTAL_TIME", id);
    context.commit("DELETE_TASK", id);
  }
};
