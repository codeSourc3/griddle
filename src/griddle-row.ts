import { css, html, LitElement } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'
import { GriddleCell } from './griddle-cell';
@customElement('gdl-grid-row')
export class GriddleRow extends LitElement {
    @queryAssignedElements({ selector: 'gdl-grid-cell' })
    private accessor cells!: GriddleCell[];


    private lastFocusedCell!: GriddleCell | undefined;
    constructor() {
        super();
        this.role = 'row';
        this.onKeydownHandler = this.onKeydownHandler.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }

    connectedCallback(): void {
        this.addEventListener('keydown', this.onKeydownHandler);
        this.addEventListener('focusin', this.onFocusIn);
        this.addEventListener('focusout', this.onFocusOut);
    }

    disconnectedCallback(): void {
        this.removeEventListener('keydown', this.onKeydownHandler);
        this.removeEventListener('focusin', this.onFocusIn);
        this.removeEventListener('focusout', this.onFocusOut);
    }

    private onFocusIn(focusEvt: FocusEvent) {
        const gridCellFocusedOn = focusEvt.composedPath().find(evt => evt instanceof GriddleCell);
        if (gridCellFocusedOn !== undefined) {
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

    private onKeydownHandler(evt: KeyboardEvent) {
        let gridCellEvtSource = evt.composedPath().find(evt => {
            if (evt instanceof GriddleCell) {
                return evt;
            }
        }) as HTMLElement;
        if (!gridCellEvtSource) {
            throw new Error('No Griddle Cell found in composed path. Please use <gdl-grid-cell>\'s for your grid cells')
        }
        if (evt.key === 'ArrowLeft') {
            if (gridCellEvtSource) {
                let previousGridCell = (gridCellEvtSource as Element).previousElementSibling as HTMLElement | null;
                if (previousGridCell) {
                    // There is a preceding element connected to the current gridcell
                    previousGridCell.focus();
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
        }
    `;
}