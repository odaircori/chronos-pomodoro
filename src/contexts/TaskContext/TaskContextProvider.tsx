import {useEffect, useReducer, useRef} from "react";
import {initialTaskState} from "./initialTaskState";
import {TaskContext} from "./TaskContext";
import {taskReducer} from "./taskReducer.ts";
import {TimerWorkerManager} from "../../workers/TimerWorkerManager.ts";
import {TaskActionTypes} from "./taskActionTypes.ts";
import {loadBeep} from "../../utils/loadBeep.ts";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  worker.onMessage((event: MessageEvent) => {
    const countDownSeconds = event.data;

    if(countDownSeconds <= 0) {
      if(playBeepRef.current) {
        console.log("Tocando áudio")
        playBeepRef.current();
        playBeepRef.current = null;
      }

      console.log("Worker finalizado porque a task completou");
      dispatch({type: TaskActionTypes.COMPLETE_TASK});
      worker.terminate();
    }else{
      dispatch({type: TaskActionTypes.COUNT_DOWN, payload: {secondsRemaining:countDownSeconds }});
    }
  })

  useEffect(() =>{
    if(!state.activeTask) {
      console.log("Worker finalizado porque não existe taskAtiva");
      worker.terminate();
    }

      worker.postMessage(state);
  },[worker, state]);

  useEffect(() => {
    console.log("Active task mudou", state.activeTask);

    if(state.activeTask && playBeepRef.current === null){
      console.log("Carregando áudio");
      playBeepRef.current = loadBeep();
    }else{
      console.log("Zerando áudio");
      playBeepRef.current = null;
    }

  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}