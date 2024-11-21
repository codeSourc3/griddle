import {expect} from '@open-wc/testing'
import '../src/index'

it('Grid custom element exists', () => {
    const gridElement = customElements.get('gdl-data-grid');
    expect(gridElement).to.not.be.undefined;
});

