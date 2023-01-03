import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolists/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action("status changed"),
        changeTaskTitle: action("Task title changed"),
        removeTask: action("task removed"),
        task: {id: "tralalala", title: "get a good job", isDone: true},
        todolistId: "trolololo"
    }
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const CompletedTaskStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CompletedTaskStory.args = {};

export const UncompletedTaskStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UncompletedTaskStory.args = {
    task: {id: "werwerwer", title: "buy some books", isDone: false},
};

