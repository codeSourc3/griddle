import { page, userEvent } from "@vitest/browser/context";
import { html } from "lit";
import { describe, expect, test } from "vitest";

import '../../src/index';
import { GriddleDataGrid, GriddleRow } from '../../src/index';

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

    /**
     * @description
     * Renders the page and gets the page ready for the Tab keyboard event.
     * The Tab keyboard event will cause the user agent to focus on the grid element.
     * @param template {TemplateResult<1>} The template to use
     * @returns {Promise<{screen: RenderResult, gridLocator: Locator}>}
     */
    const preparePageForTabbing = async (template = BASE_TEMPLATE) => {
        const screen = page.render(template);
        const anchor = screen.getByTestId('1');
        await anchor.click();

        const gridLocator = screen.getByRole('grid');
        return { gridLocator, screen };
    };

    describe('Tab Navigaton - Initial Tab Order', () => {
        //
        test('Grid is in tab sequence', async () => {
            const { gridLocator, screen } = await preparePageForTabbing();
            
            await userEvent.tab();

            await expect.element(gridLocator).toHaveFocus();
        });

        test('First cell is in the tab sequence', async () => {
            const { gridLocator, screen } = await preparePageForTabbing();
            // find first cell
            const firstCellLocator = gridLocator.getByRole('gridcell').first();
            // tab to grid 
            await userEvent.tab();
            // tab to first focused cell.
            await userEvent.tab();
            console.log(`Just hit tab to go to first cell. Focused element is: ${document.activeElement?.tagName} > ${document.activeElement?.textContent}`);
            await expect.element(firstCellLocator).toHaveFocus();
        });
    });