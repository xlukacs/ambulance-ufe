import { newE2EPage } from '@stencil/core/testing';

describe('lbm-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lbm-ambulance-wl-editor></lbm-ambulance-wl-editor>');

    const element = await page.find('lbm-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
