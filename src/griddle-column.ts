import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('gdl-grid-column')
export class GriddleColumn extends LitElement {

    constructor() {
        super();
        this.role = 'columnheader';
    }

    render() {
        return html`
            <slot></slot>
        `;
    }

    static styles = css`
        :host {
            display: table-cell;
        }
    `;
}