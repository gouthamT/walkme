import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { INITIALIZE_DATA } from './constants';

export const initializeData = (data) => ({
  type: INITIALIZE_DATA,
  data
});

const dataReducer = (state = { linksData: [] }, action) => {
  switch (action.type) {
    case INITIALIZE_DATA:
      return { ...state, linksData: [...action.data] };
    default: return state;
  }
};

const reducer = combineReducers({
  data: dataReducer,
});

export default (initialState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
