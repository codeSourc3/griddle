import { LitElement, PropertyValues, css, html } from 'lit'
import { customElement, queryAssignedElements} from 'lit/decorators.js'
import { GriddleRow } from './griddle-row';
import { GriddleCell } from './griddle-cell';


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('gdl-data-grid')
export class GriddleDataGrid extends LitElement {

  

  @queryAssignedElements({selector: 'gdl-grid-row'})
  accessor rows!: Array<GriddleRow>

  constructor() {
    super();
    this.role = "grid";
    this.tabIndex = 0;
  }

  render() {
    return html`
      <div role="rowgroup" id="tablehead">
        <gdl-grid-row>
          <slot name="headers"></slot>
        </gdl-grid-row>
      </div>
      <div role="rowgroup" id="mainbody">
        <slot></slot>
      </div>
    `
  }

  private onKeyDownHandler(evt: KeyboardEvent) {
    // Handle up and down arrow keys.
    /*
    Check that the element that is the target of the KeyboardEvent
    is of type GriddleDataCell. Stop if it isn't.

    Find the column (the index) of the cell within the row.

    Find the row above the current row or the one below if no row is above.
    If no rows are above or below stop.

    Otherwise, find the cell at the same index as the currently focused cell.
    Then focus on it
     */
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.resetTabbable();
  }

  private resetTabbable(): void {
    if (this.rows.length > 0) {
      const firstRow = this.rows[0];
      if (firstRow.children.length > 0) {
        let firstCell = firstRow.firstElementChild as GriddleCell;
        firstCell.tabIndex = 0;
      }
    }
  }

  static styles = css`
    :host {
      display: table;
    }

    #mainbody {
      display: table-row-group;
    }

    #tablehead {
      display: table-header-group;
    }
  `;
}
