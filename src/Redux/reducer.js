import { ADD_TODO, DELETE_TODO, EDIT_TODO, SET_TASK, COMPLETE_TODO, SELECT_TODO, COPY_TODO, UNCOMPLETED, REMOVE_UNC, COMPLETE_DATE} from "./action"

const initialState = {
    todoData: [],
    tasks: {title: '', dis: ''},
    complete: [],
    select: {},
    date: [],
    undate: []
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
                ...state,
                todoData: state.todoData.filter((data) => !(action.payload.includes(data.id))),
            }
            
        case SELECT_TODO: 
            return {
                ...state,
                select: action.payload
            }
        
        case COMPLETE_TODO: 
            return {
                ...state,
                complete: [...state.complete, ...action.payload.comD],
            }

        case COPY_TODO: 
            return {
                ...state,
                todoData: [...state.todoData, ...action.payload]
            }

        case UNCOMPLETED:
            return {
                ...state,
                todoData: [...state.todoData, ...action.payload]
            }

        case REMOVE_UNC: 
            return{
                ...state,
                complete: state.complete.filter((data) => !(action.payload.includes(data.id))),
            }

         case COMPLETE_DATE: 
            return{
                ...state,
               date: [...state.date, action.payload]
            }

        default:
            return state;
    }
    
}

export default todos