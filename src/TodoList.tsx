import { useState } from "react";

interface TodoListProps {
    tasks: string[];
    onDeleteTask: (index: number) => void;
    onEditTask: (index: number, newTasks: string) => void;
    editedIndex: number | null;
    onSaveEditedTask: (index: number, newText: string) => void;
    onToggleComplete: (index: number) => void;
}

export function TodoList({ tasks, onDeleteTask, onEditTask, editedIndex, onSaveEditedTask, onToggleComplete }: TodoListProps) {
    const [editedText, setEditedText] = useState<string>('');
    const [completedTasks, setCompletedTasks] = useState<boolean[]>(Array(tasks.length).fill(false));

    const handleEditStart = (index: number, task: string) => {
        setEditedText(task);
        onEditTask(index, task);
    };

    const handleEditSave = (index: number) => {
        onSaveEditedTask(index, editedText);
        setEditedText('');
    };

    const handleToggleComplete = (index: number) => {
        onToggleComplete(index);
        setCompletedTasks((prevCompletedTasks) => {
            const newCompletedTasks = [...prevCompletedTasks];
            newCompletedTasks[index] = !newCompletedTasks[index];
            return newCompletedTasks;
        });
    };

    return (
        <>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={completedTasks[index] ? 'completed' : ''}>
                        {index === editedIndex ? (
                            <>
                                <input
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                />
                                <button
                                    className="button form__save-button"
                                    onClick={() => handleEditSave(index)}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <label>
                                    <input className="input__checked" type="checkbox"
                                        checked={completedTasks[index]}
                                        onChange={() => handleToggleComplete(index)}
                                    />
                                    {task}
                                </label>
                                <button
                                    className='button form__edit-button'
                                    onClick={() => handleEditStart(index, task)}>
                                    Edit</button>
                                <button
                                    className='button form__delete-button'
                                    onClick={() => onDeleteTask(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}