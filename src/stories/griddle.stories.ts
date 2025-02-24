import { Meta, StoryObj } from '@storybook/web-components';
import {html} from 'lit';
import { GriddleDataGrid, GriddleColumn, GriddleCell, GriddleRow } from '../index';
import '../index';
export default {
    title: 'Grid',
    component: 'gdl-data-grid',
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        selectionmode: {
            control: 'radio',
            description: 'Whether one can select rows or cells',
            options: ['none', 'row', 'cell'],
          },
        multiselectable: {
            name: 'multiselectable',
            description: 'Whether one can select more than one row/cell',
            control: {
                type:'boolean'
            }
        }
    },
    render: (args) => html`
    <gdl-data-grid selectionmode=${args.selectionmode} multiselectable=${args.multiselectable}>
        <gdl-grid-column slot="headers">First Name</gdl-grid-column>
        <gdl-grid-column slot="headers">Last Name</gdl-grid-column>
        <gdl-grid-column slot="headers">Is Manager</gdl-grid-column>
        <gdl-grid-row>
            <gdl-grid-cell>John</gdl-grid-cell>
            <gdl-grid-cell>Doe</gdl-grid-cell>
            <gdl-grid-cell>False</gdl-grid-cell>
        </gdl-grid-row>
        <gdl-grid-row>
            <gdl-grid-cell>Mary</gdl-grid-cell>
            <gdl-grid-cell>Jane</gdl-grid-cell>
            <gdl-grid-cell>True</gdl-grid-cell>
        </gdl-grid-row>
    </gdl-data-grid>
    `
} as Meta;

export const Default: StoryObj = {
    name: 'Default',
    args: {
        selectionmode: 'none',
        multiselectable: false
    }, 
    render: (args) => html`
    <gdl-data-grid selectionmode=${args.selectionmode} multiselectable=${args.multiselectable}>
        <gdl-grid-column slot="headers">First Name</gdl-grid-column>
        <gdl-grid-column slot="headers">Last Name</gdl-grid-column>
        <gdl-grid-column slot="headers">Is Manager</gdl-grid-column>
        <gdl-grid-row>
            <gdl-grid-cell>John</gdl-grid-cell>
            <gdl-grid-cell>Doe</gdl-grid-cell>
            <gdl-grid-cell>False</gdl-grid-cell>
        </gdl-grid-row>
        <gdl-grid-row>
            <gdl-grid-cell>Mary</gdl-grid-cell>
            <gdl-grid-cell>Jane</gdl-grid-cell>
            <gdl-grid-cell>True</gdl-grid-cell>
        </gdl-grid-row>
    </gdl-data-grid>
    ` 

};