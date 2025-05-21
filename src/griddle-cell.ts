import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
@customElement('gdl-grid-cell')
export class GriddleCell extends LitElement {

    constructor() {
        super();
        //FIXME: Change to rowheader depending on if row's hasrowheader is true.
        this.role = 'gridcell';
        this.tabIndex = -1;
    }

    render() {
        return html`
            <slot></slot>
        `;
    }

    static styles = css`
        :host {
            display: table-cell;
            height: fit-content;
        }
    `;
}