export interface ITask {
  id: number,
  value: string,
  completed: boolean
}

export interface ITodoState {
  currentTask: string,
  tasks: ITask[],
  matchedTasks: ITask[]
}

export interface ITodoState2 {
  currentTask: string,
  matchedTasks: ITask[]
}
