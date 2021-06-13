import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusAT= {
    type:  'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleAT= {
    type:  'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todolistId: string
}



type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT| ChangeTaskTitleAT |AddTodolistAT|RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE_TASK_STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }

        case 'CHANGE_TASK_TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }

        case "ADD-TODOLIST":{
            const stateCopy={...state};
            stateCopy[action.todolistId] = []
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy={...state};
            delete stateCopy[action.id]
            return stateCopy;
        }

        default:
            throw new Error("I don't understand this type")

    }

}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId}
}


