import { expect, test } from 'vitest'
import { render } from 'vitest-browser-lit'
import { html } from 'lit'
import { page, userEvent } from '@vitest/browser/context';
import '../src/index';

const BASE_TEMPLATE = html`
    <button data-testid="1">Anchor to focus on</button>
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
    

const preparePageForTabbing = async (template=BASE_TEMPLATE) => {
    const screen = page.render(template);
    const anchor = screen.getByTestId('1');
    await anchor.click();
    const gridLocator = screen.getByRole('grid');
    
    return {gridLocator, screen};
};

test('renders grid with text cells', async () => {
    const screen = render(BASE_TEMPLATE);

    const element = screen.getByRole('grid');
    await expect.element(element).toBeInTheDocument();

    
});

test('Tabs to grid from body', async () => {
    const {gridLocator} = await preparePageForTabbing();
    // Sets us up for actually testing the tab order.
    // Tab from the body element to the data grid.
    await userEvent.tab();
    await expect.element(gridLocator).toHaveFocus();
    
});

test('Tabs to first cell of the grid from focus on the grid', async () => {
    const {gridLocator, screen} = await preparePageForTabbing();
    // Sets us up for actually testing the tab order.
    const firstCell = screen.getByRole('gridcell').first();
    // Tab from the body element to the data grid.
    await userEvent.tab();
    await expect.element(gridLocator).toHaveFocus();

    // Tab to the first available cell of the grid.
    await userEvent.tab();
    await expect.element(firstCell, {timeout: 1000}).toHaveFocus();
});