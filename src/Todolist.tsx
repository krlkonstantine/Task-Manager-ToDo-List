import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Tasks";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log("todolist rendered")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id),[props.removeTask,props.id])
    const onStatusChangeHandler = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    },[props.changeTaskStatus,props.id])
    const onTitleChangeHandler = useCallback((newValue: string, taskId: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    },[props.changeTaskTitle,props.id])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasksForTodolist.map(t => {
                return <Task key={t.id}
                    changeTaskStatus={onStatusChangeHandler}
                             task={t}
                             removeTask={removeTask}
                             changeTaskTitle={onTitleChangeHandler}
                />
            })}
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonWithMemo btnTitle={"All"}
                            variant={props.filter === 'all' ? 'outlined' : 'text'}
                            onClick={onAllClickHandler}
                            color={'inherit'}
            />
            <ButtonWithMemo btnTitle={"Active"}
                            variant={props.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onActiveClickHandler}
                            color={'primary'}
            />
            <ButtonWithMemo btnTitle={"Completed"} color={'secondary'}
                            variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            onClick={onCompletedClickHandler}
            />
        </div>
    </div>
})

type ButtonWithMemoType = {
    variant: "text" | "outlined" | "contained"
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    onClick: () => void
    btnTitle: string
}

const ButtonWithMemo = memo((props: ButtonWithMemoType) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.btnTitle}
    </Button>
})
