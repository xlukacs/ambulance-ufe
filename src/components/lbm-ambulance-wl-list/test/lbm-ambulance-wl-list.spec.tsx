import { newSpecPage } from '@stencil/core/testing';
import { LbmAmbulanceWlList } from '../lbm-ambulance-wl-list';

describe('lbm-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LbmAmbulanceWlList],
      html: `<lbm-ambulance-wl-list></lbm-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as LbmAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);
  });
});
