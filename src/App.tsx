import './styles/theme.css';
import './styles/global.css';
import { Home } from './pages/Home';
import { useState } from 'react';
import { TaskContexProvider, TaskContext } from './contexts/TaskContext';


export function App() {

    const [state,setState] = useState()

    return (
            <TaskContexProvider>
                <Home />
            </TaskContexProvider>
    )
}