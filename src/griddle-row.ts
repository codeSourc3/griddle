import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
@customElement('gdl-grid-row')
export class GriddleRow extends LitElement {

    constructor() {
        super();
        this.role = 'row';
    }

    render() {
        return html`
            <slot></slot>
        `;
    }

    static styles = css`
        :host {
            display: table-row;
        }
    `;
}