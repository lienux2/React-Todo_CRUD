import { useEffect, useState } from 'react'
import './App.css'
import { NewForm } from './NewForm'
import { TodoList } from './TodoList'


function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [editedIndex, setEditedIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (task: string) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks, task];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];
      newTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
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
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      setEditedIndex(null);
      return newTasks;
    });
  };

  const handleToggleComplete = () => {

  };

  return (
    <>
      <div className='form'>
        <h1>What needs to be done?</h1>
        <NewForm onAddTask={addTask} />
      </div>
      <hr className='divider'></hr>
      <div className='current-tasks'>
        <h3>My current tasks</h3>
      </div>
      <div className='current-tasks'>
        <TodoList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          editedIndex={editedIndex}
          onSaveEditedTask={saveEditedTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </>
  )
}

export default App