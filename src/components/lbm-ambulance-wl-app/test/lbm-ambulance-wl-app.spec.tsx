import { newSpecPage } from '@stencil/core/testing';
import { LbmAmbulanceWlApp } from '../lbm-ambulance-wl-app';

describe('lbm-ambulance-wl-app', () => {
  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [LbmAmbulanceWlApp],
      html: `<lbm-ambulance-wl-app base-path="/"></lbm-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("lbm-ambulance-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [LbmAmbulanceWlApp],
      html: `<lbm-ambulance-wl-app base-path="/ambulance-wl/"></lbm-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("lbm-ambulance-wl-list");
  });
});
