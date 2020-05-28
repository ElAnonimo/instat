import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO_DONE
} from "../actions/types";
import { Reducer } from "redux";
import { ITask } from "../types";

interface ITodos {
  todos: ITask[]
}

const initialState: ITodos = {
  todos: []
};

const reducer: Reducer<ITodos> = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case ADD_TODO:
      return {
        ...state,
        todos: action.payload
      };
    case TOGGLE_TODO_DONE:
      return {
        ...state,
        todos: action.payload
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
