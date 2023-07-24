import React, {ChangeEvent, FC, memo} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import s from 'features/todolists-list/todolists/ui/Todolist/tasks/Task/Task.module.css'

type Props = {
    task: TaskType;
    todolistId: string;
};

export const Task: FC<Props> = memo(({task, todolistId}) => {
    const {removeTask, updateTask} = useActions(tasksThunks);


    const onDeleteClickHandler = () => removeTask({taskId: task.id, todolistId})

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({taskId: task.id, domainModel: {status}, todolistId})
    }

    const onTitleChangeHandler = (title: string) => {
        updateTask({taskId: task.id, domainModel: {title}, todolistId})
    }

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                      onChange={onStatusChangeHandler}/>

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onDeleteClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
