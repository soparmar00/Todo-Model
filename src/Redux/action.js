export const ADD_TODO = "ADD_TODO"
export const SET_TASK = "SET_TASK"
export const EDIT_TODO = "EDIT_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const COMPLETE_TODO = "COMPLETE_TODO"
export const SELECT_TODO = "SELECT_TODO"
export const COPY_TODO = 'COPY_TODO'
export const UNCOMPLETED = "UNCOMPLETE"
export const REMOVE_UNC = "REMOVE_UNC"
export const COMPLETE_DATE = "COMPLETE_DATE"


export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload
}}

export const setTask = (payload) => {
    return{
        type: SET_TASK, 
        payload
    }
}

export const editTodo = (payload) => {

    if(localStorage.getItem('Edited At') == null)
    {localStorage.setItem('Edited At', '[]');}

    const old = JSON.parse(localStorage.getItem('Edited At'))
    const edit = {'id':payload.id, 'edit':payload.edit}
    old.push(edit)
    
    localStorage.setItem('Edited At',JSON.stringify(old))

    return{
        type: EDIT_TODO, 
        payload
    }
}

export const deleteTodo = (payload) => {
    return {
        type: DELETE_TODO,
        payload: payload
    }
}

export const completeTodo = (payload) => {
    return {
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

export const copy_todo = (payload) => {
    return{
        type: COPY_TODO,
        payload
    }
}

export const uncomplete = (payload) => {
    return {
        type: UNCOMPLETED,
        payload
    }
}

export const removeUn = (payload) => {
    return {
        type: REMOVE_UNC,
        payload
    }
}

export const complete_Date = (payload) => {
    return {
        type: COMPLETE_DATE,
        payload
    }
}
