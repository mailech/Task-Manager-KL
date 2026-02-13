import { createContext, useReducer, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from './AuthContext';

const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.payload };
        case 'ADD_TASK':
            return { ...state, tasks: [action.payload, ...state.tasks] };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                ),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload),
            };
        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    // Use state instead of reducer if simpler 
    // But user asked for "clean coding standards", so reducer is good.
    const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
    const { user } = useContext(AuthContext);

    const getTasks = async () => {
        try {
            const res = await api.get('/tasks');
            dispatch({ type: 'SET_TASKS', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const addTask = async (taskData) => {
        try {
            const res = await api.post('/tasks', taskData);
            dispatch({ type: 'ADD_TASK', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const updateTask = async (id, updatedData) => {
        try {
            const res = await api.put(`/tasks/${id}`, updatedData);
            dispatch({ type: 'UPDATE_TASK', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            dispatch({ type: 'DELETE_TASK', payload: id });
        } catch (err) {
            console.error(err);
        }
    };

    const toggleComplete = async (id, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        try {
            const res = await api.put(`/tasks/${id}`, { status: newStatus });
            dispatch({ type: 'UPDATE_TASK', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                getTasks,
                addTask,
                updateTask,
                deleteTask,
                toggleComplete
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
