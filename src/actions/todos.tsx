import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO_DONE
} from "./types";
import { Dispatch } from "redux";
import { ITask } from "../types";

const getLocalTodos = () => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

const addToLocalTodos = (todo: ITask) => {
  const localTodos = getLocalTodos();
  localTodos.push(todo);
  setLocalTodos(localTodos);
  return localTodos;
};

const setLocalTodos = (todos: ITask[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getTodos = () => (dispatch: Dispatch) => {
  try {
    const todos = getLocalTodos();

    dispatch({
      type: GET_TODOS,
      payload: todos
    });
  } catch(err) {
    console.log("error fetching all todos from localStorage:", err.message);
  }
};

export const addTodo = (todo: ITask) => (dispatch: Dispatch) => {
  try {
    const todos = addToLocalTodos(todo);

    dispatch({
      type: ADD_TODO,
      payload: todos
    });
  } catch(err) {
    console.log("error adding todo to localStorage:", err.message);
  }
};

export const deleteTodo = (id: number) => (dispatch: Dispatch) => {
  try {
    const todos = getLocalTodos();
    const filteredTodos = todos.filter((todo: ITask) => todo.id !== id);
    setLocalTodos(filteredTodos);

    dispatch({
      type: DELETE_TODO,
      payload: filteredTodos
    });
  } catch(err) {
    console.log("error deleting todo:", err.message);
  }
};

export const toggleTodoDone = (id: number) => (dispatch: Dispatch) => {
  try {
    const todos = getLocalTodos();
    const doneTodos = todos.map((todo: ITask) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      } else {
        return todo;
      }
    });
    setLocalTodos(doneTodos);

    dispatch({
      type: TOGGLE_TODO_DONE,
      payload: doneTodos
    });
  } catch(err) {
    console.log("error toggling todo's `done` prop:", err.message);
  }
};
