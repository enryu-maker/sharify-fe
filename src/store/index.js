import { configureStore } from '@reduxjs/toolkit';
import Reducers from './reducers'; // Assume reducers are already configured using createSlice or reducer functions

export const store = configureStore({
    reducer: {
        Reducers, // Add your reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(), // Add custom middleware if needed
});

export default store;