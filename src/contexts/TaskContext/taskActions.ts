import type {TaskModel} from "../../models/TaskModel.ts";
import {TaskActionTypes} from "./taskActionTypes.ts";

export type TaskActionModel =
    |
    {
        type: TaskActionTypes.START_TASK,
        payload: TaskModel
    } |
    {
        type: TaskActionTypes.INTERRUPT_TASK,
        payload: TaskModel
    }
    |
    {
        type: TaskActionTypes.RESET_STATE
    }