import { assert, beforeEach, describe, expect, ExpectStatic, test } from 'vitest'
import { render, RenderResult } from 'vitest-browser-lit'
import { html } from 'lit'
import { Locator, page, userEvent } from '@vitest/browser/context';
import { GriddleCell } from '../../src/griddle-cell';

describe('<gdl-grid-cell> Unit Tests', () => {
    test('is on the custom registry', async () => {
        const screen = render(html`<gdl-grid-cell>Cell</gdl-grid-cell>`);
        expect(customElements.get('gdl-grid-cell') !== undefined, '<gdl-grid-cell> is not in the custom element registry.')
        
    })
});