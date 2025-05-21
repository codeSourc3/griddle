import { assert, beforeEach, describe, expect, ExpectStatic, test } from 'vitest'
import { render, RenderResult } from 'vitest-browser-lit'
import { html } from 'lit'
import { Locator, page, userEvent } from '@vitest/browser/context';
import '../src/index';
import { GriddleDataGrid, GriddleRow } from '../src/index';

const BASE_TEMPLATE = html`
    <button data-testid="1">Anchor to focus on</button>
    <gdl-data-grid>
        <gdl-grid-column slot="headers">First Name</gdl-grid-column>
        <gdl-grid-column slot="headers">Last Name</gdl-grid-column>
        <gdl-grid-column slot="headers">Is Manager</gdl-grid-column>
        <gdl-grid-row>
            <gdl-grid-cell>John</gdl-grid-cell>
            <gdl-grid-cell data-testid="above-cell">Doe</gdl-grid-cell>
            <gdl-grid-cell>False</gdl-grid-cell>
        </gdl-grid-row>
        <gdl-grid-row>
            <gdl-grid-cell data-testid="left-cell">Mary</gdl-grid-cell>
            <gdl-grid-cell data-testid="center-cell">Jane</gdl-grid-cell>
            <gdl-grid-cell data-testid="right-cell">True</gdl-grid-cell>
        </gdl-grid-row>
        <gdl-grid-row>
            <gdl-grid-cell>Joe</gdl-grid-cell>
            <gdl-grid-cell data-testid="bottom-cell">Jameson</gdl-grid-cell>
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
 * Moves tabindex to the middle cell and changes the roving tabindex to match the
 * middle cell. Relies on the template consisting of a 3 x 3 data grid.
 * @param screen {RenderResult}
 * @returns {Locator} Returns a Locator for the middle cell of the data grid
 */
const prepareForNavigationTests = async (screen: RenderResult):Promise<Locator> => {
    // Tabs to data grid.
    await userEvent.tab();
    const firstCell = screen.getByRole('gridcell').first();
    assert.isTrue(firstCell.element().hasAttribute('tabindex') && firstCell.element().getAttribute('tabindex') === '0');

    firstCell.element().setAttribute('tabindex', '-1');
    // Removed tabindex from all gridcells
    const middleCell = screen.getByTestId('center-cell');
    middleCell.element().setAttribute('tabindex', '0');

    return middleCell;
};
    describe('Grid Navigation Mode', () => {
        
        describe('Left Arrow Key', () => {
            
            test('Left arrow advances focus to the cell on the left', async () => {
                const {screen} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                await userEvent.tab();
                await expect(middleCell).toHaveFocus();
                await userEvent.keyboard('{ArrowLeft}');
                const leftCell = screen.getByTestId('left-cell');
                await expect(middleCell).not.toHaveFocus();
                await expect(leftCell).toHaveFocus();
            });


            test('Left Arrow does nothing if no cell precedes it', async () => {
                // sets up the test case
                const {screen} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                const precedingCell = screen.getByTestId('left-cell');
                middleCell.element().setAttribute('tabindex', '-1');
                precedingCell.element().setAttribute('tabindex', '0');
                // Focuses on the middle-left cell
                await userEvent.tab();
                // test via user event
                await userEvent.keyboard('{ArrowLeft}');
                await expect(precedingCell).toHaveFocus();
                assert.isTrue(precedingCell.element().hasAttribute('tabindex') && precedingCell.element().getAttribute('tabindex') === '0', 'Tabindex leaves the contents of the grid.');
            });

            test('Shift+Tab after using Left Arrow while focused on a cell does not cause a loss of the roving tabindex', async () => {
                const {screen, gridLocator} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                await userEvent.tab();
                await expect(middleCell).toHaveFocus();
                await userEvent.keyboard('{ArrowLeft}');
                const leftCell = screen.getByTestId('left-cell');
                await userEvent.tab({shift:true});
                await expect(gridLocator).toHaveFocus();

                await userEvent.tab();
                await expect(leftCell).toHaveFocus();
            })

            test('Focusing out of grid after using Left Arrow will not cause loss of the roving tabindex', async () => {
                const {screen, gridLocator} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                await userEvent.tab();
                await userEvent.keyboard('{ArrowLeft}');
                const leftCell = screen.getByTestId('left-cell');
                const middleRow = screen.getByRole('row').nth(1);
                await expect(middleRow).toContainElement(leftCell.element() as HTMLElement);
                const middleRowElement = middleRow.element() as GriddleRow;
                assert.isNotNull(middleRowElement.lastFocusedCell, 'Last Focused Cell is supposed to be the left cell')
                const outsideWidget = screen.getByTestId('1');
                await outsideWidget.click();
                await expect(outsideWidget).toHaveFocus();
                assert.isNotNull(middleRowElement.lastFocusedCell, 'Last Focused cell was supposed to be the left cell')
                await userEvent.tab();
                await userEvent.tab();

                await expect(leftCell).toHaveFocus();

                await expect(middleCell).toHaveAttribute('tabindex', '-1');
                await expect(leftCell).toHaveAttribute('tabindex', '0');
            })
        });



        describe('Right Arrow Key', () => {
            test('Right Arrow advances focus to the cell on the right', async () => {
                const {screen} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                await userEvent.tab();
                await expect(middleCell).toHaveFocus();
                await userEvent.keyboard('{ArrowRight}');
                const rightCell = screen.getByTestId('right-cell');
                await expect(middleCell).not.toHaveFocus();
                await expect(rightCell).toHaveFocus();
            });

            test('Right Arrow does nothing if no cell is after it', async () => {
                const {screen} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                const nextCell = screen.getByTestId('right-cell');
                middleCell.element().setAttribute('tabindex', '-1');
                nextCell.element().setAttribute('tabindex', '0');
                await userEvent.tab();

                await userEvent.keyboard('{ArrowRight}');
                await expect(nextCell).toHaveFocus();
                await expect(nextCell).toHaveAttribute('tabindex', '0');
            });

             test('Shift+Tab after using Right Arrow while focused on a cell does not cause a loss of the roving tabindex', async () => {
                const {screen, gridLocator} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                await userEvent.tab();
                await expect(middleCell).toHaveFocus();
                await userEvent.keyboard('{ArrowRight}');
                const rightCell = screen.getByTestId('right-cell');
                await userEvent.tab({shift:true});
                await expect(gridLocator).toHaveFocus();
                
                await userEvent.tab();
                await expect(rightCell).toHaveFocus();
            })

            test('Focusing out of grid after using Right Arrow will not cause loss of the roving tabindex', async () => {
                const {screen, gridLocator} = await preparePageForTabbing();
                const middleCell = await prepareForNavigationTests(screen);
                await userEvent.tab();
                await userEvent.keyboard('{ArrowRight}');
                const rightCell = screen.getByTestId('right-cell');
                const outsideWidget = screen.getByTestId('1');
                await outsideWidget.click();
                await expect(outsideWidget).toHaveFocus();

                await userEvent.tab();
                await userEvent.tab();

                await expect(rightCell).toHaveFocus();

                await expect(middleCell).toHaveAttribute('tabindex', '-1');
                await expect(rightCell).toHaveAttribute('tabindex', '0');
            })
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