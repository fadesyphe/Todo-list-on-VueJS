import Vue from 'vue'
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
		completedTasks: JSON.parse(localStorage.getItem('completedTasks') || '[]')
  },
  getters: {
    
  },
  mutations: {
		CREATE_TASK(state, task) {
			state.tasks.push(task)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},

		DELETE_TASK(state, task) {
			let idx = state.tasks.indexOf(task)
			state.tasks.splice(idx, 1);
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},

		ADD_COMPLETED_TASK(state, task) {
			let idx = state.tasks.indexOf(task)
			state.completedTasks.push(task)
			state.tasks.splice(idx, 1)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
			localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks))
		},

		DELETE_COMPLETED_TASK(state, task) {
			let idx = state.completedTasks.indexOf(task)
			state.tasks.push(task)
			state.completedTasks.splice(idx, 1)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
			localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks))
		},

		DELETE_ALL_COMPLETED_TASKS(state, completedTasks) {
			let idx = completedTasks.length
			state.completedTasks.splice(idx)
			localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks))
		}

	},
	actions: {

	}
})
