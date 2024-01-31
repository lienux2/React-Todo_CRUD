import { useEffect, useState } from "react";
import "./App.css";
import { NewForm } from "./assets/components/NewForm/NewForm";
import { TodoList } from "./assets/components/TodoList/TodoList";
import { Logo } from "./assets/components/Logo/Logo";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [editedIndex, setEditedIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (task: string) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks, task];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];
      newTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const editTask = (index: number) => {
    setEditedIndex(index);
  };

  const saveEditedTask = (index: number, newText: string) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];
      newTasks[index] = newText;
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      setEditedIndex(null);
      return newTasks;
    });
  };

  const handleToggleComplete = () => {};

  return (
    <>
      <div className="container">
        <div className="todo__form">
          <div className="title__content">
            <Logo />
            <h1>Todo List</h1>
          </div>

          <div className="content">
            <div className="add-todo">
              <h3 className="title">What needs to be done?</h3>
              <NewForm onAddTask={addTask} />
            </div>

            <div>
              <h3>My current tasks:</h3>
            </div>

            <div>
              <TodoList
                tasks={tasks}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
                editedIndex={editedIndex}
                onSaveEditedTask={saveEditedTask}
                onToggleComplete={handleToggleComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
