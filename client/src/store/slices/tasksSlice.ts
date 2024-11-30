import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Definišemo tip za Task
interface Task {
    id: number;
    title: string;
    description: string;
}

// Definišemo inicijalno stanje
interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
    error: null,
};

// Asinkrona funkcija za dohvatanje zadataka
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
      try {
        // Preuzimanje tokena iz localStorage
        const token = localStorage.getItem('auth')
          ? JSON.parse(localStorage.getItem('auth')!).token
          : null;
  
        if (!token) {
          throw new Error('Authentication token not found');
        }
  
        // Slanje zahteva
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        // Provera da li je odgovor uspešan
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch tasks');
        }
  
        // Vraćanje rezultata
        return await response.json();
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

// Slice za zadatke
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const tasksReducer = tasksSlice.reducer;