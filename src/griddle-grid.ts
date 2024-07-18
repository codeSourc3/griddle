import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('gdl-data-grid')
export class GriddleDataGrid extends LitElement {
  
  

  render() {
    return html`
      <div role="rowgroup">
        <gdl-grid-row>
          <slot name="headers"></slot>
        </gdl-grid-row>
      </div>
      <div role="rowgroup">
        <slot></slot>
      </div>
    `
  }

  static styles = css`
    :host {
      display: table;
    }

    
  `
}
