import React, { useState } from 'react';
import styles from '../styles/screens/TasksScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { BinIcon } from '../assets/icons';
import { deleteTask } from '../store/slices/tasksSlice';

const TasksScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [editor, setEditor] = useState<boolean>(false);
  const { tasks, charCount } = useSelector((state: RootState) => state.tasks);

  const handleDelete = async (taskId: number) => {
    try {
      const token = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth')!).token
        : null;

      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // const data = await response.json();
        // console.log('Task has been deleted successfully:', data);
      }
      else {
        const errorData = await response.json();
        // console.error('Deleting task failed: ', errorData);
        // setErrors((prevErrors) => ({
        //     ...prevErrors,
        //     email: errorData.message || 'Invalid login credentials.',
        // }));
      }
    } catch (error) {
      // console.error('An error occurred:', error);
      // setErrors((prevErrors) => ({
      //     ...prevErrors,
      //     email: 'An unexpected error occurred. Please try again later.',
      // }));
    }
    dispatch(deleteTask(taskId));
  };

  return (
    <div className={styles.component}>
      <div className={styles.header}>
        <h1>Tasks</h1>
        {editor ? <button onClick={() => setEditor(true)}>Create</button> : <button onClick={() => setEditor(true)}>Add new</button>}
      </div>
      <div className={styles.body}>
        {
          editor && <form className={styles.editor}>
            <input type="text" placeholder='Task title' />
            <input type="text" placeholder='Task description' />
            <p>23/10 000</p>
          </form>
        }
        {
          !tasks.length && <p>No tasks yet! Start by creating your first task to get organized.</p>
        }
        <div className={styles.tasks_box}>
          {
            tasks.map((task) => (
              <div key={task.id} className={styles.task_card}>
                <div className={styles.task_actions}>
                  <button onClick={() => handleDelete(task.id)}><BinIcon /></button>
                </div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TasksScreen;