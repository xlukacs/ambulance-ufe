import { newSpecPage } from '@stencil/core/testing';
import { AmbulanceRoom } from '../ambulance-room';

describe('ambulance-room', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AmbulanceRoom],
      html: `<ambulance-room></ambulance-room>`,
    });
    expect(page.root).toEqualHtml(`
      <ambulance-room>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ambulance-room>
    `);
  });
});
