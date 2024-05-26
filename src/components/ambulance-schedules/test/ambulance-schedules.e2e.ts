import { newE2EPage } from '@stencil/core/testing';

describe('ambulance-schedules', () => {
  xit('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ambulance-schedules></ambulance-schedules>');

    const element = await page.find('ambulance-schedules');
    expect(element).toHaveClass('hydrated');
  });
});
