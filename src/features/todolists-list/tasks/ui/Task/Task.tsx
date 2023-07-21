import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
    const {removeTask, updateTask} = useActions(tasksThunks);


    const onDeleteClickHandler = ()=> removeTask({taskId:props.task.id,todolistId:props.todolistId})

    /*const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        updateTask({ taskId, domainModel: { status }, todolistId });
    }, []);

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        updateTask({ taskId, domainModel: { title }, todolistId });
    }, []);


    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(
                props.task.id,
                newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
                props.todolistId,
            );
        },
        [props.task.id, props.todolistId],
    );*/

    const onStatusCangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        updateTask({taskId:props.task.id,todolistId:  props.todolistId, domainModel:{status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}})
    }

    const onTitleChangeHandler = (newTitle:string) => {
        updateTask({taskId:props.task.id,todolistId:  props.todolistId, domainModel:{title: newTitle}})
    }

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary"
                      onChange={onStatusCangeHandler}/>

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onDeleteClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
