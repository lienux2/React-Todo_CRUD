import { useState } from "react";
import { Button } from "../Button/Button";
import "./NewForm.css";

type NewFormProps = {
  onAddTask: (task: string) => void;
};

export function NewForm({ onAddTask }: NewFormProps) {
  const [task, setTask] = useState<string>("");

  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask("");
    }
  };

  return (
    <>
      <form className="form__content">
        <input
          className="input"
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button buttonName="Add" buttonStyle="add" click={handleAddTask} />
      </form>
    </>
  );
}
