import TodoItem from "../TodoItem/todoitem";
import type { Task } from "../../types/index";

type TodoListProps = {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TodoList = ({ tasks, toggleTask, deleteTask }: TodoListProps) => (
  <ul>
    {tasks.map(task => (
      <TodoItem
        key={task.id}
        task={task}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    ))}
  </ul>
);

export default TodoList;
