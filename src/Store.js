import { createStore} from 'redux';
import rootrReducer from './Redux/rootReducer';

const store = createStore(rootrReducer);

export default store;