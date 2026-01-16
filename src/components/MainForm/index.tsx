import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm(){
    return (
    <form>
        <div className="formRow">
            <DefaultInput id='input' type='text' labelText='task:' placeholder='Digite algo'/>
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