import { expect, test } from 'vitest'
import { render } from 'vitest-browser-lit'
import { html } from 'lit'
import { page, userEvent } from '@vitest/browser/context';
import '../src/index';

const baseTemplate = html`
    <gdl-data-grid>
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
    `;

test('renders grid with text cells', async () => {
    const screen = render(baseTemplate);

    const element = screen.getByRole('grid');
    await expect.element(element).toBeInTheDocument();

    
});

test('Tabs to grid at first', async () => {
    const screen = page.render(baseTemplate);
    const gridLocator = screen.getByRole('grid');
    // Fixes the focus not being in the iframe when Tab key events are fired. 
    // Might not be a problem in headless mode.
    await gridLocator.click();
    await userEvent.tab({shift:true});
    // Sets us up for actually testing the tab order.
    // Tab from the body element to the data grid.
    await userEvent.tab();
    await expect.element(gridLocator).toHaveFocus();
    
});

test('Tabs to first cell of the grid from focus on the grid', async () => {
    const screen = page.render(baseTemplate);
    const gridLocator = screen.getByRole('grid');
    // Fixes the focus not being in the iframe when Tab key events are fired. 
    // Might not be a problem in headless mode.
    await gridLocator.click();
    await userEvent.tab({shift:true});
    // Sets us up for actually testing the tab order.
    const firstCell = screen.getByRole('gridcell').first();
    // Tab from the body element to the data grid.
    await userEvent.tab();
    await expect.element(gridLocator).toHaveFocus();

    // Tab to the first available cell of the grid.
    await userEvent.tab();
    await expect.element(firstCell, {timeout: 1000}).toHaveFocus();
})