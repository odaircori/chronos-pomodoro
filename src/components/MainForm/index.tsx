import {PlayCircleIcon, StopCircleIcon} from "lucide-react";
import {Cycles} from "../Cycles";
import {DefaultButton} from "../DefaultButton";
import {DefaultInput} from "../DefaultInput";
import {useRef} from "react";
import type {TaskModel} from "../../models/TaskModel.ts";
import {useTaskContext} from "../../contexts/TaskContext/useTaskContext.tsx";
import {getNextCycleType} from "../../utils/getNextCycleType.ts";
import {getNextCycle} from "../../utils/getNextCycle.ts";
import {TaskActionTypes} from "../../contexts/TaskContext/taskActionTypes.ts";
import {Tips} from "../Tips";
import {TimerWorkerManager} from "../../workers/TimerWorkerManager.ts";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);

  const { state, dispatch } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(evt: React.FormEvent) {
    evt.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value;

    if (taskName.trim() === "") return;

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      duration: state.config[nextCycleType],
      completeDate: null,
      interruptDate: null,
      type: nextCycleType,
    };

    dispatch({type: TaskActionTypes.START_TASK, payload: newTask});

    const worker = TimerWorkerManager.getInstance();
    worker.postMessage('Oi Worker');
    worker.onMessage((event) => {
      console.log("Received message", event.data);
    });
  }

    function handleInterruptTask(): void {

      dispatch({type: TaskActionTypes.INTERRUPT_TASK, payload:state.activeTask})
    }

  return (
    <form onSubmit={handleCreateNewTask}>
      <div className="formRow">
        <DefaultInput
          id="input"
          type="text"
          labelText="task:"
          placeholder="Digite algo"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <p>
          <Tips />
        </p>
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            type="submit"
            icon={<PlayCircleIcon />}
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
          />
        )} {!!state.activeTask && (
          <DefaultButton
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
