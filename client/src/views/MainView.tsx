import React, { useEffect } from 'react';
import Main from '../components/main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchTasks } from '../store/slices/tasksSlice';

const MainView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  return (
    <section>
      <Main />
    </section>
  )
}

export default MainView;