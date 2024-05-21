import { newE2EPage } from '@stencil/core/testing';

describe('lbm-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lbm-ambulance-wl-app></lbm-ambulance-wl-app>');

    const element = await page.find('lbm-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
