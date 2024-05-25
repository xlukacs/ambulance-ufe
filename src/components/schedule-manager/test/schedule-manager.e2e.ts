import { newE2EPage } from '@stencil/core/testing';

describe('schedule-manager', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<schedule-manager></schedule-manager>');

    const element = await page.find('schedule-manager');
    expect(element).toHaveClass('hydrated');
  });
});
