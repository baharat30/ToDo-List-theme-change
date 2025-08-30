import { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput/todoinput.tsx";
import TodoList from "./components/TodoList/todolist.tsx";
import type { Task } from "./types/index.ts";
import "./theme/theme.css";


type Theme = "light" | "dark";

function useTheme(): [Theme, () => void] {
  const getInitial = (): Theme => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return [theme, toggle];
}

function App() {
  // مقدار اولیه رو از localStorage می‌خونیم
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, toggleTheme] = useTheme();

  // هر بار tasks تغییر کنه → ذخیره میشه تو localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, done: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

return (
  <div className="app">
    {/* هدر: عنوان + دکمه تم کنار هم */}
    <div className="app-header">
      <h1>ToDo List</h1>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-pressed={theme === "dark"}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span aria-hidden>{theme === "dark" ? "🌙" : "☀️"}</span>
        <span style={{ marginInlineStart: 6 }}>{theme === "dark" ? "Dark" : "Light"}</span>
      </button>
    </div>

    <TodoInput addTask={addTask} />
    <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
  </div>
);

}

export default App;
