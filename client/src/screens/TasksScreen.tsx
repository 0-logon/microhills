import React, { useState } from 'react';
import styles from '../styles/screens/TasksScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { BinIcon } from '../assets/icons';
import { deleteTask, fetchTasks } from '../store/slices/tasksSlice';
import { AppConfig } from '../config/config';
import { formatDate } from '../utils/helpers';

interface inputData {
  title: string;
  description: string;
  count: number | null;
}

const TasksScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editor, setEditor] = useState<boolean>(false);
  const { tasks, charCount } = useSelector((state: RootState) => state.tasks);
  const freeSpace: number = AppConfig.USAGE_LIMIT - charCount;

  const [formData, setFormData] = useState<inputData>({
    title: "",
    description: "",
    count: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: value,
      };

      const totalChars = updatedFormData.title.length + updatedFormData.description.length;

      return {
        ...updatedFormData,
        count: totalChars,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description
    }

    try {
      const token = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth')!).token
        : null;

      const response = await fetch(`http://localhost:3000/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)

      });
      if (response.ok) {
        dispatch(fetchTasks());
        // const data = await response.json();
        // console.log('Task has been created successfully:', data);
      }
      else {
        // const errorData = await response.json();
        // console.error('Creating task failed: ', errorData);
      }
    } catch (error) {
      // console.error('An error occurred:', error);
    }

    setFormData({
      title: "",
      description: "",
      count: 0
    });
    setEditor(false);
  };


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
        // const errorData = await response.json();
        // console.error('Deleting task failed: ', errorData);
      }
    } catch (error) {
      // console.error('An error occurred:', error);
    }
    dispatch(deleteTask(taskId));
  };

  return (
    <div className={styles.component}>
      <div className={styles.header}>
        <h1>Tasks</h1>
        {editor ? <div className={styles.editor_btns}><button onClick={() => setEditor(false)}>Cancel</button> <button type='submit' form="myForm">Save</button></div> : <button onClick={() => setEditor(true)}>Add new</button>}
      </div>
      <div className={styles.body}>
        {
          editor && <form id="myForm" onSubmit={handleSubmit} className={styles.editor}>
            <input
              type="text"
              name='title'
              placeholder='Task title'
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name='description'
              placeholder='Task description'
              value={formData.description}
              onChange={handleChange}
            />
            <p>{`${formData.count} / ${freeSpace.toLocaleString('en-US')}`}</p>
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
                <p>{formatDate(task.createdAt)}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TasksScreen;