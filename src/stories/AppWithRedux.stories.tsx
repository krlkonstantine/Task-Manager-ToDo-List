import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolists/AppWithredux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>

export const AppWithReduxStory = Template.bind({});


