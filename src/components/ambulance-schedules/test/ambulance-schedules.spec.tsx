import { newSpecPage } from '@stencil/core/testing';
import { AmbulanceSchedules } from '../ambulance-schedules';

describe('ambulance-schedules', () => {
  xit('renders', async () => {
    const page = await newSpecPage({
      components: [AmbulanceSchedules],
      html: `<ambulance-schedules></ambulance-schedules>`,
    });
    expect(page.root).toEqualHtml(`
      <ambulance-schedules>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ambulance-schedules>
    `);
  });
});
