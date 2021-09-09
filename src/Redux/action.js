export const ADD_TODO = "ADD_TODO"
export const SET_TASK = "SET_TASK"
export const EDIT_TODO = "EDIT_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const COMPLETE_TODO = "COMPLETE_TODO"
export const SELECT_TODO = "SELECT_TODO"

export const addTodo = (payload) => {
    localStorage.setItem('Create at', payload.create)
    return {
        type: ADD_TODO,
        payload
}}

export const setTask = (payload) => {
    localStorage.setItem('Edit at', payload.edit)
    return{
        type: SET_TASK, 
     payload
    }
}

export const editTodo = (payload) => {
    return{
        type: EDIT_TODO, 
        payload
    }
}

export const deleteTodo = (payload) => {
    return {
        type: DELETE_TODO,
        payload
    }
}

export const CompleteTodo = (payload) => {
    return{
        type: COMPLETE_TODO,
        payload
    }
}

export const selectTodo = (payload) => {
    return{
        type: SELECT_TODO,
        payload
    }
}
      