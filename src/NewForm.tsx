import { useState } from "react";

interface NewFormProps {
    onAddTask: (task: string) => void;
}

export function NewForm({ onAddTask }: NewFormProps) {
    const [task, setTask] = useState<string>('');

    const handleAddTask = () => {
        if (task.trim() !== '') {
            onAddTask(task);
            setTask('');
        }
    };

    return (
        <>
            <form className='form__form'>
                <input
                    type='text'
                    placeholder='Enter task...'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button className='button form__add-button' type='button' onClick={handleAddTask}>
                    Add
                </button>
            </form>
        </>
    );
}