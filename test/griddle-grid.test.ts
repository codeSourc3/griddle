import { expect, test } from 'vitest'
import { render } from 'vitest-browser-lit'
import { html } from 'lit'
import { page, userEvent } from '@vitest/browser/context';
import '../src/index';

test('renders grid with text cells', async () => {
    const screen = render(html`
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
    `);

    const element = screen.getByRole('grid');
    await expect.element(element).toBeInTheDocument();

    
});

test('Tabs to grid at first', async () => {
    const screen = page.render(html`
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
    `);
    console.debug('Base Element: ', screen.baseElement.tagName);
    console.debug('Container: ', screen.container);
    screen.container.focus();
    const gridLocator = screen.getByRole('grid');
    let grid = gridLocator.element() as HTMLElement;
    grid.focus();
    console.debug(` Before tabbing: ${document.activeElement}`)
    await userEvent.tab();
    console.debug(`After tabbing: ${document.activeElement}`)
    await userEvent.tab({shift: true});
    await expect.element(gridLocator, {timeout: 1000}).toHaveFocus();

});