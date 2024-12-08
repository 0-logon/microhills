import React, { useEffect, useState } from 'react';
import styles from '../styles/screens/TasksScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { BinIcon } from '../assets/icons';
import { deleteTask, fetchTasks } from '../store/slices/tasksSlice';
import { AppConfig } from '../config/config';
import { formatDate } from '../utils/helpers';
import SortFilter from '../components/shared/SortFilter';

interface inputData {
  title: string;
  description: string;
  count: number | null;
}

const TasksScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editor, setEditor] = useState<boolean>(false);
  const [allowSave, setAllowSave] = useState<boolean>(true);
  const { tasks, charCount } = useSelector((state: RootState) => state.tasks);
  const freeSpace: number = AppConfig.USAGE_LIMIT - charCount;
  const [sort, setSort] = useState<string>('asc');

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

  useEffect(() => {
    if (!freeSpace) {
      setAllowSave(false);
    }
    else if (formData.count !== null && formData.count > freeSpace) {
      setAllowSave(false);
    } else {
      setAllowSave(true);
    }
  }, [formData.count, freeSpace])

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
        {editor ? <div className={styles.editor_btns}>
          <button onClick={() => setEditor(false)}>Cancel</button>
          {
            allowSave ? <button className={styles.save_btn} type='submit' form="myForm">Save</button>
              : <div className={styles.disabled_save}>Save</div>
          }
        </div> : <button onClick={() => setEditor(true)}>Add new</button>}
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
            <p><span style={{ color: !allowSave ? '#b80f0f' : '' }}>{formData.count}</span> / {freeSpace.toLocaleString('en-US')}</p>
          </form>
        }
        {
          !tasks.length && <p>No tasks yet! Start by creating your first task to get organized.</p>
        }
        <SortFilter sort={sort} setSort={setSort} />
        <div className={styles.tasks_box}>
          {
            [...tasks]
              .sort((a, b) => {
                if (sort === 'asc') {
                  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                } else {
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
              })
              .map((task) => (
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