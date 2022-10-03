<template>
  <!-- <transition-group name="black-fear"> -->
    <div
      @click.self="closeModal"
      class="
        w-full
        h-screen
        top-0
        left-0
        fixed
        bg-black bg-opacity-80
        flex
        justify-center
        items-center
        z-50
      "
    >
      <div class="bg-white relative w-80 h-80 p-10 rounded-xl break-words">
        {{ text }}
        <button
          @click="closeModal"
          class="cursor-pointer absolute right-5 top-5 h-5 w-5 focus:outline-none"
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
      </div>
    </div>
  <!-- </transition-group> -->
</template>

<script>
export default {
  props: ["text"],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  emits: ["closeModal"],
};
</script>

<style scoped>
.black-fear-enter-active,
.black-fear-leave-active {
  transition: all 0.5s ease;
}
.black-fear-enter-from,
.black-fear-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>