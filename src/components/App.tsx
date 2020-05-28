import * as React from "react";
import { useState } from "react";
import { ITask, ITodoState } from "../types";

const App: React.FC<{}> = () => {
  const [todoState, setTodoState] = useState<ITodoState>({
    currentTask: "",
    tasks: [],
    matchedTasks: []
  });

  const _timeInMilliseconds = (): number => {
    const date: Date = new Date();
    return date.getTime();
  };

  const handleChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    const matchedTasks = todoState.tasks.filter(item => item.value.includes(evt.currentTarget.value));

    setTodoState({
      ...todoState,
      currentTask: evt.currentTarget.value,
      matchedTasks
    });
  };

  const handleDeleteClick = (id: number): void => {
    const filteredTasks = (tasks: ITask[]): Array<ITask> => tasks.filter((task: ITask) => task.id !== id);
    setTodoState({
      ...todoState,
      tasks: filteredTasks(todoState.tasks),
      matchedTasks: filteredTasks(todoState.matchedTasks)
    });
  };

  const toggleDoneClick = (id: number): void => {
    const withCompletedTasks = (tasks: ITask[]): ITask[] => {
      return tasks.map((task: ITask) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed
          };
        } else {
          return task;
        }
      })
    };

    setTodoState({
      ...todoState,
      tasks: withCompletedTasks(todoState.tasks),
      matchedTasks: withCompletedTasks(todoState.matchedTasks)
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    setTodoState({
      ...todoState,
      tasks: [
        ...todoState.tasks,
        {
          id: _timeInMilliseconds(),
          value: todoState.currentTask,
          completed: false
        }
      ],
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
          : renderTasks(todoState.tasks)
        }
      </section>
    </div>
  );
};

export default App;
