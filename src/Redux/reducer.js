import { ADD_TODO, EDIT_TODO, SET_TASK } from "./action"

const initialState = {
    todoData: [],
    tasks: {title: '', des: ''},
}

 const todos = (state=initialState, action) => {
     
    switch(action.type) {

        case ADD_TODO:
            console.log('reducer', action)
            return{
                ...state,
                tasks: initialState.tasks,
                todoData: [...state.todoData, action.payload],
            }

        case SET_TASK:
            return {
                ...state,
                tasks: { ...state.tasks, ...action.payload },
            }

        case EDIT_TODO:
            console.log('up', action)
            return{
               ...state,
                tasks: initialState.tasks,
                todoData: state.todoData.map((match) => {
                    if (match.id === action.payload.id) {
                    return { ...match, ...action.payload };
                 }
                return match;
                }),
            }
        default:
            return state;
    }
    
}

export default todos