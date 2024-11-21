import { Meta, StoryObj } from '@storybook/web-components';
import {html} from 'lit';

import '../griddle-grid';
import '../griddle-row';
import '../griddle-column';
import '../griddle-cell';

export default {
    title: 'Grid',
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        onOpen: {action: 'onClick'},
    },
    render: (args) => html`<gdl-data-grid @click=${args.onOpen} selectionmode=${args.selectionmode}></gdl-data-grid>`
} as Meta;

export const Default: StoryObj = {
    name: 'Default',
    args: {
        selectionmode: 'row'
    }

};