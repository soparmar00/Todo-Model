export const ADD_TODO = "ADD_TODO"
export const SET_TASK = "SET_TASK"
export const EDIT_TODO = "EDIT_TODO"

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload
})

export const setTask = (payload) => ({
    type: SET_TASK, 
    payload
})

export const editTodo = (payload) => ({
    type: EDIT_TODO, 
     payload
})
      