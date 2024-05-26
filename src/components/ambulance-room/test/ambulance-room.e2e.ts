import { newE2EPage } from '@stencil/core/testing';

describe('ambulance-room', () => {
  xit('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ambulance-room></ambulance-room>');

    const element = await page.find('ambulance-room');
    expect(element).toHaveClass('hydrated');
  });
});
