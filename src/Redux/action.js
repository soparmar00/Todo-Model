export const ADD_TODO = "ADD_TODO"
export const SET_TASK = "SET_TASK"
export const EDIT_TODO = "EDIT_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const COMPLETE_TODO = "COMPLETE_TODO"
export const SELECT_TODO = "SELECT_TODO"
export const COPY_TODO = 'COPY_TODO'
export const UNCOMPLETED = "UNCOMPLETE"
export const REMOVE_UNC = "REMOVE_UNC"

const old = []

export const addTodo = (payload) => {

    if(localStorage.getItem('Created At') == null)
    {localStorage.setItem('Created At', '[]');}

    const create = {'id':payload.id, 'create':payload.create}
    old.push(create)
    
    localStorage.setItem('Created At',JSON.stringify(old))

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

    if(localStorage.getItem('Completed At') == null)
    {localStorage.setItem('Completed At', '[]');}

    const old = JSON.parse(localStorage.getItem('Completed At'))
   const completed = payload.comD.map((data) => {
        return ({ 'id': data.id, 'complete': data.complete})
    }) 
    old.push(completed)
    
    localStorage.setItem('Completed At',JSON.stringify(old))
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

    const create = payload.map((data) => {
        return ({ 'id': data.id, 'create': data.create})
    }) 
    old.push(create)
    
    localStorage.setItem('Created At',JSON.stringify(old))
    
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