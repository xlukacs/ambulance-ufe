import { newE2EPage } from '@stencil/core/testing';

describe('room-manager', () => {
  xit('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<room-manager></room-manager>');

    const element = await page.find('room-manager');
    expect(element).toHaveClass('hydrated');
  });
});
