import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";

export function MainForm(){
    const [taskName, setTaskName] = useState('')

    function handleCreateNewTask(evt: React.FormEvent){
        evt.preventDefault();

        console.log("TESTE")

    }

    return (
    <form onSubmit={handleCreateNewTask}>
        <div className="formRow">
            <DefaultInput id='input' type='text' labelText='task:' placeholder='Digite algo' value={taskName} onChange={e => setTaskName(e.target.value)}/>
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