import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import {useRef} from "react";
import type {TaskModel} from "../../models/TaskModel.ts";
import {useTaskContext} from "../../contexts/TaskContext/useTaskContext.tsx";
import {getNextCycle} from "../../utils/getNextCycle.ts";
import {getNextCycleType} from "../../utils/getNextCycleType.ts";
import {formatSecondsToMinutes} from "../../utils/formatSecondsToMinutes.ts";

export function MainForm(){
    const taskNameInput = useRef<HTMLInputElement>(null)

    const {state, setState} = useTaskContext();

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(evt: React.FormEvent){
        evt.preventDefault();

        if(taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value;

        if(taskName.trim() === "") return;

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            duration:state.config[nextCycleType],
            completeDate: null,
            interruptDate: null,
            type: nextCycleType
        }

        const secondsRemaining = newTask.duration * 60;

        setState(prevState => {
            return {
                ...prevState,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining: secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                tasks: [...prevState.tasks, newTask]
            }

        })

    }

    return (
    <form onSubmit={handleCreateNewTask}>
        <div className="formRow">
            <DefaultInput id='input' type='text' labelText='task:' placeholder='Digite algo'  ref={taskNameInput} />
        </div>
        <div className="formRow">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, officiis!</p>
        </div> 
        <div className="formRow">
            <Cycles />
        </div> 
        <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon />} />
        </div>                                                                                    
    </form>
    )
}