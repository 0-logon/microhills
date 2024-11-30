import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScreenState {
    activeScreen: string;
}

const initialState: ScreenState = {
    activeScreen: 'Dashboard',
};

const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        setActiveScreen: (state, action: PayloadAction<string>) => {
            state.activeScreen = action.payload;
        },
    },
});

export const { setActiveScreen } = screenSlice.actions;
export default screenSlice.reducer;
