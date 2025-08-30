import type { Task } from "../../types/index";

type TodoItemProps = {
    task: Task;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
};

const TodoItem = ({ task, toggleTask, deleteTask }: TodoItemProps) => (
    <li className={`todo-item ${task.done ? "done" : ""}`}>
        <span onClick={() => toggleTask(task.id)}>{task.text}</span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>

);

export default TodoItem;
