import { useState, useRef, useEffect } from "react";

type TodoInputProps = {
  addTask: (text: string) => void;
};

const TodoInput = ({ addTask }: TodoInputProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAdd = () => {
    if (text.trim() !== "") {
      addTask(text.trim());
      setText("");
      // فوکوس از روی دکمه برداشته بشه
      btnRef.current?.blur();
      // فوکوس دوباره روی input برگرده (اختیاری ولی UX بهتره)
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="todo-input-container">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Task..."
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      
      <button ref={btnRef}
        type="button"
        onClick={(e) => {
          handleAdd();
          (e.currentTarget as HTMLButtonElement).blur(); // ← فوکوس از دکمه برداشته شود
        }}
      >
        Add
      </button>

    </div>
  );
};

export default TodoInput;
