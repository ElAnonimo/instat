import * as React from "react";
import { useState, useEffect } from "react";
import { ITask, ITodoState2 } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodoDone
} from "../actions/todos";
import { AppState } from "../reducers";

const App2: React.FC<{}> = () => {
  const [todoState, setTodoState] = useState<ITodoState2>({
    currentTask: "",
    matchedTasks: []
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
    return () => {
      localStorage.removeItem("todos");
    };
  }, []);

  const todos = useSelector(({ todos }: AppState) => todos.todos);

  const _timeInMilliseconds = (): number => {
    const date: Date = new Date();
    return date.getTime();
  };

  const handleChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    const matchedTasks = todos.filter(item => item.value.includes(evt.currentTarget.value));
    setTodoState({
      ...todoState,
      currentTask: evt.currentTarget.value,
      matchedTasks
    });
  };

  const handleDeleteClick = (id: number): void => {
    dispatch(deleteTodo(id));
    setTodoState({
      ...todoState,
      matchedTasks: todos.filter((item: ITask) => item.id !== id),
      currentTask: ""
    });
  };

  const toggleDoneClick = (id: number): void => {
    dispatch(toggleTodoDone(id));
    setTodoState({
      ...todoState,
      matchedTasks: todos
        .filter((item: ITask) => item.value.includes(todoState.currentTask))
        .map((todo: ITask) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed
            };
          } else {
            return todo;
          }
        })
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    dispatch(addTodo({
      id: _timeInMilliseconds(),
      value: todoState.currentTask,
      completed: false
    }));

    setTodoState({
      ...todoState,
      currentTask: ""
    });
  };

  const renderTasks = (tasks: ITask[]): JSX.Element[] => {
    return tasks.map((task: ITask) => (
      <div key={task.id} className="tdl-task">
        <p className={task.completed ? "is-completed" : ""}>Task Name: {task.value}</p>
        <p className={task.completed ? "is-completed" : ""}>Completed: {task.completed ? "Yes" : "No"}</p>
        <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
        <button onClick={() => toggleDoneClick(task.id)}>{task.completed ? "Undo" : "Done"}</button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="tdl-input"
          placeholder="Add a Task"
          value={todoState.currentTask}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <section>
        {todoState.matchedTasks.length > 0
          ? renderTasks(todoState.matchedTasks)
          : renderTasks(todos)
        }
      </section>
    </div>
  );
};

export default App2;
