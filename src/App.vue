<template>
  <div class="py-20 flex items-center justify-center" :class="noScroll">
    <div class="w-[500px] bg-white rounded-lg overflow-hidden relative">
      <header class="py-5 px-8 border-b-2 border-state-900">
        <h1 class="text-center text-2xl font-bold">Todo</h1>
      </header>
      <main class="px-8 py-5">
        <h2 class="text-xl font-bold mb-10">Tasks</h2>
        <ul class="">
          <li
            v-for="task in tasks"
            :key="task.id"
            class="flex items-center text-xl mb-5 relative w-full"
          >
            <button
              @click="addCompletedTask(task)"
              class="
                w-7
                h-7
                rounded-[50%]
                border-2 border-black
                mr-5
                cursor-pointer
                hover:bg-teal-800
                ease-in
                duration-200
              "
            ></button>
            <div
              @click="openModal(task)"
              class="
                text-ellipsis
                w-full
                max-w-[340px]
                overflow-hidden
                max-h-[28px]
                cursor-pointer
              "
            >
              {{ task.name }}
            </div>

            <button
              @click="deleteTask(task)"
              class="h-5 w-5 absolute right-0 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
        <div>
          <form @submit.prevent="submit" class="mt-8 ml-[0.41rem]">
            <button
              type="submit"
              class="text-xl font-bold mr-5 focus:outline-none"
            >
              +
            </button>
            <input
              maxlength="200"
              type="text"
              placeholder="Add task"
              v-model="task"
              class="
                placeholder:text-xl placeholder:text-state-500
                text-xl
                p-2.5
                focus:outline-none
                rounded-2xl
                max-w-xs
                w-full
              "
            />
            <p class="text-right">{{ taskLength }}</p>
          </form>
        </div>
      </main>

      <footer
        v-show="completedTasksShow"
        class="mt-auto border-t-2 border-state-900 w-full px-5 py-8"
      >
        <div class="relative">
          <h2 class="text-xl font-bold mb-10">Completed</h2>
          <button
            @click="deleteAllCompletedTask"
            class="h-5 w-5 absolute right-0 top-0 focus:outline-none"
          >
            <svg
              class="fill-slate-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul class="">
          <li
            v-for="task in completedTasks"
            :key="task.id"
            class="flex items-center text-xl mb-5 relative w-full"
          >
            <button
              @click="deleteCompletedTask(task)"
              @mouseenter="colorCheck"
              @mouseleave="colorCheck"
              class="w-7 h-7 mr-5 cursor-pointer focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-teal-800 hover:text-black ease-in duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <div class="text-ellipsis w-full max-w-[340px] overflow-hidden">
              {{ task.name }}
            </div>
          </li>
        </ul>
      </footer>
    </div>
  </div>
  <Teleport to="body">
    <TextModal :text="taskText" v-show="taskText" @closeModal="closeModal" />
  </Teleport>
</template>

<script>
import TextModal from "@/components/TextModal.vue";
export default {
  components: {
    TextModal,
  },
  data() {
    return {
      task: "",
      taskText: "",
      tasks: this.$store.state.tasks,
      completedTasks: this.$store.state.completedTasks,
      noScroll: false,
    };
  },
  methods: {
    submit() {
      if (this.task.length) {
        const task = {
          name: this.task,
          id: this.$store.state.tasks.length + 1,
        };
        this.$store.commit("CREATE_TASK", task);
        this.task = "";
      }
    },
    openModal(task) {
      this.taskText = task.name;
      this.noScroll = true;
    },
    closeModal() {
      this.taskText = "";
      this.noScroll = false;
    },
    deleteTask(task) {
      this.$store.commit("DELETE_TASK", task);
    },
    addCompletedTask(task) {
      this.$store.commit("ADD_COMPLETED_TASK", task);
    },
    deleteCompletedTask(task) {
      this.$store.commit("DELETE_COMPLETED_TASK", task);
    },
    deleteAllCompletedTask(completedTasks) {
      this.$store.commit("DELETE_ALL_COMPLETED_TASKS", completedTasks);
    },
  },
  computed: {
    taskLength() {
      return this.task.length > 0 ? this.task.length + "/200" : "";
    },
    completedTasksShow() {
      return this.completedTasks.length > 0 ? true : false;
    },
    noScroll() {
      return (this.noScroll = false ? "overflow-y-hidden" : "");
    },
  },
};
</script>
