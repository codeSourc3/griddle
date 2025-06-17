import { css, html, LitElement } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'
import { GriddleCell } from './griddle-cell.js';
@customElement('gdl-grid-row')
export class GriddleRow extends LitElement {

    static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};
    /**
     * @description
     * The grid cells of this row.
     */
    @queryAssignedElements({ selector: 'gdl-grid-cell' })
    accessor cells!: GriddleCell[];


    private accessor lastFocusedCell!: GriddleCell | undefined;
    constructor() {
        super();
        this.role = 'row';
        //this.tabIndex = -1;
        this.onKeydownHandler = this.onKeydownHandler.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('keydown', this.onKeydownHandler);
        this.addEventListener('focusin', this.onFocusIn);
        this.addEventListener('focusout', this.onFocusOut);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this.onKeydownHandler);
        this.removeEventListener('focusin', this.onFocusIn);
        this.removeEventListener('focusout', this.onFocusOut);
    }

    private onFocusIn(focusEvt: FocusEvent) {
        const gridCellFocusedOn = focusEvt.composedPath().find(evt => evt instanceof GriddleCell);
        if (gridCellFocusedOn !== undefined) {
            if (this.lastFocusedCell !== undefined) {
                this.lastFocusedCell.tabIndex = -1;
            }
            this.lastFocusedCell = gridCellFocusedOn;
            this.lastFocusedCell.tabIndex = 0;
        }
    }

    private onFocusOut(focusEvt: FocusEvent) {
        const targetThatLostFocus = focusEvt.target as HTMLElement;
        const cellThatLostFocus = targetThatLostFocus.closest('gdl-grid-cell');

        const targetThatGotFocus = focusEvt.relatedTarget as HTMLElement;
        if (this.contains(targetThatGotFocus)) {
            // The target that got focus is a cell inside this grid row.
            if (cellThatLostFocus) {
                cellThatLostFocus.tabIndex = -1;
                this.lastFocusedCell = undefined;
            }
        }
    }

    /**
     * @description
     * Only handles the Left and Right arrow keys.
     * 
     * @param evt The keyboard event to process.
     */
    private onKeydownHandler(evt: KeyboardEvent) {
        let elementTarget = evt.target as HTMLElement;
        let gridCellEvtSource = elementTarget.closest('gdl-grid-cell');
        if (!gridCellEvtSource) {
            console.warn('No Griddle cell found in this row');
            throw new Error('No Griddle Cell found in composed path. Please use <gdl-grid-cell>\'s for your grid cells')
        }
        if (evt.key === 'ArrowLeft') {
            if (gridCellEvtSource) {
                let previousGridCell = gridCellEvtSource.previousElementSibling as HTMLElement | null;
                if (previousGridCell) {
                    // There is a preceding element connected to the current gridcell
                    previousGridCell.focus();
                }
            }
        } else if (evt.key === 'ArrowRight') {
            if (gridCellEvtSource) {
                let nextGridCell = gridCellEvtSource.nextElementSibling as HTMLElement | null;
                if (nextGridCell) {
                    // There is an element to the right of the current cell.
                    nextGridCell.focus();
                }
            }
        }
    }

    private onSlotChange() {
        this.lastFocusedCell = this.cells.find(cell => cell.tabIndex === 0);
    }

    render() {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
    }

    static styles = css`
        :host {
            display: table-row;
            vertical-align: inherit;
            unicode-bidi: isolate;
        }
    `;
}