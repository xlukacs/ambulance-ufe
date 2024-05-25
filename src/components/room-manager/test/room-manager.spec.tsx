import { newSpecPage } from '@stencil/core/testing';
import { RoomManager } from '../room-manager';

describe('room-manager', () => {
  xit('renders', async () => {
    const page = await newSpecPage({
      components: [RoomManager],
      html: `<room-manager></room-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <room-manager>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </room-manager>
    `);
  });
});
