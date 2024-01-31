import { useState } from "react";
import { Button } from "../Button/Button";
import "./TodoList.css";

type TodoListProps = {
  tasks: string[];
  onDeleteTask: (index: number) => void;
  onEditTask: (index: number, newTasks: string) => void;
  editedIndex: number | null;
  onSaveEditedTask: (index: number, newText: string) => void;
  onToggleComplete: (index: number) => void;
};

export function TodoList({
  tasks,
  onDeleteTask,
  onEditTask,
  editedIndex,
  onSaveEditedTask,
}: TodoListProps) {
  const [editedText, setEditedText] = useState<string>("");

  const handleEditToggle = (index: number, task: string) => {
    setEditedText(task);
    onEditTask(index, task);
  };

  const handleEditSave = (index: number) => {
    onSaveEditedTask(index, editedText);
    setEditedText("");
  };

  return (
    <>
      {tasks.length === 0 ? (
        <h1>No tasks to show!</h1>
      ) : (
        <div className="todos">
          {tasks.map((task, index) => (
            <div key={index} className="todo__card">
              <input type="checkbox" />
              {index === editedIndex ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <Button
                    buttonName="Save"
                    buttonStyle="save"
                    click={() => handleEditSave(index)}
                  />
                </>
              ) : (
                <>
                  <p>{task}</p>
                  <div className="button__wrapper">
                    <Button
                      buttonName="Edit"
                      buttonStyle="edit"
                      click={() => handleEditToggle(index, task)}
                    />
                    <Button
                      buttonName="Delete"
                      buttonStyle="delete"
                      click={() => onDeleteTask(index)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
