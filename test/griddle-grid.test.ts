import { assert, beforeEach, describe, expect, ExpectStatic, test } from 'vitest'
import { render, RenderResult } from 'vitest-browser-lit'
import { html } from 'lit'
import { Locator, page, userEvent } from '@vitest/browser/context';
import '../src/index';
import { GriddleDataGrid } from '../src/index';

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
        <gdl-grid-row>
            <gdl-grid-cell>Joe</gdl-grid-cell>
            <gdl-grid-cell>Jameson</gdl-grid-cell>
            <gdl-grid-cell>False</gdl-grid-cell>
        </gdl-grid-row>
    </gdl-data-grid>
    `;


const preparePageForTabbing = async (template = BASE_TEMPLATE) => {
    const screen = page.render(template);
    const anchor = screen.getByTestId('1');
    await anchor.click();
    const gridLocator = screen.getByRole('grid');

    return { gridLocator, screen };
};

describe('Custom Elements have correct fields and exist', () => {
    test('renders grid and grid is visible', async () => {
        const screen = render(BASE_TEMPLATE);

        const element = screen.getByRole('grid');
        await expect.element(element).toBeInTheDocument();
        await expect.element(element).toBeInstanceOf(GriddleDataGrid);
        await expect.element(element).toBeVisible();

    });
})

describe('Keyboard Navigation', () => {

    describe('Tab Navigaton - Initial Tab Order', () => {
        //
        test('Tabs to grid from body', async () => {
            const { gridLocator } = await preparePageForTabbing();
            // Sets us up for actually testing the tab order.
            // Tab from the body element to the data grid.
            await userEvent.tab();
            await expect.element(gridLocator).toHaveFocus();

        });

        test('Tabs to first cell of the grid from focus on the grid', async () => {
            const { gridLocator, screen } = await preparePageForTabbing();
            // Sets us up for actually testing the tab order.
            const firstCell = screen.getByRole('gridcell').first();
            // Tab from the body element to the data grid.
            await userEvent.tab();
            await expect.element(gridLocator).toHaveFocus();

            // Tab to the first available cell of the grid.
            await userEvent.tab();
            await expect.element(firstCell, { timeout: 1000 }).toHaveFocus();
        });
    });
/**
 * Moves focus to the middle cell and changes the roving tabindex to match the
 * middle cell. Relies on the template consisting of a 3 x 3 data grid.
 * @param screen {RenderResult}
 * @returns {Locator} Returns a Locator for the middle cell of the data grid
 */
const prepareForNavigationTests = async (screen: RenderResult):Promise<Locator> => {
    // Tabs to data grid.
    await userEvent.tab();
    const firstCell = screen.getByRole('gridcell').first();
    assert.isTrue(firstCell.element().hasAttribute('tabindex'));

    firstCell.element().setAttribute('tabindex', '-1');
    // Removed tabindex from all gridcells
    const middleCell = screen.getByRole('gridcell').getByText('Jane');
    middleCell.element().setAttribute('tabindex', '0');
    await userEvent.tab();

    return middleCell;
};
    describe('Grid Navigation Mode', () => {
        
        describe('Left Arrow Key', () => {
            
            test('Left arrow advances focus to the cell on the left', async () => {
                const {screen} = await preparePageForTabbing();
                await prepareForNavigationTests(screen);
                await userEvent.keyboard('LeftArrowKey');
                const leftCell = screen.getByRole('gridcell').getByText('Mary');
                await expect(leftCell).toHaveFocus();
            });


            test.todo('Left Arrow does nothing if no cell precedes it', () => {
                //
            });
        })

        describe('Right Arrow Key', () => {
            test.todo('Right Arrow advances focus to the cell on the right', () => {
                //
            });

            test.todo('Right Arrow does nothing if no cell is after it', () => {
                //
            });
        });

        describe('Up Arrow Key', () => {
            test.todo('Up Arrow advances focus to the cell above', () => {
                //
            });

            test.todo('Up Arrow does nothing if no cell is above it', () => {
                //
            });
        });

        describe('Down Arrow Key', () => {
            test.todo('Down Arrow advances focus to the cell below', () => {
                //
            });

            test.todo('Down Arrow does nothing if no cell is below it', () => {
                //
            });
        })
    });

    describe('Cell Interaction Mode', () => {
        //
        test.todo('Add advanced grid interactions', () => {
            //
        });
    });
})