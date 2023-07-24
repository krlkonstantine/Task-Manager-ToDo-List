import React, {FC, memo, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {
    TodolistDomainType,
    todolistsThunks
} from "features/todolists-list/todolists/model/todolists.reducer";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {FilterTaskButtons} from "features/todolists-list/todolists/ui/Todolist/filterTaskButtons/filterTaskButtons";
import {Tasks} from "features/todolists-list/todolists/ui/Todolist/tasks/tasks";
import {TodolistTitle} from "features/todolists-list/todolists/ui/Todolist/todolist-title/todolist-title";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: FC<Props> = memo(function ({todolist, tasks}) {
    const {fetchTasks, addTask} = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskHandler = (title: string) => addTask({title, todolistId: todolist.id})


    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"}/>
            <Tasks tasks={tasks} todolist={todolist}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTaskButtons todolist={todolist}/>
            </div>
        </div>
    );
});
