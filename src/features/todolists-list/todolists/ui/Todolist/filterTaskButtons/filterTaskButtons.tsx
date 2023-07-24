import React, {useCallback} from 'react';
import {Button} from "@mui/material";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolists-list/todolists/model/todolists.reducer";
import {useActions} from "common/hooks";

type Props = {
    todolist: TodolistDomainType;
}

export const FilterTaskButtons = (props: Props) => {
    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => changeTodolistFilter({
        filter,
        id: props.todolist.id
    })

    return (
        <>
            <Button
                variant={props.todolist.filter === "all" ? "outlined" : "text"}
                onClick={() => changeFilterHandler("all")}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={props.todolist.filter === "active" ? "outlined" : "text"}
                onClick={() => changeFilterHandler("active")}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                onClick={() => changeFilterHandler("completed")}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
    );
};
