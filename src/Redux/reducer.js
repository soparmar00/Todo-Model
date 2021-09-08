import { ADD_TODO } from "./action"

const initialState = {
    todoData: [],
}

 const todos = (state=initialState, action) => {
     
    switch(action.type) {

        case ADD_TODO:
            return{
                ...state,
                tasks: initialState.tasks,
                todoData: [...state.todoData, action.payload],
            }

        default:
            return state;
    }
}

export default todos