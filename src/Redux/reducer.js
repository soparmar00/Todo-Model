import { ADD_TODO, DELETE_TODO, EDIT_TODO, SET_TASK, COMPLETE_TODO } from "./action"

const initialState = {
    todoData: [],
    tasks: {title: '', dis: ''},
    create: localStorage.getItem('create'),
    edit: localStorage.getItem('edit'),
    complete: []
}

 const todos = (state=initialState, action) => {
     
    switch(action.type) {

        case ADD_TODO:
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

        case DELETE_TODO:
            return {
                todoData: state.todoData.filter((data) => data.id !== action.payload),
            }

        case COMPLETE_TODO:
            return {
                ...state,
                complete: [...state.complete, action.payload],
            }

        default:
            return state;
    }
    
}

export default todos