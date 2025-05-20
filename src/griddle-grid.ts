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

  @queryAssignedElements()
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
      position: relative;
    }

    #tablehead {
      display: table-header-group;
    }
  `;
}
