import { newE2EPage } from '@stencil/core/testing';

describe('lbm-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lbm-ambulance-wl-list></lbm-ambulance-wl-list>');

    const element = await page.find('lbm-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
