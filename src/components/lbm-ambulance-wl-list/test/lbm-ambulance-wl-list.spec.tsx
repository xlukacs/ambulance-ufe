import { newSpecPage } from '@stencil/core/testing';
import { LbmAmbulanceWlList } from '../lbm-ambulance-wl-list';

describe('lbm-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LbmAmbulanceWlList],
      html: `<lbm-ambulance-wl-list></lbm-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <lbm-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lbm-ambulance-wl-list>
    `);
  });
});
