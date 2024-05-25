import { newSpecPage } from '@stencil/core/testing';
import { ScheduleManager } from '../schedule-manager';

describe('schedule-manager', () => {
  xit('renders', async () => {
    const page = await newSpecPage({
      components: [ScheduleManager],
      html: `<schedule-manager></schedule-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <schedule-manager>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </schedule-manager>
    `);
  });
});
