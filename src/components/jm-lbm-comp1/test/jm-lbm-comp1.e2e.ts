import { newE2EPage } from '@stencil/core/testing';

describe('jm-lbm-comp1', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jm-lbm-comp1></jm-lbm-comp1>');

    const element = await page.find('jm-lbm-comp1');
    expect(element).toHaveClass('hydrated');
  });
});
