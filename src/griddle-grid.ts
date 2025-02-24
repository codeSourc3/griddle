import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('gdl-data-grid')
export class GriddleDataGrid extends LitElement {
  
  constructor() {
    super();
    this.role = "grid";
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
